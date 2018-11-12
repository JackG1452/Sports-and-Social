const request = require('supertest')
const app = require('../app')
var Ev = require('../models/event')
var mongoose = require('mongoose')
var chai = require('chai')
var mocha = require('mocha')
var should = chai.should();  // Using Should style
var getTodaysDate = require('../public/javascripts/services/getTodaysDate')

//Index Route Tests
describe('Given the function getTodaysDate() is called', () => {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 
    // Todays date format can be changed here
    today = yyyy + '-' + mm + '-' + dd;

    it('returns todays date correctly', done => {
      request(app).get('/').end((err,res) => {
          expect(today).to.equal(getTodaysDate())
         
        done()
      })
    })
  })