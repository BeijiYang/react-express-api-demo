var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var express = require('express');
var Post = require('./models/posts');

module.exports = function(app) {
  app.get('/posts',function(req, res) { //获取所有文章
    Post.find().sort({'createdAt': -1}).exec(function(err,posts) {
      if (err) return res.status(500).json({error: err.message});
      res.json({posts: posts})
    });
  });

  app.get('/posts/:post_id', function(req, res){ //获取一篇特定文章
    Post.findById({_id: req.params.post_id},function(err,post) {
      if (err) return res.status(500).json({error: err.message});
      res.json({posts: post});
      console.log({posts: post});
    });
  });
  app.post('/posts', jsonParser,function(req, res) {  //创建新文章
    if (req.body.title === '') return res.status(400).json({error: '文章标题不能为空！'});
    var post = new Post();
    for (prop in req.body) {
      post[prop] = req.body[prop];
    }
    post.save(function(err) {
      if (err) return res.status(500).json({error: err.message});
      console.log(post);
      res.json({
        message: '文章创建成功了！'
      });
    });
  });

  app.put('/posts/:post_id', jsonParser,function(req, res) {  //更新文章
    if (req.body.title === '') return res.status(400).json({error: '文章标题不能为空！'});
    Post.findById({_id: req.params.post_id}, function(err, post) {
      if (err) return res.status(500).json({error:  err.message});
      for (prop in req.body) {
        post[prop] = req.body[prop];
      }
      post.save(function(err) {
        if (err) return res.status(500).json({error: err.message});
        res.json({
          message: '文章更新成功了。'
        });
      });
    });
  });

   app.delete('/posts/:post_id', function(req, res) {  //删
    Post.findById({_id: req.params.post_id}, function(err, post) {
      if (err) return res.status(500).json({error: err.message});
      post.remove(function(err){
        if (err) return res.status(500).json({error: err.message});
        res.json({ message: '文章已经删除了！' });
      });
    });
  });
}
// module.exports = function(app){
//   app.get('/',function(req, res){
//   res.json({message: 'request gecha!'});
// });
//   app.post('/posts',jsonParser,function(req, res){ //新的改动
//     console.log(req.body.title);
//     res.json(req.body);
//     //res.json({message: 'post request!'})
//   })
// };