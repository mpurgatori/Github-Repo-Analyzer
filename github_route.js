const express = require('express');
const router = express.Router();
const Request = require('request');
const async = require('async');

//client credentials
const clientId = require('./client_creds').clientId
const clientSecret = require('./client_creds').clientSecret

//API Routes for subscriber count and fork total
const reactCount = `https://api.github.com/repos/facebook/react?client_id=${clientId}&client_secret=${clientSecret}`
const angularCount = `https://api.github.com/repos/angular/angular.js?client_id=${clientId}&client_secret=${clientSecret}`
const emberCount = `https://api.github.com/repos/emberjs/ember.js?client_id=${clientId}&client_secret=${clientSecret}`
const vueCount = `https://api.github.com/repos/vuejs/vue?client_id=${clientId}&client_secret=${clientSecret}`

//API Routes for weekly commits
const reactCommits = `https://api.github.com/repos/facebook/react/stats/participation?client_id=${clientId}&client_secret=${clientSecret}`
const angularCommits = `https://api.github.com/repos/angular/angular.js/stats/participation?client_id=${clientId}&client_secret=${clientSecret}`
const emberCommits = `https://api.github.com/repos/emberjs/ember.js/stats/participation?client_id=${clientId}&client_secret=${clientSecret}`
const vueCommits = `https://api.github.com/repos/vuejs/vue/stats/participation?client_id=${clientId}&client_secret=${clientSecret}`

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

//Requests for forks and subscribers
const reactFetch = {
    url: reactCount,
    headers:{'User-Agent': 'launchpad'},
    json:true
};

const angularFetch = {
    url: angularCount,
    headers:{'User-Agent': 'launchpad'},
    json:true
};

const emberFetch = {
    url: emberCount,
    headers:{'User-Agent': 'launchpad'},
    json:true
};

const vueFetch = {
    url: vueCount,
    headers:{'User-Agent': 'launchpad'},
    json:true
};

const reactFetchCommits = {
    url: reactCommits,
    headers:{'User-Agent': 'launchpad'},
    json:true
};

const angularFetchCommits = {
    url: angularCommits,
    headers:{'User-Agent': 'launchpad'},
    json:true
};

const emberFetchCommits = {
    url: emberCommits,
    headers:{'User-Agent': 'launchpad'},
    json:true
};

const vueFetchCommits = {
    url: vueCommits,
    headers:{'User-Agent': 'launchpad'},
    json:true
};

//Run fetch on interval to keep data updated
const dataFetch = function(){
  async.parallel({
      reactData1: function(parallelCb) {
          Request(reactFetch, function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      angularData1: function(parallelCb) {
          Request(angularFetch, function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      emberData1: function(parallelCb) {
          Request(emberFetch, function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      vueData1: function(parallelCb) {
          Request(vueFetch, function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      reactData2: function(parallelCb) {
          Request(reactFetchCommits, function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      angularData2: function(parallelCb) {
          Request(angularFetchCommits, function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      emberData2: function(parallelCb) {
          Request(emberFetchCommits, function (err, res, body) {
              parallelCb(null, {err: err, res: res, body: body});
          });
      },
      vueData2: function(parallelCb) {
          Request(vueFetchCommits, function (err, res, body) {
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
