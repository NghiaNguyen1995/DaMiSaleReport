import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,Modal,Dimensions, StyleSheet,Image, Linking, TouchableWithoutFeedback} from 'react-native'
import { COLORS, icons } from '../../../../constants';
import { object } from '../../../../constants/theme';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ModalStyle, containerInput } from '../../../../constants/stylechung';

const windowWidth = Dimensions.get('window').width;

export const FunctionViewThongBao = (loaithongbao,modalthongbao,setmodalthongbao,data)=>{
      return(
        <Modal visible={modalthongbao} animationType="fade" transparent={true}>
          <TouchableWithoutFeedback onPress={()=>setmodalthongbao(false)}>
            <View style={ModalStyle.centeredView}>
              <View style={ModalStyle.Modal}>
                
                {/* Title Thông báo */}
                <View style={{backgroundColor: COLORS.skin2.bgheader,padding:10}}>
                      <Text style={{...object.labelTitle,textAlign:'center',fontWeight:'bold'}}>Thông báo</Text>
                </View>

                {/* Nội dung thông báo */}
                <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  
                  {/*Login*/}
                  {loaithongbao == 'NoUsernamePasswordInput' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng nhập thông tin</Text>):null}
                  {loaithongbao == 'NoUsernameInput' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng nhập tài khoản</Text>):null}
                  {loaithongbao == 'NoPassInput' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng nhập mật khẩu</Text>):null}
                  {loaithongbao == 'NoFindListData' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Đăng nhập không thành công</Text>):null}
                  {loaithongbao == 'NoUserInListData' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Tài khoản không tồn tại</Text>):null}
                  {loaithongbao == 'ErrorPassword' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Mật khẩu không đúng</Text>):null}
                  {loaithongbao == 'NoRegistAccount' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Tài khoản chưa đăng ký</Text>):null}
                  
                  {loaithongbao == 'UpdatePasswordSuccess' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Cập nhật mật khẩu thành công</Text>):null}
                  {loaithongbao == 'UpdatePasswordFail' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Cập nhật mật khẩu thất bại{'\n'}Vui lòng thử lại!</Text>):null}
                  
                  {loaithongbao == 'DevDevelope' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Chức năng đang phát triển</Text>):null}
                  {loaithongbao == 'Nouser' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Người dùng chưa chọn tài khoản</Text>):null}
                  
                  {loaithongbao == 'WarningDate' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng chọn 'Từ ngày' nhỏ hơn 'Đến ngày'</Text>):null}
                  {loaithongbao == 'WarningNoDataToExport' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Không có dữ liệu để xuất Excel</Text>):null}
                  {loaithongbao == 'ErrorWriteExcel' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Không thể ghi dữ liệu vô Excel</Text>):null}
                  {loaithongbao == 'ErrorOpenExcel' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>
                  {'File đã được lưu nhưng thiết bị không có ứng dụng để mở file .xlsx.\n'+'Vui lòng cài đặt ứng dụng như Excel, WPS Office hoặc Google Sheets.'}</Text>):null}
                  {loaithongbao == 'ErrorExportExcel' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Lỗi xuất Excel</Text>):null}
                  




                  {/*Đăng ký*/}
                  {loaithongbao == 'COPYTOCLIPBOARD' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Đã sao chép mã đăng ký{'\n'}Người dùng gửi nội dung này cho{'\n'}người quản trị</Text>):null}
            
                  {/* Trang chủ */}
                  {loaithongbao == 'Location' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng bật định vị để chấm công</Text>):null}

                  {/* Nghỉ phép */}
                  {loaithongbao == 'ResignationSuccess' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Gửi đơn xin phép thành công</Text>):null}
                  
                  {/* Chấm công */}
                  {loaithongbao == 'Timekeeping' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Đã chấm công ngày {`${data.day}`} vào lúc {`${data.thoigian}`}</Text>):null}
                  {loaithongbao == 'TimekeepingInSuccess' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Chúc bạn ngày làm việc vui vẻ</Text>):null}
                  {loaithongbao == 'TimekeepingOutSuccess' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Cảm ơn và hẹn gặp lại</Text>):null}
                  {loaithongbao == 'TimekeepingNoSuccess' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vị trí không hợp lệ</Text>):null}
                  {loaithongbao == 'MaintenanceSystem' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Hệ thống đang bảo trì</Text>):null}
                  {loaithongbao == 'NoLocation' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Chưa xác định vị trí</Text>):null}
                  
                  {/* Phiếu lương */}
                  {loaithongbao == 'NoDataSalary' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Chưa có dữ liệu phiếu lương</Text>):null}

                  {/* Tài sản */}
                  {loaithongbao == 'NoDocument' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center',color:'gray'}}>Không tìm thấy dữ liệu</Text>):null}
                  
                  {/* Công việc Download */}
                  {loaithongbao == 'NotFileExactly' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center',color:'gray'}}>File không hợp lệ</Text>):null}
                  {loaithongbao == 'NotFindFile' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center',color:'gray'}}>Không tìm thấy file trong GG Drive</Text>):null}
                  {loaithongbao == 'NodataInputCongViec' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center',color:'gray'}}>Dữ liệu có dấu {"(*)"} là bắt buộc</Text>):null}
                  

                  {/*tab User*/}
                  
                  {loaithongbao == 'NoGranted' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Tài khoản chưa được cấp quyền xem App trên Server</Text>):null}
                  {loaithongbao == 'NoGrantedFunction' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Tài khoản chưa được cấp quyền</Text>):null}
                  {loaithongbao == 'AdminNoGrantedFunction' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Admin không được chấm công</Text>):null}
                  {loaithongbao == 'NodataInput' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Dữ liệu có dấu {"(*)"} là bắt buộc</Text>):null}
                  {loaithongbao == 'UserAdd' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Đăng ký tài khoản thành công</Text>):null}
                  
                  {loaithongbao == 'MonthType' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Nhập tháng từ 1 đến 12</Text>):null}
                  {loaithongbao == 'YearInput' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng nhập năm</Text>):null}
                  {loaithongbao == 'MonthInput' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng chọn tháng</Text>):null}
                  {loaithongbao == 'DataInput' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng nhập dữ liệu{'\n'}để tra cứu thông tin</Text>):null}
                  {loaithongbao == 'Datademo' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Đã có dữ liệu demo !</Text>):null}
                  {loaithongbao == 'Successfully' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Đã lấy dữ liệu demo thành công !</Text>):null}
                  
                  {/*Dự án*/}
                  {loaithongbao == 'Nodata' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Chưa có dữ liệu báo cáo</Text>):null}
                  {loaithongbao == 'NoPermissionsGranted' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Tài khoản chưa được cấp quyền</Text>):null}
                
                </View>

                {/* Button đóng thông báo */}
                <View style={{...containerInput.viewButton,justifyContent:'center',marginTop:15,marginBottom:15}}>
                
                  <TouchableOpacity
                    style={{...containerInput.buttonCancle}}
                    onPress={() => {setmodalthongbao(false)
                      if(loaithongbao=="NoDataSalary"||loaithongbao=="TimekeepingInSuccess" || loaithongbao=="TimekeepingOutSuccess" || loaithongbao=="ResignationSuccess"){
                        data.navigation()
                      }
                    }}
                  >
                  <Text style={{...containerInput.buttonText}}>Đóng</Text>
                </TouchableOpacity>
                
                </View>
            
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )
}

export const FunctionViewThongBaoDA = (loaithongbao,modalthongbao,setmodalthongbao,setmodalsuaduan,setVisible,handleSearchVoice,timkiem,setTimkiem,startRecognizing,hanldRefresh,loading,setloading)=>{
  const ViewThongbao = ()=>{
      return(
        <Modal visible={modalthongbao} animationType="fade" transparent={true}>
          <View style={ModalStyle.centeredView}>
          <View style={ModalStyle.Modal}>
         
            {/* Tiêu đề thông báo */}
            <View style={{backgroundColor: COLORS.skin2.bgheader,padding:10}}>
                {loaithongbao != 'VoiceData'?(
                  <Text style={{...object.labelTitle,textAlign:'center'}}>Thông báo</Text>
                ):(
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text></Text>
                    <Text style={{...object.labelTitle,textAlign:'center'}}>Tìm kiếm bằng giọng nói</Text>
                    <TouchableOpacity style={{justifyContent:'flex-end'}} 
                                      onPress={()=>{setVisible(false),setmodalthongbao(false)
                                        hanldRefresh()
                                      }}>
                        <Icon 
                          name='window-close'
                          size={30}
                          color={'white'}
                        />
                    </TouchableOpacity>
                  </View>
                )}
            </View>

            {/* Body */}
            <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center'}}>
            
            {loaithongbao=='VoiceData'?
              <TouchableOpacity onPress={()=>{setVisible(false),setmodalthongbao(false),handleSearchVoice()}}>
                    <Image 
                      source={icons.microphone}
                      resizeMode='contain'
                      style={{
                        height:50,width:50,tintColor:'white',
                        borderRadius:20,
                        borderWidth:1,
                        //borderColor:'#4169E1',
                        backgroundColor:'#1E90FF',
                      }}
                    />
              </TouchableOpacity>
            :null}
  
            {/*Danh sách dự án*/}
            {loaithongbao == 'VoiceData' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>{timkiem!=''? timkiem : '...'}</Text>):null}
            {loaithongbao == 'Nodata' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Chưa có dữ liệu báo cáo</Text>):null}
            {loaithongbao == 'BackPage' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Người dùng muốn trở lại trang trước ?</Text>):null}
            {loaithongbao == 'NoPermissionsGranted' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Tài khoản chưa được cấp quyền</Text>):null}
            {loaithongbao == 'DevelopingFunction' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Chức năng đang phát triển</Text>):null}
            {loaithongbao == 'NoDocument' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Không tìm thấy dữ liệu</Text>):null}
            {loaithongbao == 'InputData' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Dữ liệu có dấu {"(*)"} là bắt buộc</Text>):null}
            {loaithongbao == 'CloseAction' ?(<Text style={{...style3.text2,width:windowWidth*0.85,textAlign:'center'}}>Vui lòng cập nhật dữ liệu trước{'\n'}khi thực hiện chức năng khác</Text>):null}

            </View>


              {/* Button */}
              {loaithongbao=='BackPage'?
              (<View style={{...containerInput.viewButton,justifyContent:'center',marginTop:15,marginBottom:15}}>
                  <TouchableOpacity
                  style={{...containerInput.buttonCancle}}
                  onPress={() => {
                    setmodalsuaduan(true),
                    setmodalthongbao(false)
                    
                  }}>
                      <Text style={{...containerInput.buttonText}}>Đóng</Text>
                </TouchableOpacity>
              </View> 
              ):(
                <View style={{...containerInput.viewButton,justifyContent:'center',marginTop:15,marginBottom:15}}>
                    <TouchableOpacity
                      style={{...containerInput.buttonCancle}}
                      onPress={() => {setVisible(false),setmodalthongbao(false)
                          if(loaithongbao=="VoiceData"){
                            handleSearchVoice()
                          }
                      }}
                    >
                      <Text style={{...containerInput.buttonText}}>Đóng</Text>
                    </TouchableOpacity>
                </View> 
              )}

          </View>
        </View>
        </Modal>
      )
    }

  return (
      
          <ViewThongbao /> 
      
  )
}

const style3 = StyleSheet.create({
  inputStyle: {
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    fontSize: 15,
   // marginTop:5,    
    width: windowWidth *0.4
  },
  text0:{
    fontSize: 15,
    //marginLeft: 60,
    fontWeight:'bold'
  },
  text1:{
    //marginLeft: 25,
    fontSize: 18,
    width: windowWidth * 0.5
  },
  text2:{
    //marginLeft: 15,
    fontSize: 18,
    width: windowWidth * 0.5,
    color:'black'
  },

  centeredView: {
    //justifyContent: "center",
    //alignItems: "center",
    marginTop: 255,
    //height:'50%',
    width: '100%', 
    
  },
  modalView1: {

    borderRadius: 14,    
    padding:9,
    //padding: 20,
    //alignItems: "center",
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 5,
    shadowRadius: 2,
    elevation: 6,
    marginTop:270,
    backgroundColor:'white',
    width:'97%',
    marginLeft:6
    //image: require('../../../../assets/lock.png')
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
    
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    
  },
  textStyle: {
    //color: "white",
    fontWeight: "bold",
    //textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
   
  },
  ReturnButton: {
    backgroundColor: 'white',
    borderColor: COLORS.buttonborder,
    borderWidth: 2,
    marginLeft:65,
    width: 80,
    marginLeft:20
  },
  confirmButton: {
    backgroundColor: 'white',
    marginRight:100,
    borderColor:COLORS.buttonborder,
    borderWidth: 2,
    width:120,
    marginRight:20
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: COLORS.buttonborder,
    borderWidth: 2,
    marginLeft:65,
    width: 80,
    marginLeft:20,
  },
  SaveButton: {
    backgroundColor: 'white',
    marginRight:100,
    borderColor:COLORS.buttonborder,
    borderWidth: 2,
    width:80,
    marginRight:20
  },
  buttonText: {
    color: 'gray',
    fontSize: 16,
    textAlign:'center'
    //paddingLeft:10
    
  },
  dialogTitle: {
    fontSize: 20,
    //marginBottom: 5,
    fontWeight:'bold',
    textAlign: 'center',
    color:COLORS.dialogTitle,
  },

});