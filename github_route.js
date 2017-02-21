const express = require('express');
const router = express.Router();
const Request = require('request');
const async = require('async');

//client credentials
const clientId = require('./client_creds').clientId
const clientSecret = require('./client_creds').clientSecret
const urlCreds = `client_id=${clientId}&client_secret=${clientSecret}`

//API Routes for subscriber count and fork total
const reactCount = `https://api.github.com/repos/facebook/react?${urlCreds}`
const angularCount = `https://api.github.com/repos/angular/angular.js?${urlCreds}`
const emberCount = `https://api.github.com/repos/emberjs/ember.js?${urlCreds}`
const vueCount = `https://api.github.com/repos/vuejs/vue?${urlCreds}`

//API Routes for weekly commits
const reactCommits = `https://api.github.com/repos/facebook/react/stats/participation?${urlCreds}`
const angularCommits = `https://api.github.com/repos/angular/angular.js/stats/participation?${urlCreds}`
const emberCommits = `https://api.github.com/repos/emberjs/ember.js/stats/participation?${urlCreds}`
const vueCommits = `https://api.github.com/repos/vuejs/vue/stats/participation?${urlCreds}`


//Data to fill out and send to client
let gitHubData = {
  react:{
    subscriberCount:0,
    forks:0,
    lastWeekCommits:0
  },
  angular:{
    subscriberCount:0,
    forks:0,
    lastWeekCommits:0
  },
  ember:{
    subscriberCount:0,
    forks:0,
    lastWeekCommits:0
  },
  vue:{
    subscriberCount:0,
    forks:0,
    lastWeekCommits:0
  }
}

//Function that creates requests from url
const requestMaker = function(reqUrl){
  return requestObj = {
    url: reqUrl,
    headers: {'User-Agent': 'launchpad'},
    json: true
  }
}

//async.parrallel to make many consecutive api requests - Run fetch on interval to keep data updated
const dataFetch = function(){
  async.parallel({
      reactData1: function(parallelCb) {
          Request(requestMaker(reactCount), function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      angularData1: function(parallelCb) {
          Request(requestMaker(angularCount), function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      emberData1: function(parallelCb) {
          Request(requestMaker(emberCount), function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      vueData1: function(parallelCb) {
          Request(requestMaker(vueCount), function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      reactData2: function(parallelCb) {
          Request(requestMaker(reactCommits), function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      angularData2: function(parallelCb) {
          Request(requestMaker(angularCommits), function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      emberData2: function(parallelCb) {
          Request(requestMaker(emberCommits), function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      vueData2: function(parallelCb) {
          Request(requestMaker(vueCommits), function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      }
  }, function(err, results) {
      //Set subscriber count on gitHubData object
      gitHubData.react.subscriberCount = results.reactData1.body.subscribers_count;
      gitHubData.angular.subscriberCount = results.angularData1.body.subscribers_count;
      gitHubData.ember.subscriberCount = results.emberData1.body.subscribers_count;
      gitHubData.vue.subscriberCount = results.vueData1.body.subscribers_count;
      //Set fork count on gitHubData object
      gitHubData.react.forks = results.reactData1.body.forks;
      gitHubData.angular.forks = results.angularData1.body.forks;
      gitHubData.ember.forks = results.emberData1.body.forks;
      gitHubData.vue.forks = results.vueData1.body.forks;
      //Set commit count on gitHubData object
      gitHubData.react.lastWeekCommits = results.reactData2.body.all[51];
      gitHubData.angular.lastWeekCommits = results.angularData2.body.all[51];
      gitHubData.ember.lastWeekCommits = results.emberData2.body.all[51];
      gitHubData.vue.lastWeekCommits = results.vueData2.body.all[51];
  });
}
setInterval(dataFetch,60000)

//send gitHubData on request
router.get('/', (req, res, next) => {
  res.send(gitHubData)
})



module.exports = {router, dataFetch};
