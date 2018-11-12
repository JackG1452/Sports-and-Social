'use strict'

const request = require('supertest')
const app = require('../app')
var mongoose = require('mongoose');

describe('Given the server app', () => {
  describe('When called with an invalid route', () => {
    it('Then it returns a 404 error', done => {
      request(app)
        .get('/foo/bar')
        .expect(404, done)
    })
  })

  describe('When called with the root', () => {
    it('Then it returns a 200 OK', done => {
      request(app)
        .get('/')
        .expect(200, done)
    })

  })
})

after(function (done) {
  mongoose.connection.close(function () {
    done()
  })
})
