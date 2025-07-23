export const handleSearch=(error)=>{   
        console.log("Lỗi status: ",error)
        let thongtin = error.response
        let Status = error.response.status
        let Data = error.response.data
        if(Status==503||Status==504||Status==999||Status==502||Status==501||Status==500){
          return thongtin
        }else if(Status==404){
          return thongtin
        }else{
          return thongtin
        } 
  
}
