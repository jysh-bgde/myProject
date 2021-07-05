import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";

const API_URL = "http://localhost:5000/"

const currentUser = AuthService.getCurrentUser();


const getPublicContent = () => {
  return axios.get(API_URL + "home");
};

const getUserBoard = () => {
  return axios.get(API_URL + "home", { headers: authHeader() });
};

const createPost = (post_name, post_details) => {
  return axios.post(API_URL + "users/" + currentUser.user.id + "/posts/create",{post_name, post_details, userid: currentUser.user.id });
}

const deletePost = (postId) => {
  return axios.post(API_URL + "users/" + currentUser.user.id + "/posts/" + postId +"/delete",{postId})
}

const searchUsername = (username) => {
  return axios.get(API_URL + "username", {
    params: {
      username: username
    }
  })
}

const updateCurrentPost = (postid) =>{
  return axios.get(API_URL +'post/' + postid).then(response=>{ return response.data})
 }
const CRUD = {
  getPublicContent,
  getUserBoard,
  createPost,
  deletePost,
  searchUsername,
  updateCurrentPost
};
 export default CRUD;