
import AuthService from "./services/auth.service";
import  { Redirect, useLocation,Link } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

const UserProfile = () => {

  
  const location = useLocation();
  const data = location.state.data
  
  
  useEffect(()=>{

    

    data.user_posts_list && data.user_posts_list.sort(function(a, b) {
      var c = a.posted_at
      var d = b.posted_at
      return c-d; 
    });
  
  },[data.user_posts_list])
  
  const currentUser = AuthService.getCurrentUser();


  if(!currentUser)
  { console.log(currentUser)
    return <Redirect to='/users/error'  />
  }



else {

  var toggleButtonText = {
    Friend: function(button) {
      button.textContent = "Unfriend";
    },
    Unfriend: function(button) {
      button.textContent = "Friend";
    }
  };

  var actOnFriend = function (event) {
        // console.log(event.target+1)
          var userId = event.target.dataset.userId;
          // console.log(userId)
          // console.log(event.target.dataset.postId)
          var action = event.target.textContent.trim();
          // console.log(action)

          toggleButtonText[action](event.target);
          axios.post('http://localhost:5000/users/' + userId + '/act', { action: action,userId: currentUser.user.id })
          .then(function (response) {
            AuthService.updateCurrentUser(currentUser.user.username).then((data)=>data);
    return response;
  })
  .catch(function (error) {
    console.log(error.response.data);  
     console.log(error.response.status);  
     console.log(error.response.headers); 
  });
};



var actOnPost = function (event) {
 
  var postId = event.target.dataset.postId;
 
  var action = event.target.textContent.trim();

  toggleLikeButtonText[action](event.target);
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

var toggleLikeButtonText = {
    Like: function(button) {
        button.textContent = "Unlike";
    },
    Unlike: function(button) {
        button.textContent = "Like";
    }
};
  








  return (
    <>
    <h1 className="display-1"> {data.user.username}</h1>
    {currentUser.user.friends && currentUser.user.friends.includes(data.user._id) ?
    <div>
     <button onClick={actOnFriend}  style={{display:"inline"}} className="btn btn-success btn-lg mx-5" data-user-id ={data.user._id}>Unfriend</button> </div>
     :  
     <div>
      <button onClick={actOnFriend}  style={{display:"inline"}} className="btn btn-success btn-lg mx-5" data-user-id ={data.user._id}>Friend</button> </div> }
    <dl className="row fs-4">
      
            <dt className="col-sm-3">Full Name:</dt>
            <dd className="col-sm-9"> {data.user.first_name + ' ' + data.user.Last_name} </dd>
  
            <dt className="col-sm-3">Date of Birth:</dt>
            <dd className="col-sm-9"> {new Date(data.user.date_of_birth).toDateString()}</dd>
  
            <dt className="col-sm-3">Country:</dt>
            <dd className="col-sm-9"> {data.user.country}</dd>
  
            <dt className="col-sm-3">City:</dt>
            <dd className="col-sm-9"> {data.user.city} </dd>
  
            <dt className="col-sm-3">Gender:</dt>
            <dd className="col-sm-9"> {data.user.gender}</dd>
          
            <dt className="col-sm-3">User ID:</dt>
            <dd className="col-sm-9"> {data.user._id}</dd>   
        
          </dl>

          <div className="row">
        <div className="col">
          <Link to={`/users/${data.user._id}/friends`} className="text-decoration-none text-success"><b> Friends<b className="mx-2 text-decoration-none">  {data.user.friends.length}</b></b></Link>
        </div>
      </div>

      <div className="row ">
        <div className="col">

          
          {  data.user_posts_list ? 
            data.user_posts_list.map((post)=>(
              <div key={post._id}>
               <div className="blog-preview" >
              <div className="title">
                <h5 className="d-inline me-3">{post.post_name}</h5>
                <small className="mx-3"> {post.posted_at} </small>
              </div>
              <div className="details">
                <p className="">{post.post_details}</p>
                <div>
                  
              { currentUser.liked_posts && currentUser.liked_posts.includes(post._id) ?<><button onClick={actOnPost}  style={{display:"inline"}} className="btn btn-warning btn-sm" data-post-id ={post._id}>Unlike</button>
                    <span id={`likes-count-${post._id}`}>&ensp;<strong>  {post.likes_count}</strong></span></>:<><button onClick={actOnPost}   style={{display:"inline"}} className="btn btn-warning btn-sm" data-post-id ={post._id}>Like</button>
                    <span id={`likes-count-${post._id}`}>&ensp;<strong>  {post.likes_count}</strong></span></> }

                    
    
                   

                  
                    
               
                </div>

                <Link to={{
              pathname:`/users/posts/${post._id}`,
              state: {post}}} type='button' className="btn btn-success my-2 fw-bold"  >Go to this post</Link>
                {post.user_id === currentUser.user.id ? <Link to={{
              pathname:`/users/posts/${post._id}/delete`,
              state: {post}}} type='button' className="btn btn-danger btn-lg fw-bold my-2">Delete</Link> : ""}
                  
              </div>
            
  
            </div>

              </div> 


            )
            )
:''}

</div>
</div>
</>
  )
}


}

           
   

 
export default UserProfile;