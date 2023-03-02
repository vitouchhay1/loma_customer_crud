import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("token")
const getUserBoard = (name,gender) => {
  console.log(name, gender,'getr');
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
  let url = 'customers/paginate';
  if(name && gender) {
    url = url +`?name=${name}&gender=${gender}`;
  }else if(name) {
    url = url +`?name=${name}`;
  }else if(gender) {
    url = url +`?gender=${gender}`;
  }
  return axios.get(API_URL + url);
};
const createUser = (data) => {
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
  return axios.post(API_URL + "customers",data);
}; 
const updateUser = (id,data) => {
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
  return axios.patch(API_URL + "customers/"+id,data);
}; 
const deleteUser = (id) => {
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
  return axios.delete(API_URL + "customers/"+id);
};
const UserService = {
  getUserBoard,
  createUser,
  updateUser,
  deleteUser
}

export default UserService;
