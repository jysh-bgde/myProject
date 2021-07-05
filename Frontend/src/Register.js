import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
import { Link } from "react-router-dom";
import AuthService from "./services/auth.service";
// import validator from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};



const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vfirst_name = (value) => {
  if (value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The firstname must be below 40 characters.
      </div>
    );
  }
};

const vLast_name = (value) => {
  if (value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The last name must be below 40 characters.
      </div>
    );
  }
};

const vcountry = (value) => {
  if (value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The country name must be below 40 characters.
      </div>
    );
  }
};

const vcity = (value) => {
  if (value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The city name must be below 40 characters.
      </div>
    );
  }
};

const vgender = (value) => {
  if (value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        gender must be below 40 characters.
      </div>
    );
  }
};
const vdate_of_birth = (value) => {
  if (value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Date of Birth must be below 100 characters.
      </div>
    );
  }
};





const Register = () => {
  
  const checkBtn = useRef('');

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState('');
  const [first_name,setFirst_name] = useState('');
  const [Last_name,setLast_name] = useState('');
  const [date_of_birth,setDate_of_birth] = useState('');
  const [country,setCountry] = useState('');
  const [city,setCity] = useState('');
  const [gender,setGender] = useState('');
  // const [image,setImage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

 
  const handleSubmit = (e) =>{
      e.preventDefault();
      // const credentials = {username, password, first_name,Last_name, date_of_birth, country, city, gender,image};

      setMessage("");
      setSuccessful(false);
  
      
  
      if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(username, password, first_name,Last_name, date_of_birth, country, city, gender).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setSuccessful(false);
          }
        );
      }
    };
      
      // setIsPending(true);
      
  //     fetch('/register', {
  //         method:'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(credentials)
          
  //     })
  //     .then((data)=>{
  //         console.log(data)
  //         // setIsPending(false);
  //         // history.go(-1);
  //         // history.push('/');
  //     });
  // }

  return ( 
    <div className="container">
    <div className="row">
      <div className="col">

        <h1>
          Sign Up
        </h1>

        <Form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <Input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" id="username"  name="username"  value={username}   validations={[required, vusername]}/>
          </div>
        
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <Input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" name="password"  value={password}   validations={[required, vpassword]}/>
          </div>

          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">First Name:</label>
            <Input type="text" onChange={(e) => setFirst_name(e.target.value)} className="form-control" id="first_name" name="first_name"  value={first_name}   validations={[required, vfirst_name]}/>
          </div>

          <div className="mb-3">
            <label htmlFor="Last_name" className="form-label">Last Name:</label>
            <Input type="text" onChange={(e) => setLast_name(e.target.value)} className="form-control" id="Last_name" name="Last_name"  value={Last_name}   validations={[required, vLast_name]} />
          </div>

          <div className="mb-3">
            <label htmlFor="date_of_birth" className="form-label">Date of Birth:</label>
            <Input type="date" onChange={(e) => setDate_of_birth(e.target.value)} className="form-control" id="date_of_birth" name="date_of_birth"  value={date_of_birth}   validations={[required, vdate_of_birth]} />
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country:</label>
            <Input type="text" onChange={(e) => setCountry(e.target.value)} className="form-control" id="country" name="country"  value={country}   validations={[required, vcountry]} />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City:</label>
            <Input type="text" onChange={(e) => setCity(e.target.value)} className="form-control" id="city" name="city"  value={city}   validations={[required, vcity]} />
          </div>

          <div className="mb-3">
            <label htmlFor="Gender" className="form-label">Gender:</label>
            <Input type="text" onChange={(e) => setGender(e.target.value)} className="form-control" id="Gender" name="gender"
             value={gender}   validations={[required, vgender]} />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="image" className="form-label">Profile Picture:</label>
            <Input type="file" onChange={(e) => setImage(e.target.value)} className="form-control" id="image"  name="image" value="" required  />
          </div> */}
  
          <div className="d-grid gap-2">
            <button className="btn btn-outline-success fw-bold" type="submit">Submit</button>
          </div>
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <div className="btn-group col-12" role="group" aria-label="Basic example">
          <Link to="/login" type="button" className="btn btn-outline-secondary">Login</Link>
          <Link to="/" type="button" className="btn btn-outline-danger">Back</Link>
          
        </div>

        
      </div>
    </div>
  </div>
   );
}
 
export default Register;