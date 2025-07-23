import moment from 'moment';
import  { HMS_API } from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSearch } from '../screens/Function/Chung/functionContentError';
import SaveJWTToken, { GetJWTToken } from '../screens/Function/Chung/functionAsyncJWTtoken';



export const GetListCongViec = async(duanid)=>{

  var token = await GetJWTToken();
  
  try {
    
    const result = await HMS_API(`Congviec/Id?duanid=${duanid}`,{
      
      method: 'GET',                
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
     
    });
    if(result.headers.newtoken!=null){
      SaveJWTToken(result.headers.newtoken)
    }
    return result;
  } catch (error) {
    return handleSearch(error)
  }
}

export const PutCongviec = async(duanid,tmpid,sovanban,ngayluykekt,tienluyke)=>{

  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'))
  var token = await GetJWTToken();
  
  try {
    const result = await HMS_API(`Congviec?duanid=${duanid}&tmpid=${tmpid}&sovanban=${sovanban}&ngayluykekt=${ngayluykekt}&tienluyke=${tienluyke}`,{
      
      method: 'PUT',                
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    if(result.headers.newtoken!=null){
      SaveJWTToken(result.headers.newtoken)
    };
    return result;
  } catch (error) {
    console.log(error.response)
    return handleSearch(error)
  }
}