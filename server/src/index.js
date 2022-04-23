require('dotenv').config()
const express = require('express');
const app = express();
const port = 5000;
const db = require('./db/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

db.connect();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

const Snapshot = require('./models/Snapshot');


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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})