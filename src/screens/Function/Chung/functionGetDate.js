export function GetDate(){
    
        const date = new Date();
        let day,month,hour,minute
        if(date.getMonth()+1<10){
          month = `0${date.getMonth()+1}`
        }else{
          month = `${date.getMonth()+1}`
        }
        if(date.getDate()<10){
          day = `0${date.getDate()}`
        }else{
          day= `${date.getDate()}`
        }
        if(date.getHours()<10){
          hour = `0${date.getHours()}`
        }else{
          hour= `${date.getHours()}`
        }
        if(date.getMinutes()<10){
          minute = `0${date.getMinutes()}`
        }else{
          minute= `${date.getMinutes()}`
        }
        
        //const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        
        let dateString = `${day}-${month}-${date.getFullYear()} ${hour}:${minute}`;
        return dateString     
}

export function GetGuidId(){
    
  const date = new Date();
  let day,month,hour,minute
  if(date.getMonth()+1<10){
    month = `0${date.getMonth()+1}`
  }else{
    month = `${date.getMonth()+1}`
  }
  if(date.getDate()<10){
    day = `0${date.getDate()}`
  }else{
    day= `${date.getDate()}`
  }
  if(date.getHours()<10){
    hour = `0${date.getHours()}`
  }else{
    hour= `${date.getHours()}`
  }
  if(date.getMinutes()<10){
    minute = `0${date.getMinutes()}`
  }else{
    minute= `${date.getMinutes()}`
  }
  
  //const dateString = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  
  let dateString = `${date.getFullYear()}${month}${day}${hour}${minute}`;
  return dateString     
}

//Set data footer hiển thị Ngày
export const SetNgayGio=()=>{
    let dateString = GetDate()
    let dataThongKeGioRaVao={}
    dataThongKeGioRaVao={
            loaithongke:'thongkengay',
            day: dateString
    }
    //console.log('Footer trang chủ: ',dataThongKeGioRaVao)
    return dataThongKeGioRaVao  
}