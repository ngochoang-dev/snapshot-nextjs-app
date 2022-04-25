require('dotenv').config()
const express = require('express');
const app = express();
const port = 5000;
const db = require('./db/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    let result;

    try {
        result = await axios
            .get(
                `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_API_KEY}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
            );
    } catch (error) {
        console.log(error);
    }

    const photoArr = result.data.photos.photo.map(({ farm, server, id, secret }) => {
        return {
            id,
            link: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`
        }
    })

    res.json({ data: photoArr })

})

// POST
app.post('/upload-image', async (req, res) => {
    const { uploaderId, category, data } = req.body;
    let link;
    try {
        const res = await cloudinary.uploader.upload(data, {
            upload_preset: 'snapshot',
        })
        link = res.url
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Có lỗi khi tải ảnh'
        })
    }

    const newSnapshot = new Snapshot({
        uploaderId, category, link,
    })
    newSnapshot.save()
        .then((data) => {
            res.json({ success: true })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Có lỗi khi tải ảnh'
            })
        })
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})