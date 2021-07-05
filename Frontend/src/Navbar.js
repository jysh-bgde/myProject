
import { Link } from "react-router-dom";
import { useState, useEffect, useRef} from 'react'
// import Logout from "./Logout"
import UserService from "./services/user.service";
import AuthService from "./services/auth.service";
// import Welcome from "./Welcome"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useHistory} from 'react-router-dom';
import CheckButton from "react-validation/build/button";


const Navbar = () => {

  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(undefined);
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);


//   const [isActive, setIsActive] = useState(true);


// function handleClick() {

//   setIsActive(!isActive);

// }

const logout =  () =>{
  AuthService.logout();
}




const handleSubmit = (e) =>{
  console.log(username)
  e.preventDefault();
  // const credentials = {username, password};
  setMessage("");
  setLoading(true);
  form.current.validateAll();
  // setIsPending(true);

  if(checkBtn.current.context._errors.length === 0){
    UserService.searchUsername(username).then(
      (data)=> {
       console.log(data.data)
      //  history.push({
      //   pathname:`/users/${username}`,
      //   state: {data}});
      data = data.data
      history.push({ 
        pathname: `/users/${username}`,
        state: {data}
       });


      //  history.push(`/users/${username}`, {data.data});

     


     

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
    <nav className="navbar bg-primary sticky-top " style={{zIndex:"1"}}>
   

      <ul className="nav nav-pills ">
        <li className="nav-item " >
          <Link to="/users/home" className= "nav-link text-light"  >
            HOME
          </Link>
        </li>
        <li className="nav-item " >
          <Link to="/users/about"  className= "nav-link text-light" >
            ABOUT
          </Link>
        </li>
        <li className="nav-item " >
          <Link to="/users/contact"  className= "nav-link text-light" >
            CONTACT US
          </Link>
        </li>
        <li className="nav-item ">
          <Link to="/users/feedback"  className= "nav-link text-light" >
            FEEDBACK
          </Link>
        </li>
        

        {currentUser ? (
          
          <div className="nav nav-pills">
            <li className="nav-item">
              <Link to={"/users/posts/create"} className="nav-link text-light">
               NEW POST
              </Link>
            </li>
            <li className="nav-item ">
          <Link to="/users/profile"  className= "nav-link text-light" >
           PROFILE
          </Link>
        </li>
            <li className="nav-item" onClick ={logout}>
              <a href = "/login"  className="nav-link text-light" >
              LOGOUT
              </a>
            </li>
          </div>
        ) : ''}
      </ul>
      <div className="ms-auto mx-2">
              <Form className="d-flex mx-2" onSubmit={handleSubmit} method="GET" ref={form}>
                <Input className="form-control mx-2" type="search" placeholder="username" aria-label="Search" name="username"  onChange={(e) => setUsername(e.target.value)} />
                {/* <button className="btn mx-2 btn-outline-light">Search</button> */}

                <button className="btn mx-2 btn-outline-light" disabled={loading}>
              {loading && (
                <span className="btn mx-2 btn-outline-light"></span>
              )}
              <span>Search</span> 
            </button>


                <div>
                {message && (
  <div className="form-group">
    <div className="alert alert-danger" role="alert">{message}</div>
    </div>
)}</div>

<CheckButton style = {{display:"none"}} ref={checkBtn} />
              </Form>
              </div>
     
    </nav>
  );
};

export default Navbar;
