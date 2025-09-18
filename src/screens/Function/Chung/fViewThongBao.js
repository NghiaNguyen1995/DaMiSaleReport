import React,{useState,useEffect} from 'react'
import {View,Text,TouchableOpacity,Modal,Dimensions, StyleSheet,Image, Linking, TouchableWithoutFeedback} from 'react-native'
import { COLORS, icons } from '../../../../constants';
import { object } from '../../../../constants/theme';
//import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ModalStyle, containerInput } from '../../../../constants/stylechung';

const windowWidth = Dimensions.get('window').width;

export const FunctionViewThongBao = (loaithongbao, modalthongbao, setmodalthongbao, data) => {
  const messageMap = {
    // Login
    NoUsernamePasswordInput: "Vui lòng nhập thông tin",
    NoUsernameInput: "Vui lòng nhập tài khoản",
    NoPassInput: "Vui lòng nhập mật khẩu",
    NoFindListData: "Đăng nhập không thành công",
    NoUserInListData: "Tài khoản không tồn tại",
    ErrorPassword: "Mật khẩu không đúng",
    NoRegistAccount: "Tài khoản chưa đăng ký",

    UpdatePasswordSuccess: "Cập nhật mật khẩu thành công",
    UpdatePasswordFail: "Cập nhật mật khẩu thất bại\nVui lòng thử lại!",

    DevDevelope: "Chức năng đang phát triển",
    Nouser: "Người dùng chưa chọn tài khoản",

    WarningDate: "Vui lòng chọn 'Từ ngày' nhỏ hơn 'Đến ngày'",
    WarningNoDataToExport: "Không có dữ liệu để xuất Excel",
    WarningNoData: "Không có dữ liệu để xem",
    ErrorWriteExcel: "Không thể ghi dữ liệu vô Excel",
    ErrorOpenExcel:
      "File đã được lưu nhưng thiết bị không có ứng dụng để mở file .xlsx.\nVui lòng cài đặt ứng dụng như Excel, WPS Office hoặc Google Sheets.",
    ErrorExportExcel: "Lỗi xuất Excel",
    NoDetail: "Không có dữ liệu để xem thêm",

    COPYTOCLIPBOARD: "Đã sao chép mã đăng ký\nNgười dùng gửi nội dung này cho\nngười quản trị",

    Location: "Vui lòng bật định vị để chấm công",
    ResignationSuccess: "Gửi đơn xin phép thành công",

    MaintenanceSystem: "Hệ thống đang bảo trì",
    NoLocation: "Chưa xác định vị trí",

    NoDataSalary: "Chưa có dữ liệu phiếu lương",
    NoDocument: "Không tìm thấy dữ liệu",
    NotFileExactly: "File không hợp lệ",
    NotFindFile: "Không tìm thấy file trong GG Drive",
    NodataInputCongViec: "Dữ liệu có dấu (*) là bắt buộc",

    NoGranted: "Tài khoản chưa được cấp quyền xem App trên Server",
    NoGrantedFunction: "Tài khoản chưa được cấp quyền",
    AdminNoGrantedFunction: "Admin không được chấm công",
    NodataInput: "Dữ liệu có dấu (*) là bắt buộc",
    UserAdd: "Đăng ký tài khoản thành công",

    MonthType: "Nhập tháng từ 1 đến 12",
    YearInput: "Vui lòng nhập năm",
    MonthInput: "Vui lòng chọn tháng",
    DataInput: "Vui lòng nhập dữ liệu\nđể tra cứu thông tin",
    Datademo: "Đã có dữ liệu demo !",
    Successfully: "Đã lấy dữ liệu demo thành công !",

    Nodata: "Chưa có dữ liệu báo cáo",
    NoPermissionsGranted: "Tài khoản chưa được cấp quyền",
  };

  // Riêng "Timekeeping" thì phải custom nội dung
  const renderMessage = () => {
    if (loaithongbao === "Timekeeping")
      return `Đã chấm công ngày ${data.day} vào lúc ${data.thoigian}`;
    if (loaithongbao === "TimekeepingInSuccess")
      return "Chúc bạn ngày làm việc vui vẻ";
    if (loaithongbao === "TimekeepingOutSuccess")
      return "Cảm ơn và hẹn gặp lại";
    if (loaithongbao === "TimekeepingNoSuccess")
      return "Vị trí không hợp lệ";

    // Nếu có message trong map thì trả về
    return messageMap[loaithongbao] || null;
  };

  return (
    <Modal visible={modalthongbao} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={() => setmodalthongbao(false)}>
        <View style={ModalStyle.centeredView}>
          <View style={ModalStyle.Modal}>
            {/* Title */}
            <View
              style={{
                backgroundColor: COLORS.skin2.bgheader,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                paddingVertical: 10,
                marginHorizontal: -9,
                marginTop: -9,
              }}
            >
              <Text style={{ ...object.labelTitle, textAlign: "center", fontWeight: "bold" }}>
                Thông báo
              </Text>
            </View>

            {/* Nội dung */}
            <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "center", alignItems: "center" }}>
              <Text style={style.text}>{renderMessage()}</Text>
            </View>

            {/* Button */}
            <View style={{ ...containerInput.viewButton, justifyContent: "center", marginVertical: 15 }}>
              <TouchableOpacity
                style={{ ...containerInput.buttonCancle }}
                onPress={() => {
                  setmodalthongbao(false);
                  if (
                    ["NoDataSalary", "TimekeepingInSuccess", "TimekeepingOutSuccess", "ResignationSuccess"].includes(
                      loaithongbao
                    )
                  ) {
                    data.navigation();
                  }
                }}
              >
                <Text style={{ ...containerInput.buttonText }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const style = StyleSheet.create({
  text:{
    //marginLeft: 15,
    fontSize: 16,
    width:windowWidth*0.85,
    color:'black',
    textAlign:'center'
  }
});