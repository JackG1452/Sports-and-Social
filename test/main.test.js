'use strict'

const request = require('supertest')
const app = require('../app')
var Ev = require('../models/event')
var mongoose = require('mongoose')
var chai = require('chai')
var mocha = require('mocha')
var should = chai.should();  // Using Should style

//Index Route Tests
describe('Given the function highlight current page', () => {

  it('When highlight curent page is called it highlights the relevent heading in the sidebar', done => {
    request(app).get('/').end((err,res) => {
      
      done()
    })
  })
})