import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import AuthService from "./services/auth.service";
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



const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username,setUsername] = useState("")
const [password,setPassword] = useState('');
const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
// const [author, setAuthor]= useState('');
// const[isPending, setIsPending] =useState(false);
const history = useHistory();

const handleSubmit = (e) =>{
    e.preventDefault();
    // const credentials = {username, password};
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    // setIsPending(true);

    if(checkBtn.current.context._errors.length === 0){
      AuthService.login(username,password).then(
        (data)=> {
          console.log(data)
         history.push("/users/profile");
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
    // fetch('/login', {
    //     method:'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(credentials)
        
    // })
    // .then((data)=>{
    //     console.log(data)
    //     // setIsPending(false);
    //     // history.go(-1);
    //     // history.push('/');
    // });

  return (

    
<div className="container">
  <div className="row">
    <div className="col">
      <h1>
        Login
    </h1>
      <Form onSubmit={handleSubmit} method="POST" ref={form}>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <Input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} id="username" name="username" value={username}  validations={[required]} />
        </div>
      
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <Input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="password" name="password" value = {password}  validations={[required]}/>
        </div>

        <div className="d-grid gap-2">
        <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          
          <Link to="/register" className="btn btn-outline-success fw-bold " type="button">SignUp</Link>
        </div>

     

{message && (
  <div className="form-group my-2">
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
 
export default Login;