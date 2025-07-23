import moment from 'moment';
import  { HMS_API } from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSearch } from '../screens/Function/Chung/functionContentError';
import SaveJWTToken, { GetJWTToken } from '../screens/Function/Chung/functionAsyncJWTtoken';

export const Getnghiphep = async(periodid)=>{

  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'))
  var token = await GetJWTToken();
  
  try {
    const result = await HMS_API(`Nghiphep/Thang?periodID=${periodid}&nhanvienID=${thongtin.nhanvienid}`,{
      
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
    return handleSearch(error)
  }
}

export const Getnghiphep_phongbanid = async(periodid)=>{

  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'))
  var token = await GetJWTToken();
  
  try {
    const result = await HMS_API(`Nghiphep/Dexuat?periodID=${periodid}&nhanvienId=${thongtin.nhanvienid}&phongbanID=${thongtin.phongbanid}&congtyID=${thongtin.congtyid}`,{ 
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
    return handleSearch(error)
  }
}

export const Postnghiphep = async(day,loaingay,lydo)=>{
  
  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'));
  var token = await GetJWTToken();
  //var songay = parseFloat(await AsyncStorage.getItem('songay'));
  day = moment(day).format('YYYY-MM-DD')
  loaingay=JSON.stringify(loaingay)

  try {
    const result = await HMS_API(`Nghiphep?nhanvienID=${thongtin.nhanvienid}&ngay=${day}&songay=${loaingay}&lydo=${lydo}`,{
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
    console.log(error)
    return handleSearch(error)
  }
}

export const PutDuyet = async(data)=>{

  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'))
  var token = await GetJWTToken();
  
  try {
    const result = await HMS_API(`Nghiphep/DuyetOk?phieuId=${data.donxinphepid}&nvduyetId=${thongtin.nhanvienid}`,{
      
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
    return handleSearch(error)
  }
}

export const PutTuChoi = async(data)=>{

  var thongtin = JSON.parse(await AsyncStorage.getItem('nhanvien'))
  var token = await GetJWTToken();

  try {
    const result = await HMS_API(`Nghiphep/DuyetTuchoi?phieuId=${data.donxinphepid}&nvduyetId=${thongtin.nhanvienid}`,{  
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
    return handleSearch(error)
  }
}
