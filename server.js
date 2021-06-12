const express = require('express');
const multer = require('multer');
const db = require('./utils/setupDB')

photosPath = `${__dirname}/uploads/`

const Photo = require('./models/photo.model');
const { update } = require('./models/photo.model');

const app = express();
const upload = multer({ dest: 'uploads/'});
const port = process.env.PORT || 3000;

app.use(express.json());

app.all('/', function(req, res, next){
    res.status(200).json({
        "message":"Welcome to the photo API"
    })
    next();
})

app.post('/photo', upload.single("photo"), (req, res) => {
    //TODO: data validation

    name = req.body.name;
    createdTimeStamp = Date.now();
    updatedTimeStamp = Date.now();
    url = photosPath + req.file.filename;
    descr = req.body.descr;

    const newPhoto = new Photo({
        "name": name,
        "createdTimeStamp": createdTimeStamp,
        "updatedTimeStamp": updatedTimeStamp,
        "url": url,
        "descr": descr
    })

    newPhoto.save(function(err){
        if(err){
            res.json(err);
        } else {
            res.status(200).json({
                "message": "Photo uploaded succesfully",
                "name": name,
                "createdTimeStamp": createdTimeStamp,
                "updatedTimeStamp": updatedTimeStamp,
                "url": url,
                "descr": descr
            })
        }
    });    
})

app.get('/photo', (req, res) => {
    filter = {};
    projection = '';
    options = {
        "limit":parseInt(req.query.limit),
        "skip":parseInt(req.query.skip)
    }

    Photo.find(filter, projection, options, function (err, photos) {
        if (err) {
            res.json(err);
        } else {
            res.status(200).json(photos);
        }
    })
})

app.get('/photo/:id', (req, res) => {
    Photo.findById(req.params.id, function(err, photo){
        res.status(200).json(photo);
    });
})

function hasCorrectKeys(allowedKeys, keyArray){
    if (keyArray.length == 0) return false;

    allowedKeys = new Set(allowedKeys);

    for(var i = 0; i < keyArray.length; i++){
        if (!allowedKeys.has(keyArray[i])){
            return false;
        }
    };

    return true;
}

app.patch('/photo/:id', (req, res)=>{
    if (hasCorrectKeys(["name", ], Object.keys(req.body))){
        const update = req.body;
        update.updatedTimeStamp = Date.now();
        
        const options = {"new": true};

        Photo.findByIdAndUpdate(req.params.id, update, options, (err,photo) =>{
            if(err){
                res.json(err);
            } else {
                res.status(200).json(photo);
            }
        });
    } else {
        console.log("ERROR: Body is empty");
        res.status(400).send("Error: empty body or incorrect body key values");
    }
})

app.patch('/photo/:id/favorite', (req, res) => {
    photoid = req.params.id;
    favstatus = req.body.favorite;

    const update = {favorite: favstatus};
    options = {new: true};

    Photo.findByIdAndUpdate(photoid, update, options, function(err, photo){
        // TODO: check to make sure photo exists
        if(err){
            res.json(err);
        } else {
            res.status(200).json(photo);
        }
    })
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});