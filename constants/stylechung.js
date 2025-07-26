import React from "react";
import { Dimensions, StyleSheet,View,Text,TextInput, Linking } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "./theme";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetDevice } from "../src/screens/Function/Chung/functionInfoDevice";

const windowWidth = Dimensions.get('window').width;

export const HeaderStyle = {
    headerTrangChu: { 
        flexDirection: 'row', 
            borderBottomColor:'gray',
            backgroundColor:'#0DA805', 
            marginLeft:-19,
            marginRight:-19,
            height:'10%',
            padding:5
    },
    hearderTrangDanhSachDuAn: {
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor: '#0DA805',
        height:'7%',
        padding:10
    },
    hearderTrangTaoDuAn: {
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor: '#0DA805',
        height:50,
        padding:10
    },
    hearderTrangBaoCaoDuAn: {
        justifyContent:'space-between',
        flexDirection:'row',
        //backgroundColor: '#0DA805',
        backgroundColor:COLORS.skin2.bgheader,
        height:50,
        padding:10
    },
    headerTrangCongViec: {
        flexDirection:'row',
        //paddingTop:5,
        backgroundColor: '#0DA805',
        height:'7%',
        padding:10
    },
    headerBaoCaoCongViec: {
        flexDirection:'row',
        //paddingTop:5,
        backgroundColor: '#0DA805',
        //height:'7%',
        height:50,
        paddingTop:10,
        paddingBottom:10
       // padding:10
    },
    headerTapTin: {
        flexDirection:'row',
        //paddingTop:5,
        backgroundColor: '#0DA805',
        //height:'7%',
        height:40,//đang xài với size icon: 20
        //height:45,//đang xài với size icon: 30
        padding:5
        //paddingTop:10,
        //paddingBottom:10
       // padding:10
    }
}

export const buttonStyle={

    button:{
        //padding: 8,
        height:48,
        borderRadius: 5,  
        backgroundColor: 'white',
        borderColor: COLORS.buttonborder,
        borderWidth: 2,
        width: 100,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,

    },
    buttonText:{
        color: 'white',
        fontSize: 15,
        textAlign:'center',
    },

    buttonInLine:{
        //padding: 8,
        height:48,
        justifyContent:'center',
        borderRadius: 5,  
        backgroundColor: 'white',
        width: 100,
        alignItem:'center'
    },
    buttonTextInline:{
        color: 'black',
        fontSize: 15,
        textAlign:'center',
        borderColor: COLORS.buttonborder,
        borderWidth: 2,
        borderRadius: 5,  
        padding:5
       
    },

    //View cho Button
    viewButton:{
        flexDirection:'row',
        marginTop:30,
        justifyContent:'space-between',
        
    },

    buttonOK:{  
        //padding:8,
        height:48,
        borderRadius: 5,  
        backgroundColor: COLORS.app.buttonLogin,
        borderColor: COLORS.app.buttonLogin,
        borderWidth: 2,
        width: 100,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        //shadowRadius: 6,
        elevation: 5,
        justifyContent:'center',
        alignItem:'center'
    },
    buttonCancle:{  
        //padding:8,
        height:48,
        borderRadius: 5,  
        backgroundColor: COLORS.app.title,
        borderColor: COLORS.app.title,
        borderWidth: 2,
        width: 100,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        //shadowRadius: 6,
        elevation: 5,
        justifyContent:'center',
        alignItem:'center'
    },
    buttonText:{
        color: 'white',
        fontSize: 15,
        textAlign:'center'
    },
    buttonDangNhap:{
        
        height:48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.app.buttonLogin,
        borderRadius: 5,
        marginTop: 40,
        width: windowWidth * 0.75
    },
    buttonTextDangNhap:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    butttonSaoChep:{
        height:48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.app.buttonLogin,
        borderRadius: 5,
        marginTop: 35,
        width: windowWidth * 0.4
    },
    buttonTextSaoChep:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
  
}

export const flatlistViewTitle ={
    //let mau = {
        flexDirection:'row',
        backgroundColor: COLORS.skin3.bgflatlist,
        padding:5,
        justifyContent:'center', 
    //}
    //return mau
}

export const flatlistViewSupTitle= {
    //#ff7426
    //let mau = {
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor: COLORS.skin3.bgflatlist,
        borderTopWidth:1,
        borderTopColor:'white',
        padding:5
    //}
    //return mau
}

export const card ={
    cardView:{
        width: windowWidth*0.95,
        height: 120,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5, 
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        //shadowRadius: 6,
        elevation: 5,
        margin: 5,
        marginLeft:10,    
    },
    headerCard:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:windowWidth*0.95,
        borderRadius:5,
        borderBottomWidth:0.5,
        height:'25%',
        alignItems:'center'
    },
    bodyCard:{
       justifyContent:'space-between',
       height:'75%',
       flexDirection:'row',
       padding:10
    }
}

export const ModalStyle = {

    centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Để modal nền mờ
    },

    Modal:{   
        borderRadius: 14,    
        padding:9, 
        shadowColor: COLORS.skin2.bgfooter,
        shadowOffset: {
          width: 2,
          height: 2
        },
        shadowOpacity: 5,
        shadowRadius: 2,
        elevation: 6,
        backgroundColor:'white',
        width:'97%',
        marginLeft:6
    },  
}

export const Card1Row = {
    View: {      
        flexDirection:'row',
        width: windowWidth*0.95,  
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },//5
        shadowOpacity: 0, //1
        shadowRadius: 6,
        elevation: 5,
        justifyContent:'space-between',
        marginLeft:10,
        marginTop:10,
        alignItems:'center',
        height:'5%'
    },
       
    Text: {
        fontSize: 13,
        padding: 5,
        fontWeight:'bold',
        color:'gray'
    },
}

// Lấy thông tin máy để set style cho header 
const Info =()=>{
    let device = GetDevice()
    // Kiểm tra nếu model là từ iPhone X trở lên
    /*if (device.includes('X') || device.includes('11') || device.includes('12') || device.includes('13')|| device.includes('14')|| device.includes('15')) {
        return ({         
            backgroundColor: COLORS.skin2.bgheader,      
            paddingTop:45
        })
    }else {
        return ({
            height:'6%',
            backgroundColor: COLORS.skin2.bgheader,
            justifyContent:'center'
        })
    }*/
    return ({
            height:'6%',
            backgroundColor: COLORS.skin2.bgheader,
            justifyContent:'center'
    })
}

export const containerHeader={
    ctnHeader:Info(),
    headerCaption:{
            fontSize:17,
            color:"white",
            textAlign:'center',
    }
}

export const containerInput={
    //ViewTong
    ctnInput: {
        height:'auto',//height:'30%',
        padding:5
    },
    viewItem:{
        flexDirection:'row',
        borderRadius:5,
        borderWidth:0.5,
        padding:5,
        marginTop:10
    },  
    textLabel:{
        color:'gray', 
        marginLeft: 10,
        fontSize: 15,   
    },
    textInput:{
        fontSize:15,
        width:"100%"
    },
    iconStar:{
        position: 'absolute',
        top: -10,
        right: -5,
        color:'red',
        zIndex:1
    },
    viewButton:{
        flexDirection:'row',
        marginTop:15,
        justifyContent:'space-between',
        
    },
    buttonOK:{  
        height:48,
        borderRadius: 5,  
        backgroundColor: COLORS.app.buttonLogin,//'white', //COLORS.app.buttonLogin,
        borderColor: COLORS.app.buttonLogin,//'black',//COLORS.app.buttonLogin,
        borderWidth: 2,
        width: '30%',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        elevation: 5,
        justifyContent:'center',
        alignItem:'center'
    },
    buttonCancle:{  
        //padding:8,
        height:48,
        borderRadius: 5,  
        backgroundColor: COLORS.app.title,//'white',//COLORS.app.title,
        borderColor: COLORS.app.title,//'black',//COLORS.app.title,
        borderWidth: 2,
        width: 100,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        //shadowRadius: 6,
        elevation: 5,
        justifyContent:'center',
        alignItem:'center'
    },
    buttonText:{
        color: 'white',//'black',//'white',
        fontSize: 15,
        textAlign:'center'
    } 
}

export const containerView=(chucnang,data)=>{
    
    let Heigt=()=>{
        if(chucnang=='nghiphep'){
            //2 Bảng trong duyetnghiphep
            if(data.length>18){
                return '74%'
            }else{
                return null
            }
        }else if(chucnang=='user'){
            if(data.length>9){
                return '59%'
            }else{
                return null
            }
        }else if(chucnang=='thongbao'){
            //2 Bảng trong duyetnghiphep
            if(data.length>18){
                return '73%'
            }else{
                return null
            }
        }else if(chucnang=='report'){
            return 'auto'
        }
        else{
            return '59%'
        }
    }
    
    let viewdesign = {
        //height: Heigt(),
        height:'auto',
        width: 'auto',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.skin3.bgflatlist,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        elevation: 5,
        margin:5
    }

    return viewdesign
}

export const containerFooter={

    ctnFooter:{
        height:'6%',
        backgroundColor: COLORS.skin2.bgfooter,
        justifyContent:'space-between',
        flexDirection:'row',
        bottom:0,
        position: 'absolute',
        width:'100%'
    },

    footerCaption:{
        fontSize:14,
        color:"white",
        textAlign:'center',
        padding:10,
        textAlignVertical:'center'
    }
}

// truyền tinhtrangid vào để lấy ra Text của loại tình trạng đó
export const trangthaiStyle =(tinhtrang)=>{
    if(tinhtrang=="ChoDuyet"){
        return <Text style={{color:COLORS.tinhtrang.choduyet,width:'35%',textAlign:'right',paddingRight:5}}>Chờ Duyệt</Text>
    }else if(tinhtrang=="DaDuyet"){
        return <Text style={{color:COLORS.tinhtrang.daduyet,width:'35%',textAlign:'right',paddingRight:5}}>Đã Duyệt</Text>
    }else{
        return <Text style={{color:COLORS.tinhtrang.tuchoi,width:'35%',textAlign:'right',paddingRight:5}}>Từ chối</Text>
    }
}

export const footerthongke =(data)=>{
    let data1,data2,data3
    //console.log('data là: ',data)
      
    const xetDatathongke = ()=>{
        if(data.loaithongke=="thongkengaynghiphep"){
           data1=data.songayduyet
           data2=data.songaytuchoi
           data3=data.sophieuchoduyet
        }else if(data.loaithongke=="thongkengay"){
            data1=data.day
        }else if(data.loaithongke=="thongkebaocao"){
            data1=data.date
        }else if(data.loaithongke=="thongkengaychamcong"){
            data1=data.songay
        }else if(data.loaithongke=="thongkegiochamcong"){
            data1=data.day
            data2=data.thoigian
        }else if(data.loaithongke=="thongkethongbao"||data.loaithongke=="thongkephieuluong"||data.loaithongke=="thongketaisan"||data.loaithongke=="thongkeduan"||data.loaithongke=="thongkephieuchoduyet"||data.loaithongke=="thongkesoluongdonvi"){
            data1=data.so
        }
    }

    xetDatathongke()
    
    //Xét view nếu đang ở tab duyệt đề xuất mà ở tab nào? cuatoi hay toiduyet thì sẽ trả về text cho từng loại
    const ViewNghiPhep =()=>{
        if(data.trang=="cuatoi"){
            return (
                <View style={{...containerFooter.ctnFooter}}>
                    <Text style={{...containerFooter.footerCaption,paddingLeft:25}}>Đã duyệt: {data1} ngày</Text>
                    <Text style={{...containerFooter.footerCaption,paddingRight:25}}>Từ chối: {data2} ngày</Text>
                </View>
            )
        }else if(data.trang=="toiduyet"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Số phiếu chờ duyệt: {data3}</Text>
                </View>
            )
        }
    }

    const xetloaiViewnghiphep=()=>{
        if(data.loaithongke=="thongkengaynghiphep"){
            return ViewNghiPhep()
        }else if(data.loaithongke=="thongkegiochamcong"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Đã chấm công ngày: {data1} {data2}</Text>
                </View>  
            )
        }else if(data.loaithongke=="thongkengay"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Ngày: {data1}</Text>
                </View>
            )
        }else if(data.loaithongke=="thongkebaocao"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Dữ liệu thống kê đến ngày: {data1}</Text>
                </View>
            )
        }else if(data.loaithongke=="thongkengaychamcong"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Số ngày chấm: {data1}</Text>
                </View>
            )
        }else if(data.loaithongke=="thongkethongbao"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Có {data1} thông báo</Text>
                </View>
            )
        }else if(data.loaithongke=="thongkephieuluong"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Có {data1} phiếu</Text>
                </View>
            )
        }else if(data.loaithongke=="thongketaisan"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>{/*Có {data1} tài sản*/}</Text>
                </View>
            )
        }else if(data.loaithongke=="thongkeduan"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Có {data1} dự án</Text>
                </View>
            )
        }else if(data.loaithongke=="thongkephieuchoduyet"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Số phiếu chờ duyệt: {data1}</Text>
                </View>
            )
        }
        else if(data.loaithongke=="thongkesoluongdonvi"){
            return(
                <View style={{...containerFooter.ctnFooter,justifyContent:'center'}}>
                    <Text style={{...containerFooter.footerCaption}}>Ứng dụng QLDA PMS © dong-tay.com{/*Có data1 đơn vị thành viên*/}</Text>
                </View>
            )
        }
    }

    return (
        xetloaiViewnghiphep()
    )
    
}

//#region  DaMi sử dụng
export const ModalNewStyle={
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        padding: 5,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        maxHeight: 'auto',
    },
    
    modalOverlay1: {
        flex:1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    innerOverlay: {
        width: '90%',
        alignItems: 'center',
    },
    modalContainer1: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 10,
    },
}

export const GridStyle = (key) => ({
    //Dòng Header
    headerRow: {
        flexDirection: 'row',
        justifyContent:'center',
        backgroundColor: '#f0f0f0',
    },
    headerCell: {
        width: fSetWidthRowFlatListItem(key),
        fontWeight: 'bold',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign:'center',
        textAlignVertical:'center'
    },
    //Dòng Filter
    filterRow: {
        flexDirection: 'row',
    },
    filterInput: {
        width: fSetWidthRowFlatListItem(key),
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 3,
    },
    //Dòng Data Item
    dataRow: {
        flexDirection: 'row',
    },
    dataCell: {
        width: fSetWidthRowFlatListItem(key),
        padding: 5,
        borderWidth: 1,
        borderColor: '#eee',
        textAlign: fSetTextAlignForText(key),
        textAlignVertical:'center'
    }
});

export function fSetTextAlignForText(key){
    if((key.includes('Name')&&!key.includes('UnitName'))||key.includes('VoucherNo')||key.includes('NoteDetails')){
        return 'left';
    }else if(key.includes('ID')||key.includes('RowNumber')||key.includes('VoucherDate')||key.includes('UnitName')){
        return 'center';
    }
    else{
        return 'right';
    }
}
//115 + 50 + 115 = 280
export function fSetWidthRowFlatListItem(key){
    if((key.includes('Name')&&!key.includes('UnitName'))||key.includes('NoteDetails')){
        return 100//return 115;
    }else if(key.includes('ID')||key.includes('RowNumber')||key.includes('UnitName')){
        return 60//return 50;
    }else if(key.includes('Date')||key.includes('VoucherNo')){
        return 98
    }
    else{
        return 120//return 115;
    }
}
//#endregion


/*
ItemID: "Mã hàng", ItemName: "Tên hàng", UnitName: "ĐVT", WareHouseID: "Kho", BegInvQuantity: "Tồn đầu (kg)", BegInvQuantity2: "Tồn đầu (cây)", InQuantity: "Nhập (kg)",
InQuantity2: "Nhập (cây)", OutQuantity: "Xuất (kg)", OutQuantity2: "Xuất (cây)", EndInvQuantity: "Tồn cuối (kg)", EndInvQuantity2: "Tồn cuối (cây)", AccountID: "Mã TK",
CustomerName: "Tên\nkhách hàng", TradeName: "Tên\nkhách hàng", TaxCode: "Mã số thuế", CnvBegDebit: "Phải thu\nđầu kỳ", CnvBegCredit: "Phải trả\nđầu kỳ", 
CnvDebit: "Phải thu\ntrong kỳ", CnvCredit: "Phải trả\ntrong kỳ", CnvEndDebit: "Phải thu\ncuối kỳ",  CnvEndCredit: "Phải trả\ncuối kỳ", RowNumber: "STT", VoucherDate: "Ngày",
VoucherNo: "Số phiếu", Description: "Diễn giải", InvoiceNo: "Số\nhóa đơn", InvoiceDate: "Ngày\nhóa đơn", SerialNo: "Số serial", PaymentMethodName: "Phương thức\nthanh toán",
CustomerID: "Mã\nkhách hàng", Address1: "Địa chỉ", ItemColor: "Màu sắc", Specification: "Quy cách", Quantity: "Số lượng", Quantity2: "Số lượng phụ", QtyCay: "Số cây",
QtyMet: "Số mét", ConvertPrice: "Đơn giá", ConvertPrice2: "Đơn giá quy đổi phụ", CnvPriceCay: "Đơn giá theo cây", CnvPriceMet: "Đơn giá theo mét", ConvertAmount: "Thành tiền",
NoteDetails: "Ghi chú", PrepairedByName: "Người bán", Transactor: "Người giao dịch", TranAddress: "Địa chỉ giao dịch", AttachDocInfo: "Thông tin tài liệu đính kèm",
Notes: "Ghi chú", SalesManID: "Mã NV", SalesManName: "Tên NV", ItemGroupID: "Mã\nnhóm hàng",
*/