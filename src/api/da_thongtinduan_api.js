import { handleSearch } from '../screens/Function/Chung/functionContentError';
import { HMS_API } from './ApiManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveJWTToken, { GetJWTToken } from '../screens/Function/Chung/functionAsyncJWTtoken';

export const Getduan_by_nhanvienid = async(nhanvienid) => {

    var token = await GetJWTToken();
    try {
      //const result = await HMS_API(`Nhanvien/Id?Manv=${manv}`, {
      const result = await HMS_API(`Duan/Id?nhanvienid=${nhanvienid}`, {
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
        console.log(error)
      return handleSearch(error)
    }
}

export const PostDuan = async(maduan,tenduan,tongmucdautudukien,namthongbaokehoach,songaykehoach,tinhtrangduan,nhanvienid)=>{

  var token = await GetJWTToken();
  console.log(maduan,tenduan,tongmucdautudukien,namthongbaokehoach,songaykehoach,tinhtrangduan,nhanvienid)
  try {
    
      //const result = await HMS_API(`Taisan?congtyid=DT`,{
      const result = await HMS_API(`Duan?maduan=${maduan}&tenduan=${tenduan}&tongmucdautudukien=${tongmucdautudukien}&namthongbaokehoach=${namthongbaokehoach}&songaykehoach=${songaykehoach}&tinhtrangduan=${tinhtrangduan}&nhanvienid=${nhanvienid}`,{
      method: 'POST',                
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

export const PutDuan = async(duanid,maduan,tenduan,tongmucdautudukien,namthongbaokehoach,songaykehoach,tinhtrangduan)=>{

  var token = await GetJWTToken();
  
  try {
    
      //const result = await HMS_API(`Taisan?congtyid=DT`,{
      const result = await HMS_API(`Duan?duanid=${duanid}&maduan=${maduan}&tenduan=${tenduan}&tongmucdautudukien=${tongmucdautudukien}&namthongbaokehoach=${namthongbaokehoach}&songaykehoach=${songaykehoach}&tinhtrangduan=${tinhtrangduan}`,{
      method: 'PUT',                
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

export const DeleteDuan = async(duanid)=>{

  var token = await GetJWTToken();
  
  try {
    
      //const result = await HMS_API(`Taisan?congtyid=DT`,{
      const result = await HMS_API(`Duan?duanid=${duanid}`,{
      method: 'DELETE',                
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
