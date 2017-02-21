let express = require('express');
let morgan = require('morgan');
const app = express();
const dataFetch = require('./github_route').dataFetch;

const path = require('path');
const rootPath = path.join(__dirname);

const bodyParser = require('body-parser');
const gitHubRouter = require('./github_route').router;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('default'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', gitHubRouter);

app.get('*', function (req, res, next) {
  res.sendFile(rootPath+'/public/index.html')
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(process.env.port || 3000, function(){
  dataFetch();
  console.log('Listening!');
})

module.exports = app;
