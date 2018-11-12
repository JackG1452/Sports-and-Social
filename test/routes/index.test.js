'use strict'

const request = require('supertest')
const app = require('../../app')
var Ev = require('../../models/event')
var Mem = require('../../models/members')
var mongoose = require('mongoose')
var chai = require('chai')
var mocha = require('mocha')
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var should = chai.should();  // Using Should style

//Index Route Tests
describe('Given the index route', () => {

  it('The root path returns the appropriate titles', done => {
    request(app).get('/').end((err,res) => {
      expect(res.text).to.contain('Welcome to Sports and social')
      expect(res.text).to.contain('Here are the Committee members:')
      done()
    })
  })
})

//Plan Event Route Tests
describe('Given the plan event route', () => {

  it('The root path returns the appropriate titles', done => {
    request(app).get('/planevent').end((err,res) => {
      expect(res.text).to.contain('Plan event: ')
      done()
    })
  })
})

//Update Event Route Tests
describe('Given the edit event/update event route', () => {

  it('The edit event/update event path returns the appropriate titles', done => {
    request(app).get('/updateevent').end((err,res) => {
      expect(res.text).to.contain('Events in Planning phases')
      expect(res.text).to.contain('Click on event name to edit or delete event:')
      done()
    })
  })
})

//Event History Route Tests
describe('Given the event history route', () => {

  it('The root path returns the appropriate titles', done => {
    request(app).get('/eventhistory').end((err,res) => {
      expect(res.text).to.contain('Previous events')
      done()
    })
  })
})

// POST, GET, UPDATE & DELETE Event Test
describe('Given REST API routes (/event)', function () {

  let testEventID = mongoose.Types.ObjectId('test1       ')

  const testEvent = {
    _id: testEventID,
    eventName: 'Test',
    eventType: 'Annual',
    organiser: 'Bill'
  }

  it('When the POST /postevent is called', function (done) {

    request(app)
      .post('/postevent')
      .send(testEvent)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('When GET /updateForm/:id routes is called', function (done) {

    request(app)
      .get('/updateForm/' + testEventID)
      .expect('Content-type', "text/html; charset=utf-8")
      .expect(200)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.text).to.contain(testEvent.eventName)
        expect(res.text).to.contain(testEvent.eventType)

        done();
      });
  });

  it('When POST Update /update/:id route is called', function (done) {

    request(app).post('/update/' + testEventID).end((err,res) => {
        Ev.findByIdAndUpdate({_id: testEventID}, {organiser: "Dave"}).then((result) => {
          expect(302)
          console.log("owner:       ", testEvent.organiser)
          done()
        })
    })
  })

  it('When DELETE /deleteevent/:id route is called', function (done) {
    request(app)
      .post('/deleteevent/' + testEventID)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.text).to.not.contain(testEvent.eventName)
        done();
      });
    });
  });

describe('Given the update event route is called', () => {
  it('The root returns all events', done => {
    request(app)
    .get('/updateevent')
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.text).to.contain('Click on event name to edit or delete event:')
      done();
    })
  })
})

//In Planning Test
describe('Given the create event form', () => {
  let testEventID = mongoose.Types.ObjectId('test2       ')
  let testEvent = { _id: testEventID,
    eventName: 'Test party',
    date: '2018-12-13',
    organiser: 'bill',
    location: '',
    contact: null,
    budget: null,
    PlannedAttendance: null,
    costPerHead: null,
    totalCost: null,
    deductionOffered: null,
    ActualAttendance: null,
    additionalNotes: '',
    instructions: '',
    eventType: 'Annual',
    __v: 0 }
  it('I see the appropriate event title and event type is in planning', done => {
    Ev.create(testEvent).then(() => {
      request(app).get('/updateForm/' + testEventID).end((err,res) => {
        expect(res.text).to.contain('Test party')
        expect(res.text).to.contain('In Planning')
        Ev.findByIdAndRemove({_id: testEventID}).then(() => {
          done()
        })
      })
    })
  })
})

//Planned Test
describe('Given the create event form', () => {
  let testEventID = mongoose.Types.ObjectId('test2       ')
  let testEvent = { _id: testEventID,
    eventName: 'Test Party',
    date: '2018-12-13',
    organiser: 'bill',
    location: 'Bar',
    contact: '36643464346',
    budget: 200,
    PlannedAttendance: 10,
    costPerHead: 10,
    totalCost: 250,
    deductionOffered: 0,
    ActualAttendance: null,
    additionalNotes: '',
    instructions: '',
    eventType: 'Annual',
    __v: 0 }
  it('I see the appropriate event title and event type is planned', done => {
    Ev.create(testEvent).then(() => {
      request(app).get('/updateForm/' + testEventID).end((err,res) => {
        expect(res.text).to.contain('Test Party')
        expect(res.text).to.contain('Planned')
        Ev.findByIdAndRemove({_id: testEventID}).then(() => {
          done()
        })
      })
    })
  })
})

//Actioned Test
describe('Given the appropriate info provided in update form route-Actioned', () => {
  let testEventID = mongoose.Types.ObjectId('test2       ')
  let testEvent = { _id: testEventID,
    eventName: 'Test party',
    date: '2018-12-13',
    organiser: 'bill',
    location: 'Bar',
    contact: '078787878787',
    budget: 200,
    PlannedAttendance: 10,
    costPerHead: 10,
    totalCost: 250,
    deductionOffered: 0,
    additionalNotes: '',
    instructions: '',
    eventType: 'Annual',
    ActualAttendance: 150,
    setupRating: 3,
    __v: 0 }
  it('The path returns the appropriate event statues i.e Actioned', done => {
    Ev.create(testEvent).then(() => {
      request(app).get('/updateForm/' + testEventID).end((err,res) => {
        expect(res.text).to.contain('Test party')
        expect(res.text).to.contain('Actioned')
        Ev.findByIdAndRemove({_id: testEventID}).then(() => {
          done()
        })
      })
    })
  })
})





//Search Route Tests
describe('Given the search results route', () => {

  it('The root path returns the appropriate titles', done => {
    request(app).post('/searchresults').end((err,res) => {
      expect(res.text).to.contain('Search Results')
      done()
    })
  })
})

//Routes for UPDATING & DELETING Actioned Events
describe('Given REST API routes Previous Events', function () {

  let testEventID = mongoose.Types.ObjectId('test1       ')

  const testEvent = {
    _id: testEventID,
    eventName: 'Testing Actioned',
    date: '2019-12-13',
    organiser: 'bill',
    location: 'Bar',
    contact: '078787878787',
    budget: 200,
    PlannedAttendance: 10,
    costPerHead: 10,
    totalCost: 250,
    deductionOffered: 0,
    additionalNotes: '',
    instructions: '',
    eventType: 'Annual',
    ActualAttendance: 150,
    setupRating: 3,
    __v: 0 }

  it('When the POST /postevent is called', function (done) {

    request(app)
      .post('/postevent')
      .send(testEvent)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('When POST Update /updateprevious/:id route is called', function (done) {

    request(app).post('/updateprevious/' + testEventID).end((err,res) => {
        Ev.findByIdAndUpdate({_id: testEventID}, {organiser: "Dave"}).then((result) => {
          expect(302)
          console.log("Update route results: ", result)
          console.log("owner:       ", testEvent.organiser)
          done()
        })
    })
  })

  it('When DELETE /deletepreviousevent/:id route is called', function (done) {
    request(app)
      .post('/deletepreviousevent/' + testEventID)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.text).to.not.contain(testEvent.eventName)
        done();
      });
    });
  });


//Members Route Tests
describe('Given the members route', () => {

  it('The /updatemembers path returns the appropriate titles', done => {
    request(app).get('/updatemembers').end((err,res) => {
      expect(res.text).to.contain('Members Database')
      done()
    })
  })

  let testMemID = mongoose.Types.ObjectId('test1       ')

  const json = {
      _id: testMemID,
      memberName: 'Jack',
      seatLocation: '3N',
      filename: '299c09d343c299ae35ccc41d904077ee.png'
    }


  it('POST /upload', done => {
    Mem.create(json).then(() => {
      request(app).post('/upload').end((err,res) => {
        expect(302)
        done()
      })
    })
  })

  it('The root returns all members', done => {
    request(app)
    .get('/updatemembers')
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.text).to.contain('Jack')
      done();
    })
  })


  var mongoURI = 'mongodb://localhost/sportandsocial';
  var conn = mongoose.createConnection(mongoURI);
  //Init GFS
  var gfs;
  conn.once('open', ()=>{
    //Init stream
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
  })

  it('The /image/:filename path returns image', done => {
    request(app).post('/image/:filename').end((err,res) => {
        gfs.files.findOne({filename: json.filename}).then((result) => {
          expect(200)
          done()
        })
      })
    })

  it('When GET memberForm /updatememberForm/:id route is called', function (done) {

    request(app).get('/updatememberForm/' + testMemID).end((err,res) => {
        Mem.findOne({_id: testMemID}).then((result) => {
          expect(302)
          expect(res.text).to.contain(json.memberName)
          console.log("Update route results: ", result)
          done()
        })
    })
  })

  it('The /updatememberForm/image/:filename path returns image', done => {
    request(app).post('/updatememberForm/image/:filename').end((err,res) => {
        gfs.files.findOne({filename: json.filename}).then((result) => {
          expect(200)
          done()
        })
      })
    })

  it('When POST edit /edit/:id route is called', function (done) {

    request(app).post('/edit/' + testMemID).end((err,res) => {
        Mem.findByIdAndUpdate({_id: testMemID}, {seatLocation: "D6"}).then((result) => {
          expect(302)
          console.log("Update route results: ", result)
          console.log("seatLocation:       ", json.seatLocation)
          done()
        })
    })
  })

  it('When DELETE /deletemember/:id route is called', function (done) {
    request(app)
      .post('/deletemember/' + testMemID)
      .expect(302)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.text).to.not.contain(json.memberName)
        done();
      });
    });
})
