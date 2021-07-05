import Alltimeleaderboards from "./Alltimeleaderboards";
import WeeklyLeaderboards from "./WeeklyLeaderboards";
import {Link} from 'react-router-dom';
import { useEffect } from "react";
import AuthService from './services/auth.service';
import axios from "axios";


// import { useState } from "react";
const PostList = ({ posts, title }) => {

 const currentUser =  AuthService.getCurrentUser();
 
  useEffect( ()=>{
   
    // AuthService.updateCurrentUser(currentUser.user.username).then((data)=>{console.log(data)});
    
  posts && posts.sort(function(a, b) {
    var c = a.posted_at
    var d = b.posted_at
    return d-c; 
  });

},[posts,currentUser])

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
    




 


  return (
    <div className="posts">
      <h2>{title}</h2>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <h2>{post.post_name}</h2>
            <p>{post.post_details}</p>
           <strong> Name: {post.user_id} </strong>
           {/* <p><strong> Likes {post.likes_count} </strong></p> */}
            <small>{post.posted_at}</small>

            <div>
            {currentUser.user.liked_posts && currentUser.user.liked_posts.includes(post._id) ?
                  <div>
                  <button onClick={actOnPost}  style={{display:"inline"}} className="btn btn-warning btn-sm" data-post-id ={post._id}>Unlike</button>
                  <span id={`likes-count-${post._id}`}>&ensp;<strong>  {post.likes_count}</strong></span>
                  </div>
                    :
                  
                  <div>
                <button onClick={actOnPost}  style={{display:"inline"}} className="btn btn-warning btn-sm" data-post-id ={post._id}>Like</button>
                <span id={`likes-count-${post._id}`}>&ensp;<strong>{post.likes_count}</strong></span>
                </div>
            }
              </div>
          
            <Link to={{
              pathname:`/users/posts/${post._id}`,
              state: {post}}} type='button' className="btn btn-outline-success my-2 fw-bold"  >Go to this post</Link>

{post.user_id === currentUser.user.id ? <Link to={{
              pathname:`/users/posts/${post._id}/delete`,
              state: {post}}} type='button' className="btn btn-outline-danger mx-2 fw-bold my-2">Delete</Link> : ""}
            
        </div>
        
        ))}

        <WeeklyLeaderboards posts = {posts}/>
        <Alltimeleaderboards posts = {posts}/>

    </div>
  );
};

export default PostList;
