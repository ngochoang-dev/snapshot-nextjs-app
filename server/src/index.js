require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./db/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
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
app.get('/my-snapshot', (req, res) => {
    const uploaderId = req.header('uploaderId');

    if (!uploaderId)
        return res.status(406).json({
            success: false, message: 'You are not signin'
        });

    Snapshot.find({ uploaderId: uploaderId })
        .then(data => {
            const newData = data.map(({ uploaderId, link, _id }) => {
                return {
                    id: uploaderId,
                    photoId: _id,
                    link: link
                }
            })
            res.json({
                success: true,
                data: newData
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Fail'
            })
        })
})

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
                            id: user._id,
                            image: user.image
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
                    password: hash,
                    _id: new mongoose.Types.ObjectId
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
    const uploaderId = req.header('uploaderId');
    if (!uploaderId)
        return res.status(406).json({
            success: false, message: 'You are not signin'
        });
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

// POST
app.post('/user/update', async (req, res) => {
    const {
        age,
        email,
        gender,
        introduction,
        name,
        nickname,
        website,
        avatar,
        id,
    } = req.body;

    let image;

    if (avatar) {
        const res = await cloudinary.uploader.upload(avatar, {
            upload_preset: 'user_snapshot',
            use_filename: true,
        })
        image = res.url
    }

    User.findOne({ _id: id })
        .then(user => {
            if (!user) {
                return new User({
                    age,
                    email,
                    gender,
                    introduction,
                    username: name,
                    nickname,
                    website,
                    avatar,
                    _id: id,
                    password: 'other'
                }).save()
            }
            return User.updateOne({ _id: id }, {
                age: age ? age : user.age,
                email: email ? email : user.email,
                gender: gender ? gender : user.gender,
                introduction: introduction ? introduction : user.introduction,
                username: name ? name : user.username,
                nickname: nickname ? nickname : user.nickname,
                website: website ? website : user.website,
                image: image ? image : user.image,
            })
        })
        .then(() => res.status(200).json({
            success: true,
            link: image,
            message: 'Updated successfully'
        }))
        .catch(error => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Fail'
            })
        })
})

// GET
app.get('/user/info', (req, res) => {
    const { id } = req.query;
    User.findOne({ _id: id })
        .then(user => {
            res.status(200).json({
                success: true,
                data: user
            })
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