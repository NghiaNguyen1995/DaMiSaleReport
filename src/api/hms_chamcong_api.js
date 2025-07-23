import SaveJWTToken, { GetJWTToken } from '../screens/Function/Chung/functionAsyncJWTtoken';
import { handleSearch } from '../screens/Function/Chung/functionContentError';
import  { HMS_API } from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Getchamcongthang = async(periodid)=>{

  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'))
  var token = await GetJWTToken();
  
  try {
    const result = await HMS_API(`Chamcong/Thang?nhanvienID=${thongtin.nhanvienid}&PeriodID=${periodid}`,{
      
      method: 'GET',                
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
    return handleSearch(error);
  }
}

export const Postchamcong_gps = async(myvidoshow,mykinhdoshow,loaicham)=>{
  
  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'))
  var token = await GetJWTToken();
  
  try {

    const result = await HMS_API(`Chamcong?nhanvienId=${thongtin.nhanvienid}&latitude=${myvidoshow}&longtitude=${mykinhdoshow}&checkIn=${loaicham}`,{
      method: 'POST',                
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
    //console.log('Lỗi:',error.response.data)
    return handleSearch(error);
  }
}

export const Getvitri_gps = async()=>{

  var token = await GetJWTToken();;
  
  try {
    const result = await HMS_API(`Chamcong/Location`,{
  
      method: 'GET',                
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
    return handleSearch(error);
  }
}

