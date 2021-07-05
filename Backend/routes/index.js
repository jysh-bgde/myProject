var express = require('express');
var router = express.Router();
// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var mongoose = require('mongoose');
var passport = require('passport');
const jwt = require('jsonwebtoken')
// var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
// var passportLocalMongoose = require('passport-local-mongoose');

const bcrypt = require('bcryptjs');
const async = require('async')

var Post = require('../models/posts');
var userController= require('../controllers/userController')
let Pusher = require('pusher');
var fs = require('fs');
var multer = require('multer');
var ProfilePhotos = require('../models/profilephotos')
var storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'uploads')
  },
  filename: (req,file,cb) =>{
    cb(null, file.fieldname + '-' + Date.now())
  }
});
var User = require('../models/user');

var upload = multer({storage: storage})
var path = require('path');
var config = require('../config/database')



const pusher = new Pusher({
  appId: "1222639",
  key: "0fe554d234b992ab53fd",
  secret: "544439e54f33e09a3f63",
  cluster: "ap2",
  useTLS: true
});


const app = express();
app.use(require('express-session')({
  secret: "Any normal Word",
  resave: false,
  saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());




/* GET home page. */
router.get('/', function(req, res,next ) {
 res.render('index.ejs');
});

router.get('/home', userController.posts_list  )

router.get('/login', function(req,res,next){
  res.render('login', {title: 'login'});
} )

router.post("/login",passport.authenticate("local"),
function (req, res){
    res.redirect('/home');
  
  
});

router.post('/users/:id/act', (req,res,next)=> {
  const action = req.body.action;
  const userId = req.body.userId;

  action==='Friend'? User.updateOne({_id: userId}, {$addToSet:{friends: req.params.id}}, (err) => { if(err) {return next(err);} res.send('');} ) :  User.updateOne({_id: userId}, {$pull:{friends: {$in: req.params.id}}}, (err) => { if(err) {return next(err);}  res.send('');} );
})

router.post('/posts/:id/act', (req, res, next) => {
  const action = req.body.action;
  const userId = req.body.userId;
 
  // console.log(action)
  // console.log(req.params.id)
  const counter = action === 'Like' ? 1 : -1;
  
  Post.updateOne({_id: req.params.id}, {$inc: {likes_count: counter}}, {}, (err, numberAffected) => {
    if(err){return next(err);}

    // pusher.trigger('post-events', 'postAction', {action: action, postId: req.params.id}, req.body.socketId);

      // res.send('activated');

  
  });

  action==='Like' ? User.updateOne({_id: userId}, {$addToSet:{liked_posts: req.params.id}}, (err,user) => { if(err) {return next(err);} else {res.send(user)}} ) :  User.updateOne({_id: userId}, {$pull:{liked_posts: {$in: req.params.id}}}, (err,user) => { if(err) {return next(err);}else{res.send(user)}} );

});


router.get('/register', function(req,res,next){
  res.render('registration', {title: 'registration'});
} )
router.post("/register",(req,res)=>{

  let newUser = new User({username: req.body.username,
        password: req.body.password,
        first_name:req.body.first_name,
        Last_name: req.body.Last_name,
        date_of_birth: req.body.date_of_birth,
        country: req.body.country,
        city: req.body.city,
        gender: req.body.gender
        })

        User.addUser(newUser, (err,user)=> {
          if(err){
            res.json({succes: false, msg: 'Failed to register'})

          }
          else
          {
            res.json({succes: true, msg: ' registered'})

          }
        })
    
  // User.register(new User({username: req.body.username,
  //     password: req.body.password,
  //     first_name:req.body.first_name,
  //     Last_name: req.body.Last_name,
  //     date_of_birth: req.body.date_of_birth,
  //     country: req.body.country,
  //     city: req.body.city,
  //     gender: req.body.gender
  //     }),req.body.password,function(err,user){
  //     if(err){
       
  //         console.log(err);
  //         res.render("registration");
  //       }
        
  //       console.log(user);
        
       
        // bcrypt.gensSalt(10,(err,salt) => {
        //   bcrypt.hash(password, salt,(err,hash)=>{
        //     if(err)
        //     console.log(err);
            
        //    password = hash;

        //   })
        // })
  //     })

    //   async.waterfall([
    //     function(callback) {
    //       // console.log(req.body.username)
    //     //  User.find({'username': req.body.username }).exec(function(err, user){if(err){console.log(err);}
    //     //  console.log(user._id);
    //     // callback(null,user)
    //     // })
    //     User.register(new User({username: req.body.username,
    //       password: req.body.password,
    //       first_name:req.body.first_name,
    //       Last_name: req.body.Last_name,
    //       date_of_birth: req.body.date_of_birth,
    //       country: req.body.country,
    //       city: req.body.city,
    //       gender: req.body.gender
    //       }),function(err,user){
    //       if(err){
           
    //           console.log(err);
    //           res.json({success:false, msg: 'Failed to register user'})
             
    //         }
    //         else{

        
    //           console.log(user)
    //           res.json({success:true, msg: ' register user'})
        
    //           callback(null,user)
    //         }
            
           
            
    //       })
         
        
    //     },
      
    //   ], function(err, results) {
    //     if(err) throw err;
    //     else
    //     {
    //       console.log(results)

    //     }
      

    //     // results is now equal to: {one: 1, two: 2}
    // });

    //   async ()=>{
    //     const user = await User.find({'username': req.body.username })
    //     console.log(user._id)
       
    //      ProfilePhotos.create({
    //      user_id : user._id,
    //      img: {
    //        data: fs.readFileSync(path.join('C:/Users/User/Desktop/myApp/uploads/' + req.file.filename)),
    //        contentType: 'image/png'
    //      }
    //    }, (err,item) => {
    //      if(err){
    //        console.log(err);
    //      }
    //      else {
    //        console.log(user_id)
    //       //  item.save();
    //     }
    //   }
      
    //   )
      
      
      
    // }
    
    // res.redirect('/login');

  

})

router.get("/logout",(req,res)=>{
  req.logout();
  res.redirect("/");
}
);

// function isLoggedIn(req,res,next) {
//   if(req.isAuthenticated()){
//       return next();
//   }
//   res.redirect("/login");
// }

router.get('/about', passport.authenticate('jwt', {session:false}), function(req,res,next){
  res.send({title: "About", body:"This is the about page of the site"});

});

router.get('/contact', function(req,res,next){
  res.send({title: "Contact Us", body: "This is the contact page of the site"});

});
router.get('/username', userController.username);

router.post('/authenticate',(req,res,next)=> {
  const username = req.body.username;
  const password = req.body.password;

  async.waterfall([
        function(callback) {
         
         User.find({'username': username }).exec(function(err, user){if(err){console.log(err);}
                if(!user){
                  
                  
                  return callback(err,null);
                }
                // console.log(user[0]._id);
                else{

                  callback(null,user[0])
                }
              })
      },

        function(user,callback){

          if(!user)
          
          {
            return callback(null)
          }

          else

          {
            console.log(user.password)
          User.comparePassword(password,user.password, (err, isMatch)=>{
            if(err) {console.log(err);}
            if(isMatch){
              const token = jwt.sign(user.toJSON(),config.secret, {
                expiresIn: 604800
              });
      
              res.json({
                sucess: true,
                token: 'JWT ' + token,
                user: {
                  id: user._id,
                  name: user.fullname,
                  username: user.username,
                  first_name:user.first_name,
            Last_name: user.Last_name,
            date_of_birth: user.date_of_birth,
            country: user.country,
            city: user.city,
            gender: user.gender,
            liked_posts: user.liked_posts,
            friends: user.friends,
                 
                }
              });
            } else {
              return res.json({success: false, msg: 'Wrong password'});
            }
          })
           
          callback(null,'done');
          }

          }


          
      
      ], function(err, results) {
        if(err) throw err;
        else
        {
         console.log(results)

        }
      

        // results is now equal to: {one: 1, two: 2}
    });





 
//   User.find({username: username}, (err,user)=>{
//     if(err) throw err;
//     if(!user){
//       return res.json({success:false, msg: 'User not found'});
//     }
//     console.log(user.password)
//     User.comparePassword(password,user.password, (err, isMatch)=>{
//       if(err) throw err;
//       if(isMatch){
//         const token = jwt.sign(user,config.secret, {
//           expiresIn: 604800
//         });

//         res.json({
//           sucess: true,
//           token: 'JWT' + token,
//           user: {
//             id: user._id,
//             name: user.fullname,
           
//           }
//         });
//       } else {
//         return res.json({success: false, msg: 'Wrong password'});
//       }
//     })
//   }


// )
}
)

router.post("/update", function(req,res,next){
  const username = req.body.username;
  console.log(username);
  User.find({username: username}).exec(function(err,user){
    if(err){console.log(err);}
    else
    { 
      res.send({user: {
        id: user[0]._id,
        name: user[0].fullname,
        username: user[0].username,
        first_name:user[0].first_name,
  Last_name: user[0].Last_name,
  date_of_birth: user[0].date_of_birth,
  country: user[0].country,
  city: user[0].city,
  gender: user[0].gender,
  liked_posts: user[0].liked_posts,
  friends: user[0].friends,
       
      }})
    }
  })

})

router.post('/posts/:postid/comments', function(req,res,next){
const username = req.body.username;
const msg = req.body.msg;
const postid = req.params.postid;



Post.updateOne({_id: postid}, {$addToSet: {comments: {username:username, msg:msg}}}, (err,post) => { if(err) {return next(err);} else {res.send(post)}}) 



})
router.post('/posts/:postid/comments/delete', function(req,res,next){
const commentId = req.body.commentId
const postid = req.params.postid;



Post.updateOne({_id: postid}, {$pull:{comments: { _id: commentId}}}, (err,post) => { if(err) {return next(err);}else{res.send(post)}} );



// Post.updateOne({_id: postid}, {$addToSet: {comments: {username:username, msg:msg}}}, (err,post) => { if(err) {return next(err);} else {res.send(post)}}) 



})



router.get('/post/:postid', function(req,res,next){
const postId = req.params.postid;
Post.find({_id: postId}).exec((err,post)=>{
  if(err){
    return next(err);
  }
  else
  {
   
    return res.send(post[0])
  }

})

})
module.exports = router;
