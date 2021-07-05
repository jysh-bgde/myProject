var express = require('express');
const { route } = require('.');
var router = express.Router();
var userController = require('../controllers/userController')
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




// router.get('/',isLoggedIn, userController.posts_list )

router.get('/:userid', userController.user_profile )

router.get('/:userid/profileimage',  (req,res)=>{
  User.find({user_id : req.params.userid}, (err,items)=>{
    if(err){console.log(err);
    res.status(500).send('An error occured', err);
  }
  else {
    res.render('profile_pic', {items: items, currentuser: req.user});
  }
  });
});

router.post('/:userid/profileimage',  upload.single('image'), (req, res, next)=> {
  var obj = {
    img: {
      data: fs.readFileSync(path.join('C:/Users/User/Desktop/myApp/uploads/' + req.file.filename)),
      contentType: 'image/png'
    }
  }

  ProfilePhotos.updateOne({user_id : req.params.userid}, obj, (err, item)=> {
    if(err){
      return next(err);

    }
    else {
      res.redirect('/users/' +  req.user._id + '/profileimage');
    }
  });
});


router.get('/:userid/friends', userController.user_friends )



// function isLoggedIn(req,res,next) {
//   if(req.isAuthenticated()){
//       return next();
//   }
//   res.redirect("/login");
// }


module.exports = router;
