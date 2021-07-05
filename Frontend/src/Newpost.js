import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import UserService from "./services/user.service";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';

const required = (value)=>{
  if(!value){
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>

    );
  }
};

const Newpost = () => {

  
  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [post_name, setName] = useState(null);
const [post_details, setDetails] = useState(null);
const history = useHistory();

const handleSubmit = (e) =>{
  e.preventDefault();
  // const credentials = {username, password};
  setMessage("");
  setLoading(true);
  form.current.validateAll();
  // setIsPending(true);

  if(checkBtn.current.context._errors.length === 0){
    UserService.createPost(post_name,post_details).then(
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
              <h1 >Create Post</h1>
        <Form onSubmit={handleSubmit} method="POST" ref={form}>

          <div className="mb-3">
            <label htmlFor="postTitle" className="form-label">POST TITLE:</label>
            <Input type="text" className="form-control" id="postTitle" onChange={(e) => setName(e.target.value)} name="post_name"  value={post_name}  validations={[required]} />
          </div>
        
          <div className="mb-3">
            <label htmlFor="postDetails" className="form-label">POST DETAILS:</label>
            <Input type="text" className="form-control" id="postDetails" onChange={(e) => setDetails(e.target.value)} name="post_details" value={post_details}  validations={[required]}/>
          </div>
  
          <div className="d-grid gap-2">
        <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Submit</span>
            </button>
          
          <Link to="/register" className="btn btn-outline-success fw-bold " type="button">Home</Link>
        </div>
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
 
export default Newpost;