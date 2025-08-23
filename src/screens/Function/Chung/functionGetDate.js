export function GetDate(){
        const date = new Date();
        let day,month,hour,minute,second
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
        if(date.getSeconds()<10){
          second = `0${date.getSeconds()}`
        }else{
          second= `${date.getSeconds()}`
        }
        
        let dateString = `${day}-${month}-${date.getFullYear()} ${hour}:${minute}:${second}`;
        return dateString     
}

export function GetGuidId(){
  const date = new Date();
  let day,month,hour,minute,second
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
  if(date.getSeconds()<10){
    second = `0${date.getSeconds()}`
  }else{
    second= `${date.getSeconds()}`
  }

  let dateString = `${date.getFullYear()}${month}${day}${hour}${minute}${second}`;
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
    return dataThongKeGioRaVao  
}