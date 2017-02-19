import Chart from 'chart.js'


//The upDatePage function fetches the data from server and creates graphs.
const upDatePage = function(){
  //Make our Server request for GitHub Data
  fetch('/api', {
	method: 'get'
}).then(function(response) {
	return response.json()
  .then(function(obj){
    let gitHubData = obj;
    //Create our Subscriber Bar Chart
    let ctx = document.getElementById("subscriberBar");
    let subscriberBar = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["React", "Angular", "Ember", "Vue"],
        datasets: [{
            label: 'Total # of subscribers',
            data: [gitHubData.react.subscriberCount, gitHubData.angular.subscriberCount, gitHubData.ember.subscriberCount, gitHubData.vue.subscriberCount],
            backgroundColor: [
                'rgba(54, 162, 235, 0.3)',
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 69, 0, 0.3)',
                'rgba(75, 192, 192, 0.3)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 69, 0, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        animation:false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
//Create our Forks Bar Chart
let ctx2 = document.getElementById("forkBar");
let forkBar = new Chart(ctx2, {
type: 'bar',
data: {
    labels: ["React", "Angular", "Ember", "Vue"],
    datasets: [{
        label: 'Total # of forks',
        data: [gitHubData.react.forks, gitHubData.angular.forks, gitHubData.ember.forks, gitHubData.vue.forks],
        backgroundColor: [
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 99, 132, 0.3)',
            'rgba(255, 69, 0, 0.3)',
            'rgba(75, 192, 192, 0.3)',
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 69, 0, 1)',
            'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
    }]
},
options: {
    animation:false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
});
//Create Our Weekly Commit Bar Chart
let ctx3 = document.getElementById("commitBar");
let commitBar = new Chart(ctx3, {
type: 'bar',
data: {
    labels: ["React", "Angular", "Ember", "Vue"],
    datasets: [{
        label: '# of most recent week commits',
        data: [gitHubData.react.lastWeekCommits, gitHubData.angular.lastWeekCommits, gitHubData.ember.lastWeekCommits, gitHubData.vue.lastWeekCommits],
        backgroundColor: [
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 99, 132, 0.3)',
            'rgba(255, 69, 0, 0.3)',
            'rgba(75, 192, 192, 0.3)',
        ],
        borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 69, 0, 1)',
            'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
    }]
},
options: {
    animation:false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
});
  //Fill out table date - React
  document.getElementById('reactSubscribe').innerHTML = gitHubData.react.subscriberCount;
  document.getElementById('reactFork').innerHTML = gitHubData.react.forks;
  document.getElementById('reactCommit').innerHTML = gitHubData.react.lastWeekCommits;
  //Fill out table date - Angular
  document.getElementById('angularSubscribe').innerHTML = gitHubData.angular.subscriberCount;
  document.getElementById('angularFork').innerHTML = gitHubData.angular.forks;
  document.getElementById('angularCommit').innerHTML = gitHubData.angular.lastWeekCommits;
  //Fill out table date - Ember
  document.getElementById('emberSubscribe').innerHTML = gitHubData.ember.subscriberCount;
  document.getElementById('emberFork').innerHTML = gitHubData.ember.forks;
  document.getElementById('emberCommit').innerHTML = gitHubData.ember.lastWeekCommits;
  //Fill out table date - Vue
  document.getElementById('vueSubscribe').innerHTML = gitHubData.vue.subscriberCount;
  document.getElementById('vueFork').innerHTML = gitHubData.vue.forks;
  document.getElementById('vueCommit').innerHTML = gitHubData.vue.lastWeekCommits;
  })
}).catch(function(err) {
	console.log(err);
})
}
//Run upDatePage once on load
upDatePage();
//Run once every minute to retrieve any new data
setInterval(upDatePage,60000);
