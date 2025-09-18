import React, { useState,useEffect} from 'react'
import { StyleSheet, Text, View,TouchableWithoutFeedback, KeyboardAvoidingView,Keyboard,TouchableOpacity,
    Modal, FlatList,ScrollView,TextInput, Image } from 'react-native'

// Import từ các thư viện
import moment from 'moment/moment';
import CalendarPicker from 'react-native-calendar-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from 'react-native-safe-area-context';

// Import từ các file khác
import { containerHeader, containerInput, containerView, GridStyle, ModalLich, ModalPhieugiaohang} from '../../../constants/stylechung'
import { NameScreen } from '../../../constants/NameScreen';
import { FunctionViewThongBao } from '../Function/Chung/fViewThongBao';
import { SalesManagerAPI } from '../../api/SalesManager';
import { COLORS, icons } from '../../../constants';
import { ViewLoadingAnimation } from '../Function/fViewLoading';
import { clsFunc } from '../Function/Chung/fSupport';
import { clsView } from '../Function/Chung/fView';

export default function Invoice({navigation,route}) {
    
    const [titleHeaderComponent,settitleHeaderComponent] = useState([])

    // Dữ liệu cho ngày voucher khi chọn voucher
    const [dVoucher,setdVoucher] = useState(new Date());
    const [startDay,setstartDay] = useState();
    const [toDay,settoDay] = useState();
    const [loaibamngay,setloaibamngay] = useState('');
    const [calendarSelectedDate, setcalendarSelectedDate] = useState('');
    const [openViewCalendar,setopenViewCalendar] = useState(false)

    // Phiếu và khách hàng
    const [vVoucher, setvVoucher] = useState('');
    const [vCustumer, setvCustumer] = useState('');

    //Dropbox Nhân viên
    const [vStaff, setvStaff] = useState(null);
    const [iStaff, setiStaff] = useState([]);
    
    // Set loại thông báo hiển thị
    const [modalthongbao,setmodalthongbao] = useState(false)
    const [loaithongbao,setloaithongbao] = useState('')

    // List Data từ Nút nạp dữ liệu 
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({});

    const [modalphieubanhang,setmodalphieubanhang]=useState(false)

    const [datadetail, setdatadetail] = useState([]);
    const [itemselect,setitemselect]=useState({});

    //Modal load dữ liệu
    const[visibleLoadData,setvisibleLoadData]=useState(false)
    
    const [totalRow, setTotalRow] = useState({});
    const [totalRowDetail, settotalRowDetail] = useState({});

    //#region Chức năng xem thêm thông tin
    // Lấy các trường chính để View
    let phieubanhang = [
        "RowNumber","VoucherDate","VoucherNo", "TradeName","ItemID", "ItemName", 
        "UnitNameForVoucher", "QuantityByVoucher", "CnvPriceByVoucher", "ConvertAmount", 
        "SalesManName", "CreatedDate", "Notes"
    ];

    let phieubanhangRutgon = ["ItemName","QuantityByVoucher","CnvPriceByVoucher", "ConvertAmount"];

    let baocaodoanhthu =["VoucherDate","SalesManName","Quantity","ConvertAmount","ItemGroupID","WareHouseID"];

    let baocaolaigop = ["ItemID","ItemName","Quantity","UnitName","CnvAmount511","CnvAmount632","CnvGrossProfit"];

    function fKeyColumnVisible(){
        switch (route.params.id) {
            case 'phieubanhang':
                return phieubanhang;
            case 'doanhthubanhang':
                return baocaodoanhthu;
            case 'doanhthulaigop':
                return baocaolaigop
            default:
                return null; 
        }
    }

    const [visibleKeys, setVisibleKeys] = useState(fKeyColumnVisible());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(visibleKeys); // mặc định bằng visibleKeys khi mở

    let allKeys = Object.keys(data[0] || {});

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
                    {/*<TouchableWithoutFeedback onPress={()=>{setModalVisible(false)}}>*/}
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

    //#region // Xử lý khi thay đổi chuyển screen 
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            fInitLoad()
            if (route.params?.voucherID) {
                console.log('VoucherID truyền vào: ', route.params?.voucherID); 
                fGetSalesOneVoucher();
            }
        });
        
        return () => {unsubscribe};
    },[navigation])
    //#endregion
    
    //#region Xử lý khi thay đổi dữ liệu
    /*useEffect(() => {
        if (route.params?.voucherID) {
            console.log('VoucherID truyền vào: ', route.params?.voucherID);
            fInitLoad(); // nếu cần, load lại data
            fGetSalesOneVoucher();
        }
    }, [route.params?.voucherID]);*/
    //#endregion    

    //#region Component của 1 Page 
    const ComponentHeader=()=>{
        return( 
            <View style={{...containerHeader.ctnHeader,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
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
                
                <Text style={{...containerHeader.headerCaption}}>{titleHeaderComponent.description}</Text>
                
                <TouchableOpacity onPress={fOpenSelectModal} style={{marginRight:10}}>
                            <Image
                                source={icons.more}
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: 'white',
                                    borderWidth: 1,
                                    borderColor:'white',
                                    borderRadius:5,                       
                                }} 
                            />
                </TouchableOpacity>
            </View>
        )
    }

    const ComponentInputphieubanhang = () => {
        
        const [localvVoucher, setlocalvVoucher] = useState(vVoucher);
        const [localvCustumer, setlocalvCustumer] = useState(vCustumer);
        const [oStaff, setoStaff] = useState(null);

        useEffect(()=>{
            setlocalvVoucher(vVoucher);
            setlocalvCustumer(vCustumer);
        },[vCustumer,vVoucher])

        return (
            <View style={{...containerInput.ctnInput, paddingTop:5}}>
                
                {/* Hai textInput của Nhập số phiếu và nhập tên khách hàng */}
                <View style={{flexDirection:'row',alignItems:'center', gap: 15}}>
                        
                        <View style={{...containerInput.viewItem, width:'48%', height:50}}>
                            <TextInput 
                                style={containerInput.textInput}
                                value={localvVoucher}
                                placeholder={'Nhập số phiếu'}
                                placeholderTextColor={COLORS.black}
                                onChangeText={(text) => setlocalvVoucher(text)}
                            />
                            {/*<Icon 
                                name="star"
                                size={15}
                                style={{position: 'absolute', top: -10, right: -5, color:'red', zIndex:1}}
                            />*/}
                        </View>
                
                        <View style={{...containerInput.viewItem, width:'48%', height:50}}>
                            <TextInput 
                                style={containerInput.textInput}
                                value={localvCustumer}
                                placeholder={'Nhập tên khách hàng'}
                                placeholderTextColor={COLORS.black}
                                onChangeText={(text) => setlocalvCustumer(text)}
                            />
                        </View>

                </View>
           
                {/* Gồm 3 nút: Lịch, nhân viên, nạp dữ liệu */}
                <View style={{flexDirection:'row',alignItems:'center', gap: 5}}>
        
                    <View style={{...containerInput.viewItem, width:'30%', height:50, alignItems:'center'}}>
                        <TouchableOpacity 
                            onPress={() => {
                                setvVoucher(localvVoucher);
                                setvCustumer(localvCustumer);
                                if(dVoucher!=''){
                                    setcalendarSelectedDate(dVoucher);
                                }else {
                                    setcalendarSelectedDate(new Date())
                                }
                                setopenViewCalendar(true);
                            }} 
                            style={{flexDirection:'row'}}>         
                                <Image 
                                    source={icons.fromdate}
                                    style={{tintColor:COLORS.lime, height:20, width:20}}
                                />  
                                <Text style={{...containerInput.textInput, marginLeft:10}}>
                                    {dVoucher!=''?moment(dVoucher).format('DD/MM/YY'):'Chọn ngày'}
                                </Text>
                        </TouchableOpacity>
                    </View>
          
                        <View style={{width:'37%'}}>
                                <ViewDroppoxStaff 
                                    vStaff={vStaff}
                                    setvStaff={setvStaff}
                                    iStaff={iStaff}
                                    setiStaff={setiStaff}
                                    oStaff={oStaff}
                                    setoStaff={setoStaff}
                                />
                        </View>   

                    <TouchableOpacity 
                        onPress={() => {
                            if (localvVoucher == '' && localvCustumer== '' && dVoucher== '') {
                                setloaithongbao('DataInput');
                                setmodalthongbao(true);
                                return;
                            }
                            fNapdulieu(localvVoucher, localvCustumer);
                        }} 
                        style={{...containerInput.buttonOK, marginTop:10, width:'30%',height:50}}>
                            <Text style={containerInput.buttonText}>Nạp dữ liệu</Text> 
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    //View Input Doanh thu bán hàng và Doanh thu lãi gộp
    const ComponentInputquanlydoanhthu = () => {
        
        const [oStaff, setoStaff] = useState(null);

        function fCheckTypeView(){
            if(titleHeaderComponent.id ==='doanhthubanhang'){
                return true
            }else{
                return false
            }
        }

        return (
            <View style={{...containerInput.ctnInput, paddingTop:5}}>
                
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
                                    <Text style={{...containerInput.textvalue,paddingTop:3,paddingLeft:10}}>TỪ NGÀY: {moment(startDay).format('DD/MM/YYYY')}</Text>
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
                                    <Text style={{...containerInput.textvalue,paddingTop:3,paddingLeft:10}}>ĐẾN NGÀY: {moment(toDay).format('DD/MM/YYYY')}</Text>
                        </TouchableOpacity>
                        <Icon 
                            name="star"
                            size={15}
                            style={{position: 'absolute',top: -10,right: -5,color:'red',zIndex:1}}
                        />
                </View>

                {/* Gồm 2 nút: nhân viên, nạp dữ liệu */}
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center', gap: 20}}>
                    
                    {fCheckTypeView()==true?<View style={{width:'50%'}}>
                        <TouchableWithoutFeedback onPress={()=>setoStaff(false)} style={{zIndex:5000}}>
                            <ViewDroppoxStaff 
                                    vStaff={vStaff}
                                    setvStaff={setvStaff}
                                    iStaff={iStaff}
                                    setiStaff={setiStaff}
                                    oStaff={oStaff}
                                    setoStaff={setoStaff}
                            />
                        </TouchableWithoutFeedback>
                    </View>:null} 
                    
                    <TouchableOpacity 
                        onPress={() => {
                            if (startDay == '' && toDay=='') {
                                setloaithongbao('DataInput');
                                setmodalthongbao(true);
                                return;
                            }
                            fNapdulieu('','');
                        }} 
                        style={{...containerInput.buttonOK, marginTop:10, width:'45%',height:50}}>
                            <Text style={containerInput.buttonText}>Nạp dữ liệu</Text> 
                    </TouchableOpacity>
                </View>

            </View>
        );

    }
    //#endregion

    //#region View Dropbox 
    "View Droppox Voucher"
    const ViewDroppoxVoucher = ({ vVoucher, setvVoucher, iVoucher, setiVoucher, currentOpen, setCurrentOpen, setdVoucher }) => {
        const [open, setOpen] = useState(false);

        useEffect(() => {
            if (currentOpen !== 'voucher' && open) {
                setOpen(false);
            }
        }, [currentOpen]);

        return (
            <DropDownPicker
                open={open}
                value={vVoucher}
                items={iVoucher}
                setOpen={(val) => {
                    setOpen(val);
                    setCurrentOpen(val ? 'voucher' : null);
                }}
                setValue={(callback) => {
                    const newValue = callback(value);
                    setvVoucher(newValue);
                    console.log('value được chọn: ',newValue)
                    return newValue;
                }}
                setItems={setiVoucher}
                placeholder="Chọn hóa đơn"
                style={{ zIndex: 2000, marginTop: 10, width: '60%' }}
                dropDownContainerStyle={{ width: '60%' }}
            />
        );
    };

    "View Droppox Staff"
    const ViewDroppoxStaff = ({vStaff,setvStaff,iStaff,setiStaff,oStaff,setoStaff}) => {
    
        return (
                <DropDownPicker
                    open={oStaff}
                    value={vStaff}
                    items={iStaff}
                    setOpen={setoStaff}
                    setValue={setvStaff}
                    setItems={setiStaff}
                    searchable={true}
                    searchPlaceholder='Nhập NV'
                    placeholder={"Chọn NV"}
                    style={{ marginTop: 10,width:'100%',height:50,zIndex:3000 }}
                    dropDownContainerStyle={{ width: '100%' }}

                />
        );
    };
    //#endregion

    //#region "Gồm View lịch và function chọn ngày"
    "View Calendar chọn ngày"
    const ViewCalendar=()=>{
        return(
            <Modal visible={openViewCalendar} animationType="fade" transparent={true}>
                <TouchableWithoutFeedback onPress={() => setopenViewCalendar(false)}>
                    <View style={ModalLich.overlay}>
                        <View style={ModalLich.modalContainer}>
                            {/* Header */}
                            <View style={ModalLich.modalHeader}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setopenViewCalendar(false);
                                        setdVoucher('');
                                    }}
                                    style={{ flexDirection: 'row' }}
                                    >
                                    <Icon name="window-close" size={22} color="white" />
                                </TouchableOpacity>

                                <Text style={ModalLich.headerTitle}>CHỌN NGÀY</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        const today = new Date();
                                        if (titleHeaderComponent.id === 'phieubanhang') setdVoucher(today);
                                        if (titleHeaderComponent.id === 'doanhthubanhang'){
                                            if(loaibamngay=='s'){ 
                                                setstartDay(today);
                                            }else{
                                                settoDay(today);
                                            }
                                        }
                                        setcalendarSelectedDate(today);
                                        setopenViewCalendar(false);
                                    }}
                                    style={{ flexDirection: 'row' }}
                                    >
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
                                'Thứ 2',
                                'Thứ 3',
                                'Thứ 4',
                                'Thứ 5',
                                'Thứ 6',
                                'Thứ 7',
                                'Chủ nhật',
                                ]}
                                months={[
                                'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
                                ]}
                                previousTitle="Trước"
                                nextTitle="Sau"
                                todayBackgroundColor={COLORS.yellow}
                                selectedDayColor="#66ff33"
                                selectedDayTextColor="#000000"
                                scaleFactor={380}
                                textStyle={{ color: '#000000' }}
                                onDateChange={fOnDateChange}
                            />

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        )
    }

    "Function xử lý khi chọn ngày trên ViewCalendar xong"
    function fOnDateChange(date){
        if(titleHeaderComponent.id==='phieubanhang'){
            setdVoucher(date);
        }else{
            if(loaibamngay=='s'){
                setstartDay(date)
            }else{
                settoDay(date)
            }
        }
        setopenViewCalendar(false)
    };
    //#endregion

    //#region Function Init
    "Function load thiết lập"
    function fInitLoad(){
        
        settitleHeaderComponent(route.params);
        
        fLoadDataToDropBox();
        clsFunc.fSetTimeFromTo(setstartDay,settoDay);

        if(data != ""){
            fInitFilter(data,setFilters);
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
        await SalesManagerAPI.GetEmployeeList().then((data)=>{
            if(data.status==200 && data.data?.ObjectData?.length > 0){
                clsFunc.fLoadDataToCombobox(data.data.ObjectData,setiStaff)
            }
        })     
    }

    "Hàm nạp dữ liệu khi người dùng nhấn nút"
    function fNapdulieu(voucher,custumer){

        setvVoucher(voucher);
        setvCustumer(custumer);

        switch (titleHeaderComponent.id) {
            case 'phieubanhang':
                return fGetSalesVoucher(voucher,custumer);
            case 'doanhthubanhang':
                return fGetGeneralSalesByDate();
            case 'doanhthulaigop':
                return fGetGeneralGrossProfitByItem();
            default:
                return null; 
        }
    }

    "Hàm lấy dữ liệu Phiếu giao hàng"
    async function fGetSalesVoucher(voucher,custumer){

        let dayVoucher = dVoucher == '' ? '' : moment(dVoucher).format("YYYY-MM-DD");
        let vS = vStaff != null? vStaff : '';

        setvisibleLoadData(true);
        
        await SalesManagerAPI.GetSalesVoucher(dayVoucher,voucher,custumer,vS,setvisibleLoadData).then((data)=>{
            if(data.status==200){
                let dt = data.data.ObjectData
                console.log("Get dữ liệu hóa đơn từ nhấn nút Nạp dữ liệu",dt);
                if(dt.length > 0) {
                    setData(dt);
                    setFilteredData(dt);
                    setTotalRow(data.data.SummaryData);                   
                }else{
                    setData([]);
                    setFilteredData([]);
                    //setloaithongbao('WarningNoData');
                    //setmodalthongbao(true);
                }
            }else{
                //setloaithongbao('WarningNoData');
                //setmodalthongbao(true);
                console.log('data back end error: ',data)
            }
        })
    }

    "Hàm lấy dữ liệu Báo cáo doanh thu bán hàng nhân viên"
    async function fGetGeneralSalesByDate(){

        let std = moment(startDay).format("YYYY-MM-DD");
        let td = moment(toDay).format("YYYY-MM-DD");
        let vS = vStaff != null? vStaff : '';

        let checkBeforeGetData = clsFunc.fCheckFromToDate(std,td);
        
        if(!checkBeforeGetData){
            setloaithongbao('WarningDate');
            setmodalthongbao(true);
            return;
        }else{
            setvisibleLoadData(true);
            await SalesManagerAPI.GetGeneralSalesByDate(std,td,vS,'','',setvisibleLoadData).then((data)=>{
                if(data.status==200){
                    console.log("Get dữ liệu báo cáo doanh thu bán hàng: ",data.data.ObjectData);
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
                }else{
                    //setloaithongbao('WarningNoData');
                    //setmodalthongbao(true);
                    console.log('data back end error: ',data)
                }
            })
        }
    }

    "Hàm lấy dữ liệu Báo cáo lãi gộp"
    async function fGetGeneralGrossProfitByItem(){
        let std = moment(startDay).format("YYYY-MM-DD");
        let td = moment(toDay).format("YYYY-MM-DD");
        let vS = vStaff != null? vStaff : '';

        let checkBeforeGetData = clsFunc.fCheckFromToDate(std,td);
        
        if(!checkBeforeGetData){
            setloaithongbao('WarningDate');
            setmodalthongbao(true);
            return;
        }else{
            setvisibleLoadData(true);
            await SalesManagerAPI.GetGeneralGrossProfitByItem(std,td,vS,'','',setvisibleLoadData).then((data)=>{
                if(data.status==200){
                    console.log("Get dữ liệu Báo cáo lãi gộp: ",data.data.ObjectData);
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
                }else{
                    //setloaithongbao('WarningNoData');
                    //setmodalthongbao(true);
                    console.log('data back end error: ',data)
                }
            })
        }
    }

    "Hàm nạp dữ liệu cho List data detail GetSaleVoucher khi người dùng chọn dòng item"
    async function fDetailItem(item){
        
        let vDate = moment(item.VoucherDate,"DD/MM/YYYY").format("YYYY-MM-DD");
        let VoucherNo = item.VoucherNo;
        let TradeName = item.TradeName != null && item.TradeName !=''?item.TradeName : '';
        let SalesManID = '';
        if (iStaff && Array.isArray(iStaff)) {
            const foundStaff = iStaff.find(staff => staff.label === item.SalesManName);
            console.log('foundStaff:', foundStaff);
            if (foundStaff && 'value' in foundStaff) {
                SalesManID = foundStaff.value;
            }
        }else{
            SalesManID='';
        }
        console.log('SalesManID:', SalesManID);

        setvisibleLoadData(true);

        await SalesManagerAPI.GetSalesVoucher(vDate,VoucherNo,TradeName,SalesManID,setvisibleLoadData).then((data)=>{
            if(data.status==200){
                if(data.data.ObjectData.length > 0) {
                    setdatadetail(data.data.ObjectData);
                    settotalRowDetail(data.data.SummaryData);
                    setitemselect(item);
                    setVisibleKeys(phieubanhangRutgon)
                    keys=visibleKeys
                    clsFunc.fSetTimeToOpenModalThongBao(setmodalphieubanhang,true);
                }
            }else{
                console.log('data back end error: ',data)
            }
        })    
    }

    "Hàm nạp dữ liệu từ thông báo"
    async function fGetSalesOneVoucher(){
        await SalesManagerAPI.GetSalesOneVoucher(route.params?.voucherID).then((data)=>{
            if(data.status==200){
                let dt = data.data.ObjectData
                console.log("Get dữ liệu hóa đơn từ thông báo từ biến truyền vào: ",dt);
                if(dt.length > 0) {
                    setData(dt);
                    setFilteredData(dt);
                    setTotalRow(data.data.SummaryData);                   
                }else{
                    setData([]);
                    setFilteredData([]);
                }
            }else{
                console.log('data back end error: ',data)
            }
        })
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
    function fFilterByDropdown(selectedvCustumer) {
        if (!selectedvCustumer || selectedvCustumer === 'G') {
            // Nếu chọn "Tất cả", giữ nguyên data
            setFilteredData(data);
            return;
        }

        let newData = [];

        if (route.params.id === "baocaotonkho") {
            newData = data.filter(iCustumer => iCustumer.WareHouseID === selectedvCustumer);
        } else {
            newData = data.filter(iCustumer => iCustumer.AccountID === selectedvCustumer);
        }

        setFilteredData(newData);
    }
    //#endregion

    //#region Mảng action
    let actionData = {
        navigation: ()=>{navigation.navigate(NameScreen.TrangChu,titleHeaderComponent)}
    }
    //#endregion

    //#region Gắn key visilbe từ Data List
    let keys = visibleKeys;
    //#endregion

    //#region Modal detail Item phiếu bán hàng
    const Modalphieubanhang = ({ modalphieubanhang, setmodalphieubanhang, datadetail, itemselect }) => {
        return (
            <Modal visible={modalphieubanhang} animationType="slide" transparent={true}>
                <TouchableWithoutFeedback onPress={()=>{
                    setVisibleKeys(phieubanhang)
                    setmodalphieubanhang(false);    
                }}>
                    <View style={ModalPhieugiaohang.modalOverlay}>
                        <View style={ModalPhieugiaohang.modalContainer}>
                            <Text style={ModalPhieugiaohang.title}>PHIẾU BÁN HÀNG</Text>
                            <Text style={ModalPhieugiaohang.subTitle}>NV: {itemselect.SalesManName} - Ngày: {moment(itemselect.VoucherDate,"DD/MM/YYYY").format("DD/MM/YYYY")}</Text>
                            <Text style={ModalPhieugiaohang.customer}>Khách hàng: {itemselect.TradeName}</Text>
            
                            <View style={{ height:'auto',maxHeight:'55%'/*'60%'*/}}>
                                    <ScrollView
                                        horizontal
                                        contentContainerStyle={{
                                            minWidth: keys.length * 100,
                                        }}
                                        keyboardShouldPersistTaps="handled"
                                    >
                                        <View style={{...containerView('report',data),margin:0}}>
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

                                            {/* Data */}
                                            <FlatList
                                                data={datadetail} 
                                                keyExtractor={(item, index) => index.toString()}
                                                scrollEnabled={true}
                                                initialNumToRender={20}
                                                maxToRenderPerBatch={20}
                                                removeClippedSubviews={true}
                                                windowSize={10}
                                                nestedScrollEnabled={true}
                                                ListEmptyComponent={() => (
                                                    <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                                                        <Text style={{textAlign:'center',textAlignVertical:'center',}}>Không có dữ liệu</Text>
                                                    </View>
                                                )}
                                                renderItem={({ item }) => {

                                                    const show = Object.keys(filters).every(k =>
                                                        item[k]?.toString().toLowerCase().includes(filters[k].toLowerCase())
                                                    );
                                            
                                                    if (!show) return null;
                                            
                                                    return (
                                                        <View style={{...GridStyle(visibleKeys.length,'').dataRow}}>
                                                            {keys.map(key => (
                                                                    <Text 
                                                                        key={key} 
                                                                        style={{...GridStyle(visibleKeys.length,key).dataCell}}
                                                                        onPress={()=>{}}
                                                                    >
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
                                                            <Text key={key} style={{...GridStyle(visibleKeys.length,key).dataCell,fontWeight:'bold',color:'black'}}>
                                                                {clsFunc.fNameTotalRow(key,totalRowDetail,titleHeaderComponent.id)}
                                                            </Text>
                                                        ))}
                                                    </View>
                                                    ) : null
                                                }
                                    
                                            />   
                                        </View>
                                    </ScrollView>
                            </View>
            
                            <Text style={ModalPhieugiaohang.total}>Tổng thành tiền: {totalRowDetail.ConvertAmount}</Text>
                        
                            <TouchableOpacity onPress={()=>{
                                setVisibleKeys(phieubanhang)
                                setmodalphieubanhang(false);    
                            }} style={ModalPhieugiaohang.closeButton}>
                                <Text style={ModalPhieugiaohang.closeText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };
    //#endregion

    return (
        <TouchableWithoutFeedback onPress={()=>{ Keyboard.dismiss() }} accessible={false}>
            <KeyboardAvoidingView 
                style={{ flex: 1, backgroundColor: 'white' }} 
                //behavior={Platform.OS === 'ios' ? 'height' : 'height'} 
                //keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
            >
                <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                    
                    <ComponentHeader />
                    
                    {titleHeaderComponent.id==='phieubanhang'?
                        <ComponentInputphieubanhang />:<ComponentInputquanlydoanhthu />
                    }

                    <View style={{ flex: filteredData.length>0?1:null}}>
                            <ScrollView
                                horizontal
                                keyboardShouldPersistTaps="handled"
                            >
                                <View style={{...containerView('report',data)}}>
                                    {/* Header */}
                                    <View style={{...GridStyle(visibleKeys.length,'').headerRow}}>
                                        {keys.map(key => (
                                            <Text key={key} style={{...GridStyle(visibleKeys.length,key,'').headerCell}}>{clsFunc.fRenameHeaderTable(key)}</Text>
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

                                    {/* Data */}
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
                                                <TouchableOpacity style={{
                                                    ...GridStyle(visibleKeys.length,'').dataRow,
                                                    backgroundColor: clsFunc.fSetColorForItemSpecial('background',"ModifiedType",item)
                                                }} 
                                                    onPress={()=>{
                                                        route.params.id=='phieubanhang'?fDetailItem(item):null
                                                    }}>
                                                    {keys.map(key => (
                                                        <Text 
                                                            key={key} 
                                                            style={{
                                                                ...GridStyle(visibleKeys.length,key).dataCell,
                                                                color: clsFunc.fSetColorForItemSpecial('color',"ModifiedType",item),
                                                                fontWeight: clsFunc.fSetFontWeightForItem("ModifiedType",item),
                                                            }}
                                                        >
                                                            {clsFunc.fFormatDataItem(key,item)}
                                                        </Text> 
                                                    ))}
                                                </TouchableOpacity>
                                            );
                                        }}
                                        ListFooterComponent={() =>
                                                filteredData.length > 0 ? (
                                                <View style={{...GridStyle(visibleKeys.length,'','').dataRow}}>
                                                    {keys.map(key => (
                                                        <Text key={key} style={{...GridStyle(visibleKeys.length,key).dataCell,fontWeight:'bold',color:'black'}}>
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


                    {modalphieubanhang?
                        <Modalphieubanhang 
                            modalphieubanhang={modalphieubanhang} 
                            setmodalphieubanhang={setmodalphieubanhang} 
                            datadetail={datadetail}
                            itemselect={itemselect}
                        />:null
                    }

                    {openViewCalendar ? 
                        <ViewCalendar />
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