import PostList from './PostList';
import useFetch from './usefetch';
import React from "react";
import AuthService from "./services/auth.service";
import  { Redirect } from 'react-router-dom';





const Home = () => {

   

    const currentUser = AuthService.getCurrentUser();
    const {data: posts,isPending,error} = useFetch('http://localhost:3000/home');
    
    if(!currentUser)
    { 
      return <Redirect to='/users/error'  />
    }


else{

        return ( 
            <div className="home">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {posts  && <PostList posts={posts} title="All Posts!"  />}
                
       
            </div>
         );

}
   
// const {data: blogs,isPending,error} = useFetch('http://localhost:5000/blogs');
}
 
export default Home;