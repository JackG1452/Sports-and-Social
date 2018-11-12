var express = require('express');
var router = express.Router();
var Ev = require('../models/event');
var Mem = require('../models/members');
var path = require('path');
var crypto = require('crypto');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');
var setEventStatus = require('../public/javascripts/services/setEventStatus')
var getTodaysDate = require('../public/javascripts/services/getTodaysDate')

var mongoURI = 'mongodb://localhost/sportandsocial';
//Create mongo connection
var conn = mongoose.createConnection(mongoURI);

//Init GFS
var gfs;

conn.once('open', ()=>{
  //Init stream
  gfs = Grid(conn.db,mongoose.mongo);
  gfs.collection('uploads');
})
//create storage engine
var storage = new GridFsStorage({
    url: mongoURI,
    file:(req, file)=>{
      return new Promise((resolve,reject)=>{
        crypto.randomBytes(16,(err,buf)=>{
          if(err){
            return reject(err);
          }
          var filename = buf.toString('hex') + path.extname(file.originalname);
          var fileInfo={
            filename:filename,
            bucketName:'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  var upload = multer({storage: storage});

//Get list of all members from the database
router.get('/updatemembers', function (req, res, next) {
    var count = 1;

    Mem.find({})
        .then(function (mems) {
          // console.log(mems)
            res.render('updatemembers', {
                mems: mems,
                title: 'Members Database',
                count: count
            });
        });
});

//post member
router.post('/upload', upload.single('file'),(req,res)=>{
  var json = ({
    'memberName':req.body.memberName,
    'seatLocation':req.body.seatLocation,
    'filename':req.file.filename
  })
  Mem.create(json)
  .then(function (mems) {
    // console.log("Member added to database");
    // console.log(mems);
    res.redirect('/updatemembers');
  })
})

//Display image in tables- Index & Members Page
router.get('/image/:filename',(req,res)=>{
  gfs.files.findOne({filename: req.params.filename},(err, file)=>{
    //check if files
    if(!file|| file.length===0){
      return res.status(400).json({
        err:'No file exist'
      });
    }
    //check if image
    if(file.contentType === 'image/jpeg'|| file.contentType ==='image/png'){
      //Read output to browser
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else{
      res.status(404).json({
        err:'Not an image'
      })
    }
  })
})

// delete member from the database
router.post('/deletemember/:id', function (req, res, next) {
     Mem.findByIdAndRemove({_id: req.params.id})
         .then(function (ev) {
             res.redirect('/updatemembers')
         });
});

// Display update member form
router.get('/updatememberForm/:id', function (req, res, next) {
    Mem.findOne({_id: req.params.id})
        .then(function (mem) {
            // console.log('mem ...', mem)
            res.render('updatememberForm', {
                mem: mem,
            });
        })
});

//Display image in update member form
router.get('/updatememberForm/image/:filename',(req,res)=>{
  // console.log('calling')
  gfs.files.findOne({filename: req.params.filename},(err, file)=>{
    //check if files
    if(!file|| file.length===0){
      return res.status(400).json({
        err:'No file exist'
      });
    }
    //check if image
    if(file.contentType === 'image/jpeg'|| file.contentType ==='image/png'){
      //Read output to browser
      var readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else{
      res.status(404).json({
        err:'Not an image'
      })
    }
  })
})

//Edit Member Route
router.post('/edit/:id', function(req, res, next){
    Mem.findByIdAndUpdate({_id: req.params.id}, req.body)
         .then(function (mem) {
             res.redirect('/updatemembers')
      });
})




// GET home page
router.get('/', function (req, res, next) {
    var count = 1;

    Mem.find({})
        .then(function (mems) {
            res.render('index', {
                mems: mems,
                title: 'Welcome to Sports and social',
                title2: 'Here are the Committee members: ',
                count: count
            });
        });
});

// Render plan event page
router.get('/planevent', function(req, res, next) {
    res.render('planevent', {title: 'Plan event: '});
});

// Add new event to database
router.post('/postevent', function (req, res, next) {

        Ev.create(req.body)
            .then(function (evs) {
                  res.redirect('/updateForm/'+ evs._id);
        });
});

//Get list of all events from the database and arrange in colums according to event type
router.get('/updateevent', function (req, res, next) {
    var count = 1;
    let notActionedEvs = [];

    Ev.find({})
        .then(function (evs) {
          evs.forEach((ev) => {
            ev.category = setEventStatus(ev)
            if (ev.category !== 'Actioned') {
              notActionedEvs.push(ev)
            }
          })
            res.render('updateevent', {
                evs: notActionedEvs,
                title: 'Events database',
                count: count
            });
        });
});

// Display update form with appropriate id
router.get('/updateForm/:id', function (req, res, next) {
    Ev.findOne({_id: req.params.id})
      .then(function (ev) {
        if (ev.eventName !== ''){
              category = "In Planning"
            }

            if (ev.eventName !== '' &&
              ev.eventDate !== null &&
              ev.organiser !== '' &&
              ev.location !== '' &&
              ev.contact !== '' &&
              ev.budget != null &&
              ev.PlannedAttendance !== null &&
              ev.costPerHead !== null &&
              ev.deductionOffered !== null)
            {
              category = "Planned"

            }
            if (ev.eventName !== '' &&
              ev.eventDate !== null &&
              ev.organiser !== '' &&
              ev.location !== '' &&
              ev.contact !== '' &&
              ev.budget != null &&
              ev.costPerHead !== null &&
              ev.totalCost !== null &&
              ev.deductionOffered !== null &&
              ev.ActualAttendance !== null &&
              ev.setupRatng !== null)
            {
              category = "Actioned"

            }

          res.render('updateForm', {
              ev: ev,
              category: category
          });
      })
});


//update an event in the database by _id and redirect to update events
router.post('/update/:id', function (req, res, next) {
    Ev.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(function (ev) {
            res.redirect('/updateevent')
        });
});

//Get list of all events from the database
router.get('/eventhistory', function (req, res, next) {
    var count = 1;
    let actionedEvs = []

    Ev.find({})
        .then(function (evs) {
          evs.forEach((ev) => {
            ev.category = setEventStatus(ev)
            if (ev.category === 'Actioned') {
              actionedEvs.push(ev)
            }
          })
          // console.log('********* evs in route', evs);
            res.render('eventhistory', {
                evs: actionedEvs,
                title: 'Previous events',
                count: count
            });
        });
});

// Display event history form
router.get('/eventhistoryForm/:id', function (req, res, next) {
    Ev.findOne({_id: req.params.id})
      .then(function (ev) {
        if (ev.eventName !== ''){
              category = "In Planning"
            }

            if (ev.eventName !== '' &&
              ev.eventDate !== null &&
              ev.organiser !== '' &&
              ev.location !== '' &&
              ev.contact !== '' &&
              ev.budget != null &&
              ev.PlannedAttendance !== null &&
              ev.costPerHead !== null &&
              ev.deductionOffered !== null)
            {
              category = "Planned"

            }
            if (ev.eventName !== '' &&
              ev.eventDate !== null &&
              ev.organiser !== '' &&
              ev.location !== '' &&
              ev.contact !== '' &&
              ev.budget != null &&
              ev.costPerHead !== null &&
              ev.totalCost !== null &&
              ev.deductionOffered !== null &&
              ev.ActualAttendance !== null &&
              ev.setupRatng !== null)
            {
              category = "Actioned"

            }

          res.render('eventhistoryForm', {
              ev: ev,
              title: ev.eventName
          });
      })
});

//Get list of all events from the database
router.post('/searchresults', function (req, res, next) {
  var count = 1;
  var q = req.query.q
  var specials="/" ;
  var specialChars =["!","@","#","$","^","&","%","*","(",")","+","=","-","[","]","/","{","}","|",":","<",">","?",","];
  // console.log('REQUEST: ', req.body.searchField)
  // console.log('REQUEST: ', req.body)

  Ev.find( { $or: [  {eventName: new RegExp("\\b"+req.body.searchField, "i")}, {organiser: new RegExp("\\b"+req.body.searchField, "i")}, {location: new RegExp("\\b"+req.body.searchField, "i")},
  {contact: new RegExp("\\b"+req.body.searchField, "i")}, {eventType: new RegExp("\\b"+req.body.searchField, "i")}, {date: new RegExp("\\b"+req.body.searchField, "i")} ]} )
    .then(function (evs) {
      if(req.body.searchField !=="")
      {
        for (var i = 0; i < specialChars.length; i++)
        {
          if(req.body.searchField === specialChars[i])
          {
            // console.log("Please dont enter special characters");
            res.redirect(req.get('referer'));
          }
        }
        res.render('searchresults',
        {
          title: 'Search Results',
          evs: evs,
          count: count
        });
      }
      else if(req.body.searchField === ""){

        // console.log("Empty searchField");
        res.redirect(req.get('referer'));
      }
    });
  });

// delete event from the database and redirect to edit event
router.post('/deleteevent/:id', function (req, res, next) {
     Ev.findByIdAndRemove({_id: req.params.id})
         .then(function (ev) {
             res.redirect('/updateevent')
         });
});

// delete event from the database and redirect to previous events
router.post('/deletepreviousevent/:id', function (req, res, next) {
     Ev.findByIdAndRemove({_id: req.params.id})
         .then(function (ev) {
             res.redirect('/eventhistory')
         });
});

//update an event in the database by _id and redirect to previous events
router.post('/updateprevious/:id', function (req, res, next) {
    Ev.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(function (ev) {
            res.redirect('/eventhistory')
        });
});



module.exports = router;
