let express = require('express');
let morgan = require('morgan');
const path = require('path');

const app = express();
const rootPath = path.join(__dirname);

let gitHubRouter = require('./git_hub_route');

let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('default'));


app.use('/api', gitHubRouter);

app.use(express.static('client/public'))

app.get('*', function (req, res, next) {
  //console.log('THIS IS REQ SESSION',req.session);
  res.sendFile(rootPath+'/client/index.html')
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(3000, function(){
  console.log('Here on port 3000');
})

module.exports = app;
