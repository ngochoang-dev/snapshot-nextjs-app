require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./db/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { cloudinary } = require('./utils/cloudinary');

db.connect();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));


const Snapshot = require('./models/Snapshot');
const User = require('./models/User');

// GET 
app.get('/:query', async (req, res) => {
    const { query } = req.params;

    Promise.all([
        axios.get(`${process.env.FLICKR_API}=${process.env.FLICKR_API_KEY}&tags=${query}&per_page=24&format=json&nojsoncallback=1`),
        Snapshot.find({ category: query }),
    ])
        .then(([flichrResult, dbResult]) => {
            const flichrArr = flichrResult.data.photos.photo.map(({ farm, server, id, secret }) => {
                return {
                    id,
                    photoId: null,
                    link: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
                }
            })
            const dbArr = dbResult.map(({ uploaderId, link, _id }) => {
                return {
                    id: uploaderId,
                    photoId: _id,
                    link: link
                }
            })
            return [...dbArr, ...flichrArr].slice(0, 24)
        })
        .then(data => {
            res.status(200).json({ success: true, data: data })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Fail',
                error: error
            })
        })

})

// POST
app.post('/upload-image', async (req, res) => {
    const { uploaderId, category, data } = JSON.parse(req.body.data);
    let linkArr = [];
    try {
        for (let i = 0; i < data.length; i++) {
            if (!data[i].link) {
                break;
            }
            const res = await cloudinary.uploader.upload(data[i].link, {
                upload_preset: 'snapshot',
                use_filename: true,
            })
            linkArr.push(res.url)
        }
    } catch (error) {
        return linkArr = []
    }

    try {
        for (let i = 0; i < linkArr.length; i++) {
            const newSnapshot = new Snapshot({
                uploaderId, category, link: linkArr[i],
            })
            newSnapshot.save();
            if (i === linkArr.length - 1) {
                res.status(200).json({ success: true })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Fail'
        })
    }
})

// GET
app.get('/account/signin', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                return res.status(406).json({
                    success: false,
                    message: 'User not found!'
                })
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    return res.status(200).json({
                        success: true,
                        user: {
                            username: user.username,
                            id: user._id
                        }
                    })
                }
                res.status(406).json({
                    success: false,
                    message: 'Password not correct!'
                })
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Fail'
            })
        })
})

// POST
app.post('/account/signup', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username })
        .then((user) => {
            if (user) {
                return res.status(406).json({
                    success: false,
                    message: 'User name existed!'
                })
            }
            bcrypt.hash(password, saltRounds, function (err, hash) {
                const newUser = new User({
                    username: username,
                    password: hash
                })
                newUser.save()
                    .then((data) => {
                        res.status(200).json({ success: true, message: 'Signup successfully!', data: data })
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).json({
                            success: false,
                            message: 'Fail'
                        })
                    })
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Fail'
            })
        })
})

// DELETE
app.delete('/remove', (req, res) => {
    const { id } = req.query;
    Snapshot.deleteOne({ _id: id })
        .then(() => {
            res.json({ success: true, message: 'Deleted' })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Fail'
            })
        })
})


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})