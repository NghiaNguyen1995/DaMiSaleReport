import React, { useState,useEffect} from 'react'
import { StyleSheet, Text, View,Dimensions,TouchableWithoutFeedback, KeyboardAvoidingView,Keyboard,TouchableOpacity,Modal, FlatList,ScrollView,TextInput, Image, Alert } from 'react-native'

// Import từ các thư viện
import moment from 'moment/moment';
import CalendarPicker from 'react-native-calendar-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from 'react-native-safe-area-context';
//import Orientation from 'react-native-orientation-locker';

// Import từ các file khác
import { containerHeader, containerInput, containerView, GridStyle, ModalLich} from '../../../constants/stylechung'
import { NameScreen } from '../../../constants/NameScreen';
import { FunctionViewThongBao } from '../Function/Chung/fViewThongBao';
import { SalesManagerAPI } from '../../api/SalesManager';
import { COLORS, icons } from '../../../constants';

import { ViewLoadingAnimation } from '../Function/fViewLoading';
import { clsFunc } from '../Function/Chung/fSupport';
import fXuatExcel from '../Function/Chung/fExcelExport';

//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

export default function Report({navigation,route}) {
    
    const [titleHeaderComponent,settitleHeaderComponent] = useState([])

    // Dữ liệu cho chọn ngày
    const [startDay,setstartDay] = useState()
    const [toDay,settoDay] = useState()
    const [loaibamngay,setloaibamngay] = useState('')
    const [calendarSelectedDate, setcalendarSelectedDate] = useState();
    const [openViewCalendar,setopenViewCalendar] = useState(false)
    
    // Set loại thông báo hiển thị
    const [modalthongbao,setmodalthongbao] = useState(false)
    const [loaithongbao,setloaithongbao] = useState('')

    // Dữ liệu cho comboBox Kỳ báo cáo 
    const [valueKho, setvalueKho] = useState(null);
    const [itemKho, setitemKho] = useState([]);

    // Dữ liệu cho comboBox Kho hoặc Tài khoản công nợ
    const [value, setvalue] = useState(null);
    const [item, setitem] = useState([]);

    // List Data từ Nút nạp dữ liệu 
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({});

    //Loại view xem: đầy đủ || rút gọn
    const [vViewFull,setvViewFull]=useState(false)

    //Modal load dữ liệu
    const[visibleLoadData,setvisibleLoadData]=useState(false)
    
    const [totalRow, setTotalRow] = useState({});

    //#region Chức năng xem thêm thông tin
    // Lấy các trường chính để View 
    const defaultKeysKhoDayDu = ["ItemName", "UnitName", "WareHouseID", "BegInvQuantity", "BegInvQuantity2","BegInvValue", "InQuantity", "InQuantity2", "InValue", "OutQuantity", 'OutQuantity2', "OutValue", "EndInvQuantity","EndInvQuantity2","EndInvValue"];
    const defaultKeysKhoRutGon = ["ItemName", "WareHouseID", "EndInvQuantity", "EndInvQuantity2"];

    const defaultKeysCongnoDayDu = ["AccountID", "TradeName", "CnvBegDebit", "CnvBegCredit","CnvDebit","CnvCredit","CnvEndDebit","CnvEndCredit"]; 
    const defaultKeysCongnoRutgon = ["AccountID", "TradeName", "CnvEndDebit", "CnvEndCredit"];

    
    const [visibleKeys, setVisibleKeys] = useState(route.params.id == "baocaotonkho" ? defaultKeysKhoRutGon : defaultKeysCongnoRutgon);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(visibleKeys); // mặc định bằng visibleKeys khi mở

    //let allKeys = data[0]?Object.keys(data[0]):selectedKeys;
    let allKeys = Object.keys(data[0] || {});

    "Function chia cột view loại từng loại đầy đủ hoặc rút gọn"
    function fLoaiXemView() {
        setvViewFull((prev) => {

            const newView = !prev;

            setvViewFull(newView); // đồng bộ với newView luôn

            if (route.params?.id === 'baocaotonkho') {
                if (!newView) {
                    setVisibleKeys(defaultKeysKhoRutGon);
                    //Orientation.lockToPortrait();
                } else {
                    setVisibleKeys(defaultKeysKhoDayDu);
                    //Orientation.lockToLandscape();
                }
            } else {
                if (!newView) {
                    setVisibleKeys(defaultKeysCongnoRutgon);
                    //Orientation.lockToLandscape();
                } else {
                    setVisibleKeys(defaultKeysCongnoDayDu);
                    //Orientation.lockToLandscape();
                }
            }

            return newView;
        });
        
        setData([])
        setFilteredData([])
    }

    // Mở modal thì set selectedKeys hiện tại
    function fOpenSelectModal() {
        setSelectedKeys(visibleKeys);
        setModalVisible(true);
    }

    //Hàm xử lý khi user xác nhận chọn thêm fields
    function fHandleConfirmSelectFields(newSelectedKeys) {
        setVisibleKeys(newSelectedKeys);

        // Tạo dataShow mới
        const newDataShow = data.map(item => {
            let obj = {};
            newSelectedKeys.forEach(key => {
            obj[key] = item[key];
            });
            return obj;
        });

        setFilteredData(newDataShow);

        setModalVisible(false);
    }

    const ModalSelectFields = ({modalVisible,setModalVisible,allKeys,selectedKeys,setSelectedKeys,onConfirm}) => {

        return (
            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                {/*<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>*/}
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'white', padding: 20, width: '80%', borderRadius: 10}}>
                        <Text style={{fontWeight: 'bold', marginBottom: 10}}>CHỌN CÁC THÔNG TIN MUỐN XEM</Text>

                        <ScrollView style={{maxHeight: 300}}>
                            {allKeys.map(key => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => {
                                if (selectedKeys.includes(key)) {
                                    setSelectedKeys(selectedKeys.filter(k => k !== key));
                                } else {
                                    setSelectedKeys([...selectedKeys, key]);
                                }
                                }}
                                style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 5,
                                }}>
                                <View 
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderWidth: 1,
                                    borderColor: '#333',
                                    backgroundColor: selectedKeys.includes(key) ? '#333' : 'white',
                                    marginRight: 10,
                                }}
                                />
                                <Text>{clsFunc.fRenameHeaderTable(key)}</Text>
                            </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{padding: 10}}>
                            <Text>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => {
                                onConfirm(selectedKeys);
                            }}
                            style={{padding: 10}}
                            >
                            <Text style={{color: 'blue'}}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                {/*</TouchableWithoutFeedback>*/}
            </Modal>
           
        );
    };

    //#endregion

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            fInitLoad()
        });

        return () => {unsubscribe};
    },[navigation])

    //#region Component của 1 Page 
    const ComponentHeader=()=>{   
        return( 
            <View style={{...containerHeader.ctnHeader,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>    
                    <TouchableOpacity 
                        onPress={()=>{navigation.navigate(NameScreen.TrangChu,titleHeaderComponent)}} 
                        style={{marginRight:10}}>
                                <Image
                                    source={icons.trove}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: 'white',
                                        marginLeft:10    
                                    }} 
                                />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={async()=>{
                                if(filteredData!=null&&filteredData!=""){
                                    let thongbaoExcel = await fXuatExcel(filteredData,titleHeaderComponent.id);
                                    if(thongbaoExcel=='ErrorWriteExcel'){
                                        setloaithongbao('ErrorWriteExcel');
                                        setmodalthongbao(true);
                                    }else if(thongbaoExcel=='ErrorOpenExcel'){
                                        setloaithongbao('ErrorOpenExcel');
                                        setmodalthongbao(true);
                                    }else if(thongbaoExcel=='ErrorExportExcel'){
                                        setloaithongbao('ErrorExportExcel');
                                        setmodalthongbao(true);
                                    }
                                }else{
                                    setloaithongbao('WarningNoDataToExport');
                                    setmodalthongbao(true);
                                }
                            }} style={{marginLeft:10}}>
                                <Image
                                    source={icons.excelexport}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor:'white',
                                    }} 
                                />
                    </TouchableOpacity>
                </View>

                <Text style={{...containerHeader.headerCaption}}>{titleHeaderComponent.description}</Text>
                
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{fLoaiXemView()}} style={{marginRight:10}}>
                            <Image
                                source={vViewFull==false?icons.documentclose:icons.documentopen}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: 'white',
                                              
                                }} 
                            />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={fOpenSelectModal} style={{marginRight:10}}>
                            <Image
                                source={icons.more}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: 'white',                     
                                }} 
                            />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    const ComponentInput=()=>{
        const [currentOpen, setCurrentOpen] = useState(null);

        return (
            <View style={{...containerInput.ctnInput,paddingTop:5}}>

                {/*Chọn từ ngày đến ngày*/}
                <View style={{...containerInput.viewItem}}>
                    <TouchableOpacity 
                        onPress={() => {
                            setloaibamngay('s');
                            setcalendarSelectedDate(startDay);
                            setopenViewCalendar(true);
                        }} 
                        style={{flexDirection:'row',width:'100%'}}>         
                            <Image 
                                source={icons.fromdate}
                                style={{tintColor:COLORS.lime,height:25,width:25}}
                            />  
                            <Text style={{paddingTop:3,paddingLeft:10}}>TỪ NGÀY: {moment(startDay).format('DD/MM/YYYY')}</Text>
                    </TouchableOpacity>
                    <Icon 
                        name="star"
                        size={15}
                        style={{position: 'absolute',top: -10,right: -5,color:'red',zIndex:1}}
                    />
                </View>
              
                {/*Chọn từ ngày đến ngày*/}
                <View style={{...containerInput.viewItem}}>
                    <TouchableOpacity 
                        onPress={() => {
                            setloaibamngay('t');
                            setcalendarSelectedDate(toDay);
                            setopenViewCalendar(true);
                        }} 
                        style={{flexDirection:'row',width:'100%'}}>         
                            <Image 
                                source={icons.todate}
                                style={{tintColor:COLORS.red,height:25,width:25}}
                            />  
                            <Text style={{paddingTop:3,paddingLeft:10}}>ĐẾN NGÀY: {moment(toDay).format('DD/MM/YYYY')}</Text>
                    </TouchableOpacity>
                    <Icon 
                        name="star"
                        size={15}
                        style={{position: 'absolute',top: -10,right: -5,color:'red',zIndex:1}}
                    />
                </View>
                
                {/* View Dropbox của kho*/}
                <View style={{flexDirection:'row',alignItems: 'center', gap:20}}>
                    
                    {route.params?.id=="baocaotonkho"?
                        <ViewDroppoxKho
                            valueKho={valueKho}
                            setvalueKho={setvalueKho}
                            itemKho={itemKho}
                            setitemKho={setitemKho}
                            currentOpen={currentOpen}
                            setCurrentOpen={setCurrentOpen}
                        />
                    :
                        <ViewDroppoxTaiKhoan
                            value={value}
                            setvalue={setvalue}
                            item={item}
                            setitem={setitem}
                            currentOpen={currentOpen}
                            setCurrentOpen={setCurrentOpen}
                        />
                    }
                    <TouchableOpacity 
                        onPress={()=>{fNapdulieu()}} 
                        style={{...containerInput.buttonOK,marginTop:10}}>
                            <Text style={{...containerInput.buttonText}}>Nạp dữ liệu</Text> 
                    </TouchableOpacity>

                </View>  

            </View>
        )
    }
    //#endregion

    //#region View Dropbox 
    "View Droppox kho"
    const ViewDroppoxKho = ({valueKho,setvalueKho,itemKho,setitemKho,currentOpen,setCurrentOpen})=>{
        
        const [open, setOpen] = useState(false);

        // Lắng nghe khi currentOpen thay đổi
        useEffect(() => {
            if (currentOpen !== 'warehouse' && open) {
                setOpen(false);
            }
        }, [currentOpen]);

        return (
            <View style={{width:'65%'}}>
                <DropDownPicker
                        open={open}
                        value={valueKho}
                        items={itemKho}
                        setOpen={(val) => {
                            setOpen(val);
                            setCurrentOpen(val ? 'warehouse' : null);
                        }}
                        setValue={(callback) => {
                            const newValue = callback(value);
                            setvalueKho(newValue);
                            return newValue;
                        }}
                        setItems={setitemKho}
                        searchable={true}
                        searchPlaceholder='Nhập kho'
                        placeholder="Chọn kho"
                        style={{ zIndex: 2000,marginTop:10,width:'100%'}}
                        dropDownContainerStyle={{ width: '100%' }}
                />
            </View>
        );
    };

    "View Droppox Tai khoan"
    const ViewDroppoxTaiKhoan = ({value,setvalue,item,setitem,currentOpen,setCurrentOpen}) => {
        const [open, setOpen] = useState(false);

        useEffect(() => {
            if (currentOpen !== 'account' && open) {
                setOpen(false);
            }
        }, [currentOpen]);

        return (
            <View style={{width:'65%'}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={item}
                    setOpen={(val) => {
                        setOpen(val);
                        setCurrentOpen(val ? 'account' : null);
                    }}
                    setValue={(callback) => {
                        const newValue = callback(value);
                        setvalue(newValue);
                        console.log('value được chọn: ',newValue)
                        return newValue;
                    }}
                    setItems={setitem}
                    searchable={true}
                    searchPlaceholder='Nhập tài khoản'
                    placeholder={"Chọn tài khoản"}
                    style={{ zIndex: 1000, marginTop: 10,width:'100%' }}
                    dropDownContainerStyle={{ width: '100%' }}
                />
            </View>
        );
    };
    //#endregion

    //#region Function Init
    "Function load thiết lập"
    function fInitLoad(){
        
        settitleHeaderComponent(route.params);

        fLoadDataToDropBox();
        clsFunc.fSetTimeFromTo(setstartDay,settoDay);
        
        if(data != ""){
            fInitFilter(data,setFilters)
        }
    }
    
    "Function Init Filter data = trống"
    function fInitFilter(data,setFilters){
        // Khởi tạo filters trống
        const initialFilters = {};
        Object.keys(data[0]).forEach(key => {
            initialFilters[key] = '';
        });
        setFilters(initialFilters);
    }
    //#endregion

    //#region Function Load API From BackEnd
    "Chức năng lấy API List và gắn vô Data"
    async function fLoadDataToDropBox(){
        if(route.params?.id=="baocaotonkho"){
            await SalesManagerAPI.GetWareHouseList().then((data)=>{
                if(data.status==200 && data.data?.ObjectData?.length > 0){
                    clsFunc.fLoadDataToCombobox(data.data.ObjectData,setitemKho)
                }
            })
        }else{
            await SalesManagerAPI.GetChartAccount().then((data)=>{
                if(data.status==200 && data.data?.ObjectData?.length > 0){
                    clsFunc.fLoadDataToCombobox(data.data.ObjectData,setitem)
                }
            })
        }
    }
 
    "Hàm lấy dữ liệu Báo cáo Tồn kho đầy đủ"
    async function fGetInventoryBalanceByDate(vTaikhoan,vKho,std,td) {
        await SalesManagerAPI.GetInventoryBalanceByDate(vTaikhoan,vKho,std,td,setvisibleLoadData).then((data)=>{
             if(data.status==200){
                console.log("Get Báo cáo Tồn kho đầy đủ",data.data.ObjectData);
                if(data.data.ObjectData.length > 0) {
                    setData(data.data.ObjectData);
                    setFilteredData(data.data.ObjectData);
                    setTotalRow(data.data.SummaryData);
                }else{
                    //setloaithongbao('WarningNoData');
                    //clsFunc.fSetTimeToOpenModalThongBao(setmodalthongbao,true);
                    setData([]);
                    setFilteredData([]);
                    //setmodalthongbao(true);
                }
            }
        })
    }

    "Hàm lấy dữ liệu Báo cáo Tồn kho đến ngày (dạng rút gọn)"
    async function fGetEndInvBalanceByDate(vTaikhoan,vKho,std,td) {
        await SalesManagerAPI.GetEndInvBalanceByDate(vTaikhoan,vKho,std,td,setvisibleLoadData).then((data)=>{
            if(data.status==200){
                console.log('Get Báo cáo Tồn kho (dạng rút gọn): ',data.data.ObjectData);
                if(data.data.ObjectData.length > 0) {
                    setData(data.data.ObjectData);
                    setFilteredData(data.data.ObjectData);
                    setTotalRow(data.data.SummaryData);
                }else{
                    setData([]);
                    setFilteredData([]);
                    //setloaithongbao('WarningNoData');
                    //setmodalthongbao(true);
                }
            }
        })
    }

    "Hàm lấy dữ liệu Báo cáo Công nợ (dạng đầy đủ)"
    async function fGetCustomerBalancebyDate(vTaikhoan,std,td) {
        await SalesManagerAPI.GetCustomerBalancebyDate(vTaikhoan,std,td,setvisibleLoadData).then((data)=>{
            if(data.status==200){
                console.log("Get Báo cáo công nợ đầy đủ",data.data.ObjectData);
                if(data.data.ObjectData.length > 0) {
                    setData(data.data.ObjectData);
                    setFilteredData(data.data.ObjectData);
                    setTotalRow(data.data.SummaryData);
                }else{
                    setData([]);
                    setFilteredData([]);
                    //setloaithongbao('WarningNoData');
                    //setmodalthongbao(true);
                }
            }  
        })
    }

    "Hàm lấy dữ liệu Báo cáo Công nợ đến ngày (dạng rút gọn)"
    async function fGetEndCustBalancebyDate(vTaikhoan,std,td){
        await SalesManagerAPI.GetEndCustBalancebyDate(vTaikhoan,std,td,setvisibleLoadData).then((data)=>{
            if(data.status==200){
                console.log("Get Báo cáo công nợ rút gọn",data.data.ObjectData);
                if(data.data.ObjectData.length > 0) {
                    setData(data.data.ObjectData);
                    setFilteredData(data.data.ObjectData);
                    setTotalRow(data.data.SummaryData);
                }else{
                    setData([]);
                    setFilteredData([]);
                    //setloaithongbao('WarningNoData');
                    //setmodalthongbao(true);
                }
            }
        })
    }

    "Hàm nạp dữ liệu khi người dùng nhấn nút"
    function fNapdulieu(){

        let vKho,vTaikhoan = '';
        let std = moment(startDay).format("YYYY-MM-DD");
        let td = moment(toDay).format("YYYY-MM-DD");

        if(titleHeaderComponent.id==='baocaotonkho'){
            if(valueKho==null){
                vKho = '';
            }else{
                vKho=valueKho
            }
        }else{
            if(value==null){
                vTaikhoan='';
            }else{
                vTaikhoan=value;
            }
        }
        let checkBeforeGetData = clsFunc.fCheckFromToDate(std,td);

        if(!checkBeforeGetData){
            setloaithongbao('WarningDate');
            setmodalthongbao(true);
            return;
        }else{
            setvisibleLoadData(true);
            if(route.params.id=="baocaotonkho"){
                if(vViewFull==true){
                    fGetInventoryBalanceByDate(vTaikhoan,vKho,std,td);
                }else{
                    fGetEndInvBalanceByDate(vTaikhoan,vKho,std,td);
                }
            }else{
                if(vViewFull==true){
                    fGetCustomerBalancebyDate(vTaikhoan,std,td);
                }else{
                    fGetEndCustBalancebyDate(vTaikhoan,std,td)
                }
            }
        }
    }
    
    //#endregion

    //#region "Function Filter Data"
    "Filter theo từng cột của FlatList"
    function fHandleFilterChange(key, value) {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        const isAllEmpty = Object.values(newFilters).every(v => !v?.trim());
        if (isAllEmpty) {
            setFilteredData(data); // Trả toàn bộ dữ liệu nếu không có filter nào
            return;
        }

        const newData = data.filter(item => {
            return Object.keys(newFilters).every(k => {
                const filterVal = newFilters[k]?.toLowerCase().trim() || '';
                const itemVal = item?.[k]?.toString().toLowerCase() || '';
                return itemVal.includes(filterVal);
            });
        });

        setFilteredData(newData);
    }


    "Filter theo drop chọn"
    function fFilterByDropdown(selectedValue) {
        if (!selectedValue || selectedValue === 'G') {
            // Nếu chọn "Tất cả", giữ nguyên data
            setFilteredData(data);
            return;
        }

        let newData = [];

        if (route.params.id === "baocaotonkho") {
            newData = data.filter(item => item.WareHouseID === selectedValue);
        } else {
            newData = data.filter(item => item.AccountID === selectedValue);
        }

        setFilteredData(newData);
    }
    //#endregion

    //#region "Gồm View lịch và function chọn ngày"
    "View Calendar chọn ngày"
    const ViewCalendar=({openViewCalendar,setopenViewCalendar})=>{
        return(
            <Modal visible={openViewCalendar} animationType="fade" transparent={true}>
                <TouchableWithoutFeedback onPress={() => setopenViewCalendar(false)}>
                    <View style={ModalLich.overlay}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={ModalLich.modalContainer}>
                        
                        {/* Header */}
                        <View style={ModalLich.modalHeader}>
                            <TouchableOpacity onPress={() => setopenViewCalendar(false)}>
                            <Icon
                                name="window-close"
                                size={22}
                                color="white"
                            />
                            </TouchableOpacity>

                            <Text style={ModalLich.headerTitle}>CHỌN NGÀY</Text>

                            <TouchableOpacity onPress={() => {
                                const today = new Date();
                                if(loaibamngay==='s'){
                                    setstartDay(today);
                                }else{
                                    settoDay(today);
                                }
                                setcalendarSelectedDate(today);
                                setopenViewCalendar(false);
                            }}>
                            <Text style={ModalLich.todayText}>Hôm{'\n'}nay</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Calendar */}
                        <CalendarPicker
                            startFromMonday={true}
                            allowRangeSelection={false}
                            minDate={new Date(1995, 1, 1)}
                            maxDate={new Date(2050, 12, 31)}
                            initialDate={calendarSelectedDate}
                            selectedStartDate={calendarSelectedDate}
                            weekdays={[
                            'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'
                            ]}
                            months={[
                            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
                            ]}
                            previousTitle="Trước"
                            nextTitle="Sau"
                            todayBackgroundColor={COLORS.yellow}
                            selectedDayColor="#66ff33"
                            selectedDayTextColor="#000"
                            scaleFactor={380}
                            textStyle={{ color: '#000' }}
                            onDateChange={fOnDateChange}
                        />
                        </View>
                    </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    "Function xử lý khi chọn ngày trên ViewCalendar xong"
    function fOnDateChange(date){
        if(loaibamngay=='s'){
            setstartDay(date)
        }else{
            settoDay(date)
        }
        setopenViewCalendar(false)
    };
    //#endregion

    //#region Mảng action
    let actionData = {
        navigation: ()=>{navigation.navigate(NameScreen.TrangChu,titleHeaderComponent)}
    }
    //#endregion

    //#region Gắn key visilbe từ Data List
    let keys = visibleKeys;
    //#endregion

    
    return (
        <TouchableWithoutFeedback onPress={()=>{ 
            Keyboard.dismiss()
        }} accessible={false}>
            <KeyboardAvoidingView 
                style={{ flex: 1, backgroundColor: 'white' }} 
                //behavior={Platform.OS === 'ios' ? 'height' : 'height'} 
                //keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}*/
                >

                <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                    
                    <ComponentHeader />
                    
                    <ComponentInput />

                    <View style={{ flex: filteredData.length>0?1:null}}>
                            <ScrollView
                                horizontal
                                keyboardShouldPersistTaps="handled"
                            >
                                <View style={{...containerView('report',data)}}>
                                    {/* Header */}
                                    <View style={{...GridStyle(visibleKeys.length,'').headerRow}}>
                                        {keys.map(key => (
                                            <Text key={key} style={{...GridStyle(visibleKeys.length,key).headerCell}}>{clsFunc.fRenameHeaderTable(key)}</Text>
                                        ))}
                                    </View>

                                    {/* Filter row */}
                                    <View style={{...GridStyle(visibleKeys.length,'').filterRow}}>
                                        {keys.map(key => (
                                        <TextInput                          
                                            key={key}
                                            style={{...GridStyle(visibleKeys.length,key).filterInput}}
                                            placeholder={''}
                                            value={filters[key]}
                                            onChangeText={value => fHandleFilterChange(key, value)}
                                        />
                                        ))}
                                    </View>

                                   
                                    <FlatList
                                        data={filteredData} // luôn data gốc
                                        keyExtractor={(item, index) => index.toString()}
                                        style={{ height: 'auto'}} 
                                        ListEmptyComponent={() => (
                                            <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                                                <Text style={{textAlign:'center',textAlignVertical:'center',}}>Không có dữ liệu</Text>
                                            </View>
                                        )}
                                        renderItem={({ item }) => {
                                            if (!item) return null;                    
                                            const show = !!item && Object.keys(filters).every(k =>
                                                (item?.[k] ?? '').toString().toLowerCase().includes((filters[k] ?? '').toLowerCase())
                                            );
                                    
                                            if (!show) return null;

                                            return (
                                            <View style={{...GridStyle(visibleKeys.length,'').dataRow}} >
                                                {keys.map(key => (
                                                    <Text 
                                                        key={key} 
                                                        style={{...GridStyle(visibleKeys.length,key).dataCell}}
                                                        onPress={()=>{}}>
                                                            {item[key]}
                                                    </Text>
                                                ))}
                                            </View>
                                            );
                                        }}
                                        ListFooterComponent={() =>
                                            filteredData.length > 0 ? (
                                                <View style={{...GridStyle(visibleKeys.length,'').dataRow}}>
                                                    {keys.map(key => (
                                                        <Text key={key} style={{...GridStyle(visibleKeys.length,key,'').dataCell,fontWeight:'bold',color:'black'}}>
                                                            {clsFunc.fNameTotalRow(key,totalRow,titleHeaderComponent.id)}
                                                        </Text>
                                                    ))}
                                                </View>
                                            ) : null
                                        }
                                    />
                                 
                                </View>
                            </ScrollView>
                    </View>

                    {modalVisible? 
                        <ModalSelectFields 
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            allKeys={allKeys}
                            selectedKeys={selectedKeys}
                            setSelectedKeys={setSelectedKeys}
                            onConfirm={fHandleConfirmSelectFields}
                        />
                    :null}

                    {openViewCalendar? 
                        <ViewCalendar 
                            openViewCalendar={openViewCalendar}
                            setopenViewCalendar={setopenViewCalendar}
                        />
                        :null}

                    {modalthongbao?
                        FunctionViewThongBao(loaithongbao,modalthongbao,setmodalthongbao,actionData)
                        :null}

                    {visibleLoadData?
                        <ViewLoadingAnimation 
                            visibleLoadData={visibleLoadData} />
                        :null}

                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
