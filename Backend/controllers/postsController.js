const User = require('../models/user')
const Posts = require('../models/posts')
const photos = require('../models/photos')
const async = require('async');
const mongoose = require('mongoose');
const { DateTime } = require('luxon');


const {body, validationResult} = require('express-validator');
const posts = require('../models/posts');
const { post } = require('../routes/posts');

exports.posts_create_get = function(req,res,next){
 res.send({title: 'Create Post'})
};

exports.posts_create_post = (req,res,next) => {
   
  
    
    var post = new Posts(
      {
        user_id : req.body.userid,
        post_name: req.body.post_name,
        post_details: req.body.post_details,
        posted_at: Date.now(),
      }
    );
     
    

  
      post.save(function(err){
        if (err) {return next(err);}
        else
        {
         return res.json({success: true, msg:"post created"})
        }
       
      })


      // res.json({success: true, msg:"post created"})
    
   
   


  }

exports.posts_delete_get = function(req,res,next){
 res.render('posts_delete',{title: 'Delete Post', postid: req.params.postid})};


exports.posts_delete_post = function(req,res,next){
  User.updateOne({_id: req.params.userid}, {$pull:{liked_posts: {$in: req.params.postid}}}, {useFindAndModify: false}, (err) => { if(err) {return next(err);}} );
  Posts.findByIdAndRemove(req.params.postid, {useFindAndModify: false}, function deletePost(err){
    if(err){return next(err);}
    res.send({success:true, msg: "Post deleted"})
  })

};

exports.user_post = function(req,res,next)
{ var user_name = ""
  var id = mongoose.Types.ObjectId(req.params.postid);
 
  Posts.findById(id)
  .exec(function(err, userpost){
    if(err) {return next(err);}
    if (userpost==null) { // No results.
      var err = new Error('No posts');
      err.status = 404;
      return next(err);
    }
    

    else
    
    { 
      User.findById(userpost.user_id).exec(function(err,user){
      if(err) {return next(err);}
      
      
      user_name = user.username;
      
      const posted_at = DateTime.fromJSDate(userpost.posted_at).toLocaleString(DateTime.DATE_MED) 
        res.send({title: userpost.post_name , postdetail: userpost.post_details , posturl: userpost.url ,postedAt:posted_at, user_name: user_name})
    })
    
    }
  })
}
exports.user_posts_list = function(req,res,next){
  Posts.find({user_id : req.params.userid},)
  .exec(function(err,user_posts_list)
  {
    if (err){ return next(err);}
    else
    {
      res.render('user_all_posts',{title : 'All User post', list_user_posts: user_posts_list})
    }
  })
}