import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = (username,password,first_name,Last_name,date_of_birth,country,city,gender) => {
  console.log(username,password,first_name,Last_name,date_of_birth,country,city,gender)
  return axios.post(API_URL +'register',{
  username,password,first_name,Last_name,date_of_birth,country,city,gender
});
};

const login = (username,password) => {
  return axios.post(API_URL +'authenticate',{
    username, password,
  }).then((response) => {
    console.log(response.data.token)
    if(response.data.token){
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"))
};


const  updateCurrentUser = (username) =>{
  const currentUser = getCurrentUser();
  return axios.post(API_URL +'update',{
    username
  }).then((response) => {
   
    if(response.data){
      Object.keys(currentUser.user).map(key => (currentUser.user[key] = response.data.user[key]))

      localStorage.setItem("user", JSON.stringify(currentUser));
    }
    return response.data;
  });
}


const auth = 
{
  register,
  login,
  logout,
  getCurrentUser,
  updateCurrentUser,
  
};
 export default auth;