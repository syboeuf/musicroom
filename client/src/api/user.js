import axios from "axios";

const BASE_URL = process.env.BASE_URL;
const VERSION_API = process.env.REACT_APP_API_VERSION;

// TODO CHECK WHY ENV NOT DETECTING
export default axios.create({
  // baseURL: "http://192.168.42.120:3000/api/v1/"
  // baseURL: "http://192.168.42.120:3000/api/v1/"
  // baseURL: "http://10.1.9.64:3000/api/v1/"
  //   baseURL: "https://42music.pagekite.me/api/v1/",
  baseURL: "http://ec2-3-15-228-137.us-east-2.compute.amazonaws.com/api/v1/",
});
