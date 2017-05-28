var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Post = require('./models/posts');
var routes = require('./routes');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
//var jsonParser = bodyParser.json();

app.use(logger('dev'));
app.use(cors());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/react-express-api');
routes(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // 针对 form表单

var db = mongoose.connection;
db.on('error',console.log);
db.once('open',function(){
  var post = new Post({'title':'usage'});
  post.save(function(err){
    if(err) console.log(err);
  });
  console.log('success!');
});






app.listen('3000',function(){
  console.log('your server is running on port 3000');
});
