import React, { useState,useEffect} from 'react'
import { Text, View,TouchableWithoutFeedback, KeyboardAvoidingView,Keyboard,TouchableOpacity,
     FlatList,ScrollView,TextInput, Image, Modal, StyleSheet, 
     Dimensions} from 'react-native'

// Import từ các file khác
import { containerHeader, containerView, GridStyle, ModalStyleThongbao} from '../../../constants/stylechung'
import { NameScreen } from '../../../constants/NameScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons } from '../../../constants';
import { clsFunc } from '../Function/Chung/fSupport';
import { GetNotification, SalesManagerAPI } from '../../api/SalesManager';
import { ViewLoadingAnimation } from '../Function/fViewLoading';
import { FunctionViewThongBao } from '../Function/Chung/fViewThongBao';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Notification = ({navigation,route}) => {

    let key = 'RowUniqueID';

    const [titleHeaderComponent,settitleHeaderComponent] = useState([])
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({});

    const [item, setItem] = useState(route.params?.rowUniqueID);

    //Modal load dữ liệu
    const[visibleLoadData,setvisibleLoadData]=useState(false)

    //Modal View detail thông báo
    const [visibleThongBao,setvisibleThongBao] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Set loại thông báo hiển thị
    const [modalthongbao,setmodalthongbao] = useState(false)
    const [loaithongbao,setloaithongbao] = useState('')

    //#region Chức năng xem thêm thông tin
    // Lấy các trường chính để View 
    //const defaultkey = ["TitleNotify","MsgNotify","EventsDate","Action","ModifiedObjID","ModifiedType","ComputerName"];
    const defaultkeyRutgon = ["TitleNotify","MsgNotify","EventsDate","UserID","ComputerName"];
    const [visibleKeys, setVisibleKeys] = useState(defaultkeyRutgon);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState(visibleKeys); // mặc định bằng visibleKeys khi mở
  
    let allKeys = Object.keys(data[0] || {});
  
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
                  <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                          <View style={{backgroundColor: 'white', padding: 20, width: '80%', borderRadius: 10}}>
                          <Text style={{fontWeight: 'bold', marginBottom: 10}}>CHỌN CÁC THÔNG TIN MUỐN XEM THÊM</Text>
  
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
                  </TouchableWithoutFeedback>
              </Modal>
             
        );
    };
  
    //#endregion

    //#region // Xử lý khi thay đổi chuyển screen 
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            fInitLoad();
        });
        return () => {unsubscribe};
    },[navigation])
    //#endregion
    
    //#region Xử lý khi thay đổi dữ liệu
    useEffect(() => {
        if (route.params?.rowUniqueID) {
            fInitLoad(); // nếu cần, load lại data
            setItem(route.params.rowUniqueID);
        }
    }, [route.params?.rowUniqueID]);

    useEffect(() => {
        if (item && data.length > 0){
            fSetDataFromNotification(key, item);
        }
    }, [item, data]);
    //#endregion

    //#region Xử lý selectedItem thay đổi ---> Đang vướng vì nếu chọn lại đúng Item đó thì không có sự thay đổi item nên không vào useEffect này được.
    /*useEffect(() => {
        if (selectedItem) {
            console.log('Dòng dữ liệu thông báo chọn: ',selectedItem);
            //clsFunc.fSetTimeToOpenModalThongBao(setvisibleThongBao, true);
        }
    }, [selectedItem]);*/
    //#endregion

    //#region Function Init
    "Function load thiết lập"
    function fInitLoad(){
        settitleHeaderComponent(route.params);
        
        fLoadNotifications();
    
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
 
    //#region Get danh sách thông báo
    async function fLoadNotifications() {
        try {
            await SalesManagerAPI.GetNotification(setvisibleLoadData).then((data)=>{
                if(data.status==200 && data.data?.ObjectData?.length > 0){
                    setData(data.data.ObjectData)
                    setFilteredData(data.data.ObjectData);
                    console.log('Danh sách thông báo backend trả về: ',data.data.ObjectData)
                }else{
                    console.log('Status thông báo trả về: ',data.status);
                    console.log('Danh sách thông báo backend trả về: ',data.data.ObjectData);
                }
            })
        } catch (error) {
            console.error('Lỗi ', error);
        }
    };
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

    //Hàm cho dữ liệu từ người dùng nhấn thông báo ở thanh thông báo
    function fSetDataFromNotification(key, value){
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
       
        const newData = data.filter(item => {
            return Object.keys(newFilters).every(k => {
                const filterVal = newFilters[k]?.trim() || '';
                const itemVal = item?.[k]?.toString() || '';
                return itemVal.includes(filterVal);
            });
        });

        console.log('newData sau khi filter: ',JSON.stringify(newData));

        setSelectedItem(newData);
        setFilteredData(newData);
    }
    //#endregion

    //#region Component View cho Header, Body, Footer
    const ComponentHeader=()=>{   
        return( 
            <View style={{...containerHeader.ctnHeader,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate(NameScreen.TrangChu,'')}} 
                    style={{paddingLeft:10,width:'30%'}}>
                        <Image
                        source={icons.trove}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: 'white',
                        }} 
                        />
                </TouchableOpacity>

                <Text style={{...containerHeader.headerCaption,width:'30%'}}>{titleHeaderComponent.description}</Text>
                    
        
                <TouchableOpacity 
                    onPress={()=>{
                        setloaithongbao('NoDetail');
                        setmodalthongbao(true);
                    }}
                    style={{alignItems:'flex-end',paddingRight:10,width:'30%'}}>
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
        )
    }
    //#endregion

    //#region Gắn key visilbe từ Data List
    let keys = visibleKeys;
    //#endregion

    //#region Modal detail Thông báo
    const ModalDetailThongBao = ({ visibleThongBao, setvisibleThongBao, itemselect }) => {
        return (
            <Modal transparent visible={visibleThongBao} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setvisibleThongBao(false)}>
                    <View style={ModalStyleThongbao.overlay}>
                        <View style={ModalStyleThongbao.modalContainer}>
                            <Text style={ModalStyleThongbao.title}>{itemselect.TitleNotify?.toString()}</Text>

                            <View style={ModalStyleThongbao.row}>
                                <Text style={ModalStyleThongbao.label}>Nội dung:</Text>
                                <Text style={ModalStyleThongbao.value}>{itemselect.MsgNotify?.toString()}</Text>  
                            </View>

                            <View style={ModalStyleThongbao.row}>
                                <Text style={ModalStyleThongbao.label}>Thời gian:</Text>
                                <Text style={ModalStyleThongbao.value}>{clsFunc.fFormatDataItem('EventsDate',itemselect)}</Text>
                            </View>

                            <View style={ModalStyleThongbao.row}>
                                <Text style={ModalStyleThongbao.label}>Người thực hiện:</Text>
                                <Text style={ModalStyleThongbao.value}>{itemselect.UserID?.toString()}</Text>
                            </View>

                            <View style={ModalStyleThongbao.row}>
                                <Text style={ModalStyleThongbao.label}>Máy tính:</Text>
                                <Text style={ModalStyleThongbao.value}>{itemselect.ComputerName?.toString()}</Text>
                            </View>

                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>

                                <TouchableOpacity style={ModalStyleThongbao.okButton} onPress={()=>{
                                    setvisibleThongBao(false);
                                    let data={ 
                                        id: 'phieubanhang',
                                        description: "PHIẾU\nBÁN HÀNG",
                                        voucherID: itemselect.VoucherID
                                    }
                                    navigation.navigate(NameScreen.Phieubanhang,data);
                                }}>
                                    <Text style={ModalStyleThongbao.closeButtonText}>Phiếu bán hàng</Text>
                                
                                </TouchableOpacity>

                                <TouchableOpacity style={ModalStyleThongbao.closeButton} onPress={()=>{
                                    fHandleFilterChange(key,'');
                                    clsFunc.fSetTimeToOpenModalThongBao(setvisibleThongBao,false);
                                }}>
                                    <Text style={ModalStyleThongbao.closeButtonText}>Đóng</Text>
                                </TouchableOpacity>

                                
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };
    //#endregion
    
    return (
        <TouchableWithoutFeedback onPress={()=>{ Keyboard.dismiss()}} accessible={false}>
            <KeyboardAvoidingView  style={{ flex: 1, backgroundColor: 'white' }}>
                <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}> 
                    
                    <ComponentHeader />

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
                                        <TouchableOpacity 
                                            style={{...GridStyle(visibleKeys.length,'').dataRow}} 
                                            onPress={()=>{
                                                console.log('Dòng dữ liệu thông báo được chọn: ',item);
                                                setSelectedItem(item);
                                                clsFunc.fSetTimeToOpenModalThongBao(setvisibleThongBao, true);
                                            }}
                                        >
                                            {keys.map(key => (
                                                <Text 
                                                    key={key} 
                                                    style={{...GridStyle(visibleKeys.length,key).dataCell}}
                                                >
                                                        {clsFunc.fFormatDataItem(key,item)}
                                                </Text>
                                            ))}
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                                        
                        </View>
                    </ScrollView>
                    </View>
                    
                    {visibleLoadData?
                        <ViewLoadingAnimation 
                            visibleLoadData={visibleLoadData} />
                    :null}

                    {modalVisible == true? 
                        <ModalSelectFields 
                            modalVisible={modalVisible}
                                setModalVisible={setModalVisible}
                                allKeys={allKeys}
                                selectedKeys={selectedKeys}
                                setSelectedKeys={setSelectedKeys}
                                onConfirm={fHandleConfirmSelectFields}
                        />
                    :null}

                    {visibleThongBao? 
                        <ModalDetailThongBao 
                            visibleThongBao={visibleThongBao}
                            setvisibleThongBao={setvisibleThongBao}
                            itemselect={selectedItem[0]?selectedItem[0]:selectedItem}
                        />
                    :null}

                    {modalthongbao==true? FunctionViewThongBao(loaithongbao,modalthongbao,setmodalthongbao,''):null}

                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default Notification;
