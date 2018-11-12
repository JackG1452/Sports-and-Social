const request = require('supertest')
const app = require('../app')
var Ev = require('../models/event')
var mongoose = require('mongoose')
var chai = require('chai')
var mocha = require('mocha')
var should = chai.should();  // Using Should style
var setEventStatus = require('../public/javascripts/services/setEventStatus')
  
