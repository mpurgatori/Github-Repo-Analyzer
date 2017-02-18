const express = require('express');
const router = express.Router();
const Request = require('request');

//client credentials
const clientId = require('./client_creds').clientId
const clientSecret = require('./client_creds').clientSecret

//API Routes
const React = `https://api.github.com/repos/facebook/react?client_id=${clientId}&client_secret=${clientSecret}`
const Angular = `https://github.com/angular/angular.js?client_id=${clientId}&client_secret=${clientSecret}`
const Ember = `https://github.com/emberjs/ember.js/?client_id=${clientId}&client_secret=${clientSecret}`
const Vue = `https://github.com/vuejs/vue?client_id=${clientId}&client_secret=${clientSecret}`

let gitHubData = {}

router.get('/', function (req, res, next) {
  Request({
    url: React,
    headers:{'User-Agent': 'launchpad'}},
    function (err, resp, body) {
      console.log(resp);
    res.send(body);
  })
  .then
});




module.exports = router;
