import React, { useEffect, useState, useRef } from 'react';
import {Link,useLocation} from 'react-router-dom'
import AuthService from "./services/auth.service";
import  { Redirect,useHistory } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import UserService from "./services/user.service";


const Deletepost = () => {
  const location = useLocation();
  const post = location.state.post
  
  console.log(post._id)

  useEffect(()=>
  {
    const currentUser = AuthService.getCurrentUser();
    if(!currentUser)
    { 
      return <Redirect to='/users/error'  />
    }
  })

  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const history = useHistory();

const handleSubmit = (e) =>{

  e.preventDefault();
  setMessage("");
  setLoading(true);

  if(checkBtn.current.context._errors.length === 0){
    UserService.deletePost(post._id).then(
      (data)=> {
       console.log(data)
       history.push("/users/home");
        window.location.reload();

      },

      (error) => {
        const resMessage = (error.response && error.response.data && error.response.data.message) ||error.message|| error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  } else {
    setLoading(false);
  }
}; 




  
 
  
  return ( 
  
    <div className="container-fluid">
    <div className="row">
      <div className="col">
        <h1>Do you really want to delete this post?</h1>
        <Form onSubmit={handleSubmit} method="POST" ref={form}>

          <Input type="hidden" name='postId' required = {true}  value= {post._id} />

         {/* <button type="submit" className="btn btn-outline-primary fw-bold mx-2">Delete</button> */}

         <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Delete</span>
            </button>

            


         <Link to="/users/home" type="button" className="btn btn-outline-success fw-bold mx-2">Home</Link>

         {message && (
  <div className="form-group">
    <div className="alert alert-danger" role="alert">{message}</div>
    </div>
)}
  <CheckButton style = {{display:"none"}} ref={checkBtn} />

        </Form>
      </div>
    </div>
  </div>
  
  
  
  
   );




}
 
export default Deletepost;