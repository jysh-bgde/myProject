import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Name from "./Name";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Feedback from "./Feedback";
import NotFound from "./NotFound";
import Deletepost from "./Deletepost";
import './index.css';
import  Profile from './Profile';
import  UserProfile from './UserProfile';
import React from "react";
// import AuthService from "./services/auth.service";
import Newpost from "./Newpost";
import Post from "./Post";
import useFetch from "./usefetch";


// import PostList from "./PostList";

function App() {

  
  const {data: posts} = useFetch('http://localhost:3000/home');


   return (
     
     <Router>
 
   <div className="App">
         <Name />
         <Navbar />
             
 
         <div className="content">
 
           <Switch>
 
             <Route  path="/users/home">
               <Home />
             </Route>
 
             <Route path="/users/about">
               <About />
             </Route>
 
             <Route path="/users/contact">
               <Contact />
             </Route>
 
             <Route path="/users/feedback">
               <Feedback />
             </Route>
 
             <Route   path="/users/profile">
               <Profile  posts={posts}/>
             </Route>
             
             <Route path="/users/posts/create">
               <Newpost/>
             </Route>
            
             <Route exact path="/users/posts/:postid">
               <Post />
             </Route>

             <Route path="/users/posts/:postid/delete">
               <Deletepost />
             </Route>

             <Route path="/users/:username">
               <UserProfile />
             </Route>
            



 
             <Route path="/users/error">
               <NotFound />
             </Route>
 
           </Switch>
         </div>
 
 
       </div>
     </Router>
   );
 
}

export default App;
