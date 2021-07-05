import React, { useEffect } from "react";
import AuthService from "./services/auth.service";
import  { Redirect,Link } from 'react-router-dom';
import axios from "axios";


const Profile = ({posts}) => {
  const currentUser = AuthService.getCurrentUser();
  const userposts = posts?.filter(post=> post.user_id === currentUser.user.id)
  
  
  
  
  useEffect(()=>{},[posts])
  
  
 
  
  var actOnPost = function (event) {
 
    var postId = event.target.dataset.postId;
   
    var action = event.target.textContent.trim();

    toggleButtonText[action](event.target);
          updatePostStats[action](postId);
          axios.post("http://localhost:5000/posts/" + postId + '/act', { action: action , userId: currentUser.user.id})
          .then(function () {
            AuthService.updateCurrentUser(currentUser.user.username).then((data)=>data);
   
  })
  .catch(function (error) {
    console.log(error.response.data);  
     console.log(error.response.status);  
     console.log(error.response.headers); 
  });
      };

    var updatePostStats = {
      Like: function (postId) {
          document.querySelector('#likes-count-' + postId).textContent++;
      },
      Unlike: function(postId) {
          document.querySelector('#likes-count-' + postId).textContent--;
      }
  };

  var toggleButtonText = {
      Like: function(button) {
          button.textContent = "Unlike";
      },
      Unlike: function(button) {
          button.textContent = "Like";
      }
  };
    




  if(!currentUser)
  { console.log(currentUser)
    return <Redirect to='/users/error'  />
  }
else {

 
  return (
    <>
    <h1 className="display-1"> {currentUser.user.username}</h1>
    <dl className="row fs-4">
      
            <dt className="col-sm-3">Full Name:</dt>
            <dd className="col-sm-9"> {currentUser.user.first_name + ' ' + currentUser.user.Last_name} </dd>
  
            <dt className="col-sm-3">Date of Birth:</dt>
            <dd className="col-sm-9"> {new Date(currentUser.user.date_of_birth).toDateString()}</dd>
  
            <dt className="col-sm-3">Country:</dt>
            <dd className="col-sm-9"> {currentUser.user.country}</dd>
  
            <dt className="col-sm-3">City:</dt>
            <dd className="col-sm-9"> {currentUser.user.city} </dd>
  
            <dt className="col-sm-3">Gender:</dt>
            <dd className="col-sm-9"> {currentUser.user.gender}</dd>
          
            <dt className="col-sm-3">User ID:</dt>
            <dd className="col-sm-9"> {currentUser.user.id}</dd>   
        
          </dl>

          <div className="row">
        <div className="col">
          <Link to={`/users/${currentUser.user._id}/friends`} className="text-decoration-none text-success"><b> Friends<b className="mx-2 text-decoration-none">  {currentUser.user.friends.length}</b></b></Link>
        </div>
      </div>

      <div className="row ">
        <div className="col">

          
          {  userposts ? 


            userposts.map((post)=>(
              
              <div  key={post._id}>
               <div className="blog-preview">
                
              <div className="title">
                <h5 className="d-inline me-3">{post.post_name}</h5>
                <small className="mx-3"> {post.posted_at} </small>
              </div>
              <div className="details">
                <p className="">{post.post_details}</p>
                <div>
                  
              { currentUser.user.liked_posts && currentUser.user.liked_posts.includes(post._id) ?<div><button onClick={actOnPost}  style={{display:"inline"}} className="btn btn-warning btn-sm" data-post-id ={post._id}>Unlike</button>
                    <span id={`likes-count-${post._id}`}>&ensp;<strong>  {post.likes_count}</strong></span></div>
                    :
                    <div><button onClick={actOnPost}  style={{display:"inline"}} className="btn btn-warning btn-sm" data-post-id ={post._id}>Like</button>
                    <span id={`likes-count-${post._id}`}>&ensp;<strong>  {post.likes_count}</strong></span></div> }

                    
    
                   

                  
                    
               
                </div>

                <Link to={{
              pathname:`/users/posts/${post._id}`,
              state: {post}}} type='button' className="btn btn-outline-success my-2 fw-bold"  >Go to this post</Link>
                {post.user_id === currentUser.user.id ? <Link to={{
              pathname:`/users/posts/${post._id}/delete`,
              state: {post}}} type='button' className="btn btn-outline-danger  fw-bold  mx-2 my-2">Delete</Link> : ""}
                  
              </div>
            
  
            </div>

              </div> 


            )
            )
:''}

</div>
</div>
</>

    
  );

        }
};

export default Profile;