import { handleSearch } from '../screens/Function/Chung/functionContentError';
import { DAMI_API, HMS_API } from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Getnhanvien_by_manv = async(manv) => {

    try {
      //const result = await HMS_API(`Nhanvien/Id?Manv=${manv}`, {
      const result = await DAMI_API('Nhanvien/Id?Manv=admin&Password=np1995', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },     
      });
      
      return result;
    } catch (error) {
      console.log(error)
      return handleSearch(error)
    }
}

export const Postnhanvien=async(manv)=>{
  try {
    
    const result = await HMS_API(`Nhanvien?manv=${manv}&hoten=${manv}&gioitinh=NAM&phongbanId=IT&congtyId=DT&isquanly=false`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        
        },
    });
    return result;
  } catch (error) {
      console.log(error)
    return handleSearch(error)
  }
}

export const Putnhanvien_tokenDevice = async(data)=>{

    var nhanvien = JSON.parse(await AsyncStorage.getItem('nhanvien'))
    var tokenDevice = await AsyncStorage.getItem('fcmToken')

    try {
      const result = await HMS_API(`Nhanvien/TokenDevice?nhanvienId=${nhanvien.nhanvienid}&tokenDevice=${tokenDevice}`,{
        method: 'PUT',                
        headers: {
          'content-type': 'application/json',
          //'Content-Type': 'application/json-patch+json'
        },
      data: JSON.stringify(data)
      });
      return result;
    } catch (error) {
      return handleSearch(error)
    }
}

