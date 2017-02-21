const express = require('express');
const router = express.Router();

const Request = require('request');
const Promise = require('bluebird');
const axios = require('axios');

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

const Urls = [ reactCount, angularCount, emberCount, vueCount, reactCommits, angularCommits, emberCommits, vueCommits]


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
    method: 'get',
    url: reqUrl,
    headers: {'User-Agent': 'launchpad'},
    json:true
  }
}

//Function that creates array of requests
const URLArray = Urls.map(url => {
  return requestMaker(url);
})

//Run promise.map to make multiple consecutive requests
const dataFetch = () => {
 Promise.map(URLArray, (requestObj) => {
  return axios(requestObj)
})
  .then(recievedData => {
    //Assign received data to object
    gitHubData.react.subscriberCount = recievedData[0].data.subscribers_count
    gitHubData.angular.subscriberCount = recievedData[1].data.subscribers_count
    gitHubData.ember.subscriberCount = recievedData[2].data.subscribers_count
    gitHubData.vue.subscriberCount = recievedData[3].data.subscribers_count

    gitHubData.react.forks = recievedData[0].data.forks
    gitHubData.angular.forks = recievedData[1].data.forks
    gitHubData.ember.forks = recievedData[2].data.forks
    gitHubData.vue.forks = recievedData[3].data.forks

    gitHubData.react.lastWeekCommits = recievedData[4].data.all[51]
    gitHubData.angular.lastWeekCommits = recievedData[5].data.all[51]
    gitHubData.ember.lastWeekCommits = recievedData[6].data.all[51]
    gitHubData.vue.lastWeekCommits = recievedData[7].data.all[51]
  })
  .catch((err) => {
    console.log('err', err)
  })
}
//Retrieve data once every minute
setInterval(dataFetch,60000)

//send gitHubData on request from client
router.get('/', (req, res, next) => {
  res.send(gitHubData)
})



module.exports = {router, dataFetch};
