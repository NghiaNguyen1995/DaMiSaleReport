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
                <View style={{backgroundColor: COLORS.skin2.bgheader,borderTopLeftRadius:12,borderTopRightRadius:12,paddingTop:10,paddingBottom:10,marginLeft:-9,marginRight:-9,marginTop:-9}}>
                      <Text style={{...object.labelTitle,textAlign:'center',fontWeight:'bold'}}>Thông báo</Text>
                </View>

                {/* Nội dung thông báo */}
                <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',alignItems:'center'}}>
                  
                  {/*Login*/}
                  {loaithongbao == 'NoUsernamePasswordInput' ?(<Text style={style.text}>Vui lòng nhập thông tin</Text>):null}
                  {loaithongbao == 'NoUsernameInput' ?(<Text style={style.text}>Vui lòng nhập tài khoản</Text>):null}
                  {loaithongbao == 'NoPassInput' ?(<Text style={style.text}>Vui lòng nhập mật khẩu</Text>):null}
                  {loaithongbao == 'NoFindListData' ?(<Text style={style.text}>Đăng nhập không thành công</Text>):null}
                  {loaithongbao == 'NoUserInListData' ?(<Text style={style.text}>Tài khoản không tồn tại</Text>):null}
                  {loaithongbao == 'ErrorPassword' ?(<Text style={style.text}>Mật khẩu không đúng</Text>):null}
                  {loaithongbao == 'NoRegistAccount' ?(<Text style={style.text}>Tài khoản chưa đăng ký</Text>):null}
                  
                  {loaithongbao == 'UpdatePasswordSuccess' ?(<Text style={style.text}>Cập nhật mật khẩu thành công</Text>):null}
                  {loaithongbao == 'UpdatePasswordFail' ?(<Text style={style.text}>Cập nhật mật khẩu thất bại{'\n'}Vui lòng thử lại!</Text>):null}
                  
                  {loaithongbao == 'DevDevelope' ?(<Text style={style.text}>Chức năng đang phát triển</Text>):null}
                  {loaithongbao == 'Nouser' ?(<Text style={style.text}>Người dùng chưa chọn tài khoản</Text>):null}
                  
                  {loaithongbao == 'WarningDate' ?(<Text style={style.text}>Vui lòng chọn 'Từ ngày' nhỏ hơn 'Đến ngày'</Text>):null}
                  {loaithongbao == 'WarningNoDataToExport' ?(<Text style={style.text}>Không có dữ liệu để xuất Excel</Text>):null}
                  {loaithongbao == 'WarningNoData' ?(<Text style={style.text}>Không có dữ liệu để xem</Text>):null}
                  {loaithongbao == 'ErrorWriteExcel' ?(<Text style={style.text}>Không thể ghi dữ liệu vô Excel</Text>):null}
                  {loaithongbao == 'ErrorOpenExcel' ?(<Text style={style.text}>
                  {'File đã được lưu nhưng thiết bị không có ứng dụng để mở file .xlsx.\n'+'Vui lòng cài đặt ứng dụng như Excel, WPS Office hoặc Google Sheets.'}</Text>):null}
                  {loaithongbao == 'ErrorExportExcel' ?(<Text style={style.text}>Lỗi xuất Excel</Text>):null}
                  {loaithongbao == 'NoDetail' ?(<Text style={style.text}>Không có dữ liệu để xem thêm</Text>):null}
                  

                  {/*Đăng ký*/}
                  {loaithongbao == 'COPYTOCLIPBOARD' ?(<Text style={style.text}>Đã sao chép mã đăng ký{'\n'}Người dùng gửi nội dung này cho{'\n'}người quản trị</Text>):null}
            
                  {/* Trang chủ */}
                  {loaithongbao == 'Location' ?(<Text style={style.text}>Vui lòng bật định vị để chấm công</Text>):null}

                  {/* Nghỉ phép */}
                  {loaithongbao == 'ResignationSuccess' ?(<Text style={style.text}>Gửi đơn xin phép thành công</Text>):null}
                  
                  {/* Chấm công */}
                  {loaithongbao == 'Timekeeping' ?(<Text style={style.text}>Đã chấm công ngày {`${data.day}`} vào lúc {`${data.thoigian}`}</Text>):null}
                  {loaithongbao == 'TimekeepingInSuccess' ?(<Text style={style.text}>Chúc bạn ngày làm việc vui vẻ</Text>):null}
                  {loaithongbao == 'TimekeepingOutSuccess' ?(<Text style={style.text}>Cảm ơn và hẹn gặp lại</Text>):null}
                  {loaithongbao == 'TimekeepingNoSuccess' ?(<Text style={style.text}>Vị trí không hợp lệ</Text>):null}
                  {loaithongbao == 'MaintenanceSystem' ?(<Text style={style.text}>Hệ thống đang bảo trì</Text>):null}
                  {loaithongbao == 'NoLocation' ?(<Text style={style.text}>Chưa xác định vị trí</Text>):null}
                  
                  {/* Phiếu lương */}
                  {loaithongbao == 'NoDataSalary' ?(<Text style={style.text}>Chưa có dữ liệu phiếu lương</Text>):null}

                  {/* Tài sản */}
                  {loaithongbao == 'NoDocument' ?(<Text style={{...style.text,width:windowWidth*0.85,textAlign:'center',color:'gray'}}>Không tìm thấy dữ liệu</Text>):null}
                  
                  {/* Công việc Download */}
                  {loaithongbao == 'NotFileExactly' ?(<Text style={{...style.text,width:windowWidth*0.85,textAlign:'center',color:'gray'}}>File không hợp lệ</Text>):null}
                  {loaithongbao == 'NotFindFile' ?(<Text style={{...style.text,width:windowWidth*0.85,textAlign:'center',color:'gray'}}>Không tìm thấy file trong GG Drive</Text>):null}
                  {loaithongbao == 'NodataInputCongViec' ?(<Text style={{...style.text,width:windowWidth*0.85,textAlign:'center',color:'gray'}}>Dữ liệu có dấu {"(*)"} là bắt buộc</Text>):null}
                  

                  {/*tab User*/}
                  
                  {loaithongbao == 'NoGranted' ?(<Text style={style.text}>Tài khoản chưa được cấp quyền xem App trên Server</Text>):null}
                  {loaithongbao == 'NoGrantedFunction' ?(<Text style={style.text}>Tài khoản chưa được cấp quyền</Text>):null}
                  {loaithongbao == 'AdminNoGrantedFunction' ?(<Text style={style.text}>Admin không được chấm công</Text>):null}
                  {loaithongbao == 'NodataInput' ?(<Text style={style.text}>Dữ liệu có dấu {"(*)"} là bắt buộc</Text>):null}
                  {loaithongbao == 'UserAdd' ?(<Text style={style.text}>Đăng ký tài khoản thành công</Text>):null}
                  
                  {loaithongbao == 'MonthType' ?(<Text style={style.text}>Nhập tháng từ 1 đến 12</Text>):null}
                  {loaithongbao == 'YearInput' ?(<Text style={style.text}>Vui lòng nhập năm</Text>):null}
                  {loaithongbao == 'MonthInput' ?(<Text style={style.text}>Vui lòng chọn tháng</Text>):null}
                  {loaithongbao == 'DataInput' ?(<Text style={style.text}>Vui lòng nhập dữ liệu{'\n'}để tra cứu thông tin</Text>):null}
                  {loaithongbao == 'Datademo' ?(<Text style={style.text}>Đã có dữ liệu demo !</Text>):null}
                  {loaithongbao == 'Successfully' ?(<Text style={style.text}>Đã lấy dữ liệu demo thành công !</Text>):null}
                  
                  {/*Dự án*/}
                  {loaithongbao == 'Nodata' ?(<Text style={style.text}>Chưa có dữ liệu báo cáo</Text>):null}
                  {loaithongbao == 'NoPermissionsGranted' ?(<Text style={style.text}>Tài khoản chưa được cấp quyền</Text>):null}
                
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

const style = StyleSheet.create({
  text:{
    //marginLeft: 15,
    fontSize: 16,
    width:windowWidth*0.85,
    color:'black',
    textAlign:'center'
  }
});