let express = require('express');
let router = express.Router();

//require mongodb and mongoose library
let mongoose = require('mongoose');

//connect the client server
let mongoDB = 'mongodb://localhost:27017/Work';  /////name of my DB is work
mongoose.connect(mongoDB, { useNewUrlParser: true });
let Schema = mongoose.Schema;


//describing the schema
let userDataSchema = new Schema({
    name: {type: String, required: true},
    age: Number,
    email: String,
    gender: String
}, {collection: 'mine'});

let UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

////////////////////////////////////////////////////load////////////////////////////////////////////////////////////////

router.get('/load', function(req, res, next) {
    UserData.find()
        .then(function(doc) {
            res.render('index', {items: doc});
        });
});

///////////////////////////////////////////////////insert///////////////////////////////////////////////////////////////

router.post('/insert', function(req, res, next) {

    let item = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        gender: req.body.gender
    };

    let data = new UserData(item);
    data.save();

    res.redirect('/');
});

//////////////////////////////////////////////////update////////////////////////////////////////////////////////////////

router.post('/update', function(req, res, next) {
    let id = req.body.id;

    UserData.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
            let pop = require('popups');
            pop.alert({
                content : 'No Entry Found'
            });

        } else {
            doc.name = req.body.name;
            doc.age = req.body.age;
            doc.email = req.body.email;
            doc.gender = req.body.gender;
            doc.save();
        }
    });
    res.redirect('/');
});

//////////////////////////////////////////////////delete////////////////////////////////////////////////////////////////

router.post('/delete', function(req, res, next) {
    let id = req.body.id;
    UserData.findByIdAndRemove(id).exec();
    res.redirect('/');
});

module.exports = router;