import axios from 'axios';
import { Alert } from 'react-native';

let burl = 'http://simsoft.com.vn:8082/api/SalesManager/';

export const setBaseURL = (url) => {

  burl = url;
  //  Khi đổi URL động thì cần tạo lại instance mới sau khi đổi
  DAMI_API = axios.create({
    baseURL: burl,
    responseType: 'json',
    withCredentials: true,
    timeout:10000
  });
  // Gắn lại interceptor mỗi lần tạo mới
  DAMI_API.interceptors.response.use(
    response => response,
    error => {
      if (error.code === 'ECONNABORTED') {
        Alert.alert('Thông báo', 'Hết thời gian kết nối đến máy chủ. Vui lòng thử lại.');
      }
      return Promise.reject(error);
    }
  );
}

export const getBaseURL = () => {
  return burl;
};

//Sử dụng khi thay đổi URL
/*export let DAMI_API  = () => 
  axios.create({
    baseURL: burl,
    responseType: 'json',
    withCredentials: true,
});*/

//Nếu không dùng setUrl gắn url mặc định cứng
export let DAMI_API = axios.create({
    baseURL: burl,
    responseType: 'json',
    withCredentials: true,
    timeout: 10000
});

  // Gắn interceptor xử lý lỗi timeout
DAMI_API.interceptors.response.use(
    response => response,
    error => {
      if (error.code === 'ECONNABORTED') {
        Alert.alert('Thông báo', 'Hết thời gian kết nối đến máy chủ. Vui lòng thử lại.');
      }
      return Promise.reject(error);
    }
);









