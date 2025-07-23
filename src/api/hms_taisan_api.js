import  { HMS_API } from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleSearch } from '../screens/Function/Chung/functionContentError';
import SaveJWTToken, { GetJWTToken } from '../screens/Function/Chung/functionAsyncJWTtoken';

export const GetListTaisanCongtyid = async(congtyid)=>{

  var token = await GetJWTToken();
  
  try {
    
    const result = await HMS_API(`Taisan?congtyid=${congtyid}`,{
      
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

export const GetTaisanId = async(taisanid)=>{

  var token = await GetJWTToken();
  
  try {
    
      //const result = await HMS_API(`Taisan?congtyid=DT`,{
      const result = await HMS_API(`Taisan/Id?taisanid=${taisanid}`,{
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