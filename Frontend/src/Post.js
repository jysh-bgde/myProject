
import AuthService from './services/auth.service';
import UserService from './services/user.service';
import {useHistory} from 'react-router-dom';
import { useLocation, Link} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import CheckButton from "react-validation/build/button";
import { useState,  useRef, useEffect} from 'react'



const Post = () => {

  const currentUser = AuthService.getCurrentUser();
  const location = useLocation();
  
  const [comment, setComment] = useState(null);
  const [message, setMessage] = useState("");
  

  const form = useRef();
  const checkBtn = useRef();

let post = location.state.post
const history = useHistory();
// console.log(props.location.state.product)
const [loading, setLoading] = useState(false);

// if(!post.comments){
//   const {data: post} = useFetch('http://localhost:3000/users/' + currentUser.user.id + '/posts' + location.state.post._id)

//   post=location.state.post



// }


useEffect(()=>{

 return post

},[post])




const handleSubmit = (e) =>{

  e.preventDefault();
  // const credentials = {username, password};
  setMessage("");
  setLoading(true);
  form.current.validateAll();

  if(checkBtn.current.context._errors.length === 0){



    axios.post("http://localhost:5000/posts/" + post._id + '/comments',{username: currentUser.user.username, msg: comment}).then((response) => {
      console.log(response.data,45)
      
      UserService.updateCurrentPost(post._id).then(data =>{ post= data;
     })
      console.log(post,49);
     

      
      setLoading(false);

      console.log(post);
      window.location.reload();
      
    }
    ).catch(function (error) {
      console.log(error.response.data);  
      console.log(error.response.status);  
      console.log(error.response.headers); 
      setLoading(false);
    });
  }
  
  
}


const handleDelete = (e,comment) => {
  e.preventDefault();

  axios.post("http://localhost:5000/posts/" + post._id + '/comments/delete',{commentId : comment._id}).then((response) => {
    console.log(response.data,93)
    
    UserService.updateCurrentPost(post._id).then(data =>{ post= data;
   })
    console.log(post,49);
   

    
    setLoading(false);

    console.log(post);
    window.location.reload();
    
  }
  ).catch(function (error) {
    console.log(error.response.data);  
    console.log(error.response.status);  
    console.log(error.response.headers); 
    setLoading(false);
  });



}





return ( 
    <div className="container-fluid">
  <div className="row">
    <div className="col">
      <h1 className="display-1 d-md-inline"><b>{post.post_name}</b></h1>
      <small className="p fs-5 mx-5"><b>{post.user_id}</b></small> 
      <p>{post.posted_at}</p>
 
      <p className="fs-2">{post.post_details}</p>
     
      <a href="/users/home" type='button' className="btn btn-outline-success btn-lg fw-bold">Home</a>
      <button type="button" className="btn btn-outline-primary btn-lg fw-bold mx-3" onClick={history.goBack}>Back</button>
     
      {post.user_id === currentUser.user.id ? <Link to={{
              pathname:`/users/posts/${post._id}/delete`,
              state: {post}}} type='button' className="btn btn-outline-danger btn-lg fw-bold my-2">Delete</Link> : ""}


            <div className="container-fluid ">
              <Form className=" my-2 " onSubmit={handleSubmit} method="POST" ref={form}>
                <Input className="form-control" type="text" placeholder="Add comment" name="comment"  onChange={(e) => setComment(e.target.value)} />
                {/* <button className="btn mx-2 btn-outline-light">Search</button> */}

                <div className="d-grid gap-2 my-2">
                <button className="btn  btn-success " disabled={loading}>
              {loading && (
                <span className="btn btn-success"></span>
              )}
              <span>Add Comment</span> 
            </button>
                </div>

                <div>
                {message && (
  <div className="form-group">
    <div className="alert alert-danger" role="alert">{message}</div>
    </div>
)}</div>

<CheckButton style = {{display:"none"}} ref={checkBtn} />
              </Form>
              </div>

                  
                

     {post.comments && post.comments.map((comment)=>(
      
      <div key={comment._id} className="list-group-item">


        <p> <strong> {comment.username}</strong>: {comment.msg}</p>


        {comment.username === currentUser.user.username ? 

        <div>
        <button  className="btn btn-outline-danger" onClick={(e) =>handleDelete(e,comment)}>Delete</button></div>
        : ""}
       </div>


     ))}


      
        
    </div>
  </div>
    
</div>
   );
}
 
export default Post;