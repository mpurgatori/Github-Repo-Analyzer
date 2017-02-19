let express = require('express');
let morgan = require('morgan');
const dataFetch = require('./git_hub_route').dataFetch;
const path = require('path');

const app = express();
const rootPath = path.join(__dirname);

const bodyParser = require('body-parser');
const gitHubRouter = require('./git_hub_route').router;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('default'));


app.use('/api', gitHubRouter);


app.get('*', function (req, res, next) {
  //console.log('THIS IS REQ SESSION',req.session);
  res.sendFile(rootPath+'/client/index.html')
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(3000, function(){
  dataFetch();
  console.log('Here on port 3000');
})

module.exports = app;
