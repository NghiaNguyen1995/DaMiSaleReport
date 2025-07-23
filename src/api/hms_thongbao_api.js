import  { HMS_API } from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSearch } from '../screens/Function/Chung/functionContentError';
import SaveJWTToken, { GetJWTToken } from '../screens/Function/Chung/functionAsyncJWTtoken';



export const GetThongbao = async(data)=>{
  
  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'))
  var token = await GetJWTToken();
  
  //Tạm xài để cho QR với data qrcode (Chức năng tài sản)
  const checkdata=()=>{
    if(data==''){
      return thongtin.nhanvienid
    }else{
      return data
    }
  }

  let type = checkdata()

  try {
    //const result = await HMS_API(`Thongbao?nhanvienId=${thongtin.nhanvienid}`,{
    const result = await HMS_API(`Thongbao?nhanvienId=${type}`,{
      method: 'GET',                
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      //body: JSON.stringify(data)
    });
    
    if(result.headers.newtoken!=null){
      SaveJWTToken(result.headers.newtoken)
    }
   
    return result;
  } catch (error) {
    return handleSearch(error)
  }
}

