import React,{useEffect,useState} from "react";
import {View,Text,Image, FlatList,Modal,TouchableOpacity,ScrollView,StyleSheet,Linking,
       Dimensions,ActivityIndicator,Alert } from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../../../constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore  from "@react-native-firebase/firestore"
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { containerHeader,containerInput,card, footerthongke, ModalStyle} from '../../../constants/stylechung';
import { NameScreen } from "../../../constants/NameScreen";
import { object } from "../../../constants/theme";
import { FunctionViewThongBao } from "../Function/Chung/functionViewThongBao";
import { SetNgayGio } from "../Function/Chung/functionGetDate";
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

export const TrangChu = ({navigation,route}) => {
    const [user,setuser] = useState([])
    const [modalChuongThongBao,setmodalChuongThongBao]=useState(false)
    const [modalthongbao,setmodalthongbao] = useState(false)
    const [loaithongbao,setloaithongbao] = useState('')
    const [disTouch,setdisTouch] = useState(false);
    const [danhsachhopdong,setdanhsachhopdong]= useState([])
    const [dataThongKe,setdataThongKe] =useState('')

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            setdulieu()
            setdataThongKe(SetNgayGio())
        });
        return () => {unsubscribe};
    },[navigation])

    const setdulieu = async () => {
        if (route.params && 'hoten' in route.params) {
            setuser(route.params)
        } else {
            let usrRemember = JSON.parse(await AsyncStorage.getItem('user'))
            setuser(usrRemember)          
        }
    }

    //Modal Chuông thông báo
    const ModalViewChuongThongBao = ()=>{
        return(
            <Modal visible={modalChuongThongBao} animationType="fade" transparent={true}>
                <View style={{...ModalStyle.Modal,height:250,marginTop:250}}>
                    
                    <View style={{backgroundColor:'white',height:240}}> 

                        <View style={{backgroundColor: COLORS.skin2.bgheader,padding:10}}>
                            <Text style={{...object.labelTitle,textAlign:'center'}}>Thông báo</Text>
                        </View>

                        <ScrollView>
                            <View style={{marginTop:5}}>
                                    <FlatList
                                        data={danhsachhopdong}
                                        keyExtractor={({ key }, index) => key}
                                        renderItem={({ item }) => (
                                            //ViewListDonVi_Filter(item)
                                            <View style={{paddingTop:10,justifyContent:'space-between',flexDirection:'row',width:windowWidth*0.95,borderBottomWidth:0.2,borderBottomColor:'gray'/*,borderColor:'grey',borderWidth:0.2,*/,marginLeft:5}}>
                                                
                                                <TouchableOpacity onPress={()=>{setmodalChuongThongBao(false,navigation.navigate(NameScreen.Baotri))}} 
                                                style={{paddingTop:10,justifyContent:'space-between',flexDirection:'row',
                                                width:windowWidth*0.95,borderBottomWidth:0.2,borderBottomColor:'gray'/*,borderColor:'grey',borderWidth:0.2,*/,marginLeft:5}}>
                                                    <View style={{marginLeft:5,width:'65%',flexDirection:'row',paddingBottom:10}}>            
                                                            <Text style={{color:'black',width:windowWidth*0.55}}>{item.noidung}</Text>                                                                           
                                                    </View>
                                                    
                                                    <View style={{width:'25%'}}>
                                                        <Text style={{color:'black'}}>{moment(item.ngayhethan,"MM/DD/YYYY").format("DD-MM-YYYY")}</Text>
                                                    </View>
                                                
                                                </TouchableOpacity>
                                                
                                            </View>
                                        )} 
                                    />   
                            </View>
                        </ScrollView>

                        <View style={{...containerInput.viewButton,marginTop:15,marginBottom:15,justifyContent:'center'}}>
                            <TouchableOpacity style={{...containerInput.buttonCancle}}
                            onPress={() => {setmodalChuongThongBao(false)}}>
                                <Text style={{...containerInput.buttonText}}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </Modal>
        )
    }

    const featuresData = [
        {
            id: 'baocaotonkho',
            icon: icons.report_bucket,           
            description: "BÁO CÁO\nTỒN KHO"
        }, 
        { 
            id: 'baocaocongno',
            icon: icons.report_todolist,
            //color: COLORS.purple,
            //backgroundColor: COLORS.lightpurple,
            description: "BÁO CÁO\nCÔNG NỢ"
        },
        { 
            id: 'phieugiaohang',
            icon: icons.dexuat,
            //color: COLORS.purple,
            //backgroundColor: COLORS.lightpurple,
            description: "PHIẾU\nGIAO HÀNG"
        }
    ]

    const [features, setFeatures] = React.useState(featuresData)

    function Navigation(item){

        switch (item.id) {
            case 'baocaotonkho':
                navigation.navigate(NameScreen.Tonghophanghoa,item)
                break;
            case 'baocaocongno':
                navigation.navigate(NameScreen.Tonghophanghoa,item)
                break;
            case 'phieugiaohang':
                navigation.navigate(NameScreen.Phieugiaohang,item)
                break;
            // ... thêm các case khác
            default:
                return null; 
        }
    }

    const ComponentHeader=()=>{
        return( 
            <View style={{...containerHeader.ctnHeader,flexDirection:'row'}}>
                
                <View style={{borderRadius: 20,alignItems: 'center',justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate(NameScreen.ThongTinTaiKhoan,user)}}>
                        <Image
                                source={icons.menu_user}
                                style={{
                                    width: 25,
                                    height: 25,    
                                    tintColor: 'white',
                                    marginLeft:10
                                }}
                        />
                        
                    </TouchableOpacity>
                 </View>
                 
                <View style={{ flex: 1,justifyContent:'center',marginLeft:30}} >                  
                     <Text style={{ ...FONTS.body3,color:'white'}}>{user.hoten?user.hoten:null}</Text>                    
                </View>

                <View style={{justifyContent: 'space-between',flexDirection:'row'}}>
                    <TouchableOpacity
                        style={{
                             height: 30,
                             width: 30,
                             justifyContent: 'center',
                             alignItems: 'center',
                             alignSelf:'center'
                            
                        }}
                        onPress={()=>{}}>
                            <Image
                                source={icons.bell}
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'white',
                                    marginRight:15,
                                    
                                }}
                            />
                                                
                    </TouchableOpacity>
                   
                </View>
                
            </View>
        )
    }

    const ComponentInput=()=>{
        // Chỉnh sửa item 
        const renderItem = ({ item }) => (
            
            <TouchableOpacity
                style={{ 
                    width: '31%',
                    alignItems: 'center',
                    marginLeft:7,
                    marginBottom:10,
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.3,
                    elevation: 5,
                    borderRadius: 7,     
                    borderWidth: 1 ,        
                    backgroundColor:'white'
                }}
                onPress={() => {Navigation(item)}}
            >
                <View
                    style={{
                        height: 80,
                        width: '100%',
                        marginBottom: 5,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                    }}
                >
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                       
                        style={{
                            height: 50,            
                            tintColor: COLORS.darkgray//item.color
                        }}
                    />
                </View>
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4,paddingBottom:10}}>{item.description}</Text>
            </TouchableOpacity>
           
        )

        return(
            <View style={{height:'80%',paddingTop:10}}>
                <FlatList
                    //ListHeaderComponent={Header}
                    data={features}
                    numColumns={3}
                    columnWrapperStyle={{ }}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    style={{ }}
                />
            </View>
        )
    }
    
    const ComponentView=()=>{
       return footerthongke(dataThongKe)
    }

    //View loading lấy data
    const LoadingAnimation=()=>{
        return (
        <View style={styles.indicatorWrapper}>
            <View>
                <ActivityIndicator size="large" style={styles.indicator} />
                <Text style={styles.indicatorText}>Loading ...
                </Text>
            </View>
        </View>
        );
    }

    return (
       <SafeAreaView>
            <View style={{height:'100%',backgroundColor:'white'}}>           
                    
                    <ComponentHeader />
                    <ComponentInput />
                    <ComponentView />

                    {modalChuongThongBao==true?<ModalViewChuongThongBao />:null} 
                    {disTouch==true?<LoadingAnimation />:null}
                    {modalthongbao==true? (FunctionViewThongBao(loaithongbao,modalthongbao,setmodalthongbao,'')) :null}
                
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },        
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
        },
        message: {
          fontSize: 18,
          marginBottom: 20,
          textAlign: 'center',
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
        cancelButton: {
          backgroundColor: 'red',
        },
        confirmButton: {
          backgroundColor: 'green',
        },
        
        centeredView: {
            width: '100%', 
        },
        modalView: {
            borderRadius: 10,
            padding:5,
            shadowColor: COLORS.skin2.bgflatlist,
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.5,
            shadowRadius: 0,
            elevation: 4,
            //height:250
        },
        button: {
            padding: 10,
            borderRadius: 5,
           
        },
        SaveButton: {
            backgroundColor: 'white',
            marginRight:100,
            borderColor:COLORS.buttonborder,
            borderWidth: 2,
            width:100,
            marginRight:20
        },
        indicatorWrapper: {
            justifyContent: 'center',
            alignSelf:'center',
            position:'absolute',
            top:'50%',
            zIndex:1,
          },
});

export function bell(){
    useEffect(()=>{
        DanhSach()
        }, [])
    const [DanhSachThongBao,setDanhSachThongBao]=useState([])
    const [thongbaoID,setthongbaoID]=useState([])


    const DanhSach = () => {
        firestore()
        .collection('thongbaochung')
        .get()
        .then(querySnapshot => {
          console.log('Total thông báo: ', querySnapshot.size);
          const danhsachuduan = []
          querySnapshot.forEach(documentSnapshot => {
              console.log('Thông Báo: ', documentSnapshot.id, documentSnapshot.data());
                  if(documentSnapshot.id)
                  {
                      danhsachuduan.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                  })
                  setDanhSachThongBao(danhsachuduan)
                  setthongbaoID(documentSnapshot.id)
                  } 
      });
    });
    }

    const del = async() => {
        
            await firestore()
                  .collection('thongbaochung')
                  .doc(thongbaoID)
                  .delete()
                  .then(() => {
                      console.log('Notification is deleted!');
                      alert("Xóa dữ liệu thành công")
                      DanhSach()
                  });
          
    }
    const LamMoi = () =>{
        setDanhSachThongBao('')
        DanhSach()
    }
    return (
        <ScrollView>
            
        <View style={{ backgroundColor: "white", flex: 1}}>
        <TouchableOpacity onPress={LamMoi}><Text style={{fontSize: 15,color:'red',textAlign:'center'}}>Làm mới danh sách thông báo</Text></TouchableOpacity>
            <FlatList
            data={DanhSachThongBao}
            renderItem={({ item }) => (
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                        <Text style={{fontSize: 16,color:'green',borderBottomColor:'black',borderBottomWidth: StyleSheet.hairlineWidth}}> 
                            <Icon 
                                    name="bookmark-outline"
                                    color={'red'}
                                    size={20}
                                   
                            />{"Tiêu đề: "+item.title}  
                        </Text>
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={del}>
                        <Text style={{flexDirection:'row',alignItems:'center'}}>
                            <Icon 
                                    name="cog"
                                    color={'red'}
                                    size={20}
                            />                      
                        </Text>
                        </TouchableOpacity>                     
                        <TouchableOpacity onPress={()=>alert('Tiêu đề: ' +item.title +'\n'+
                                                           'Nội dung: '+item.body+'\n')}>
                            <Text>
                            <Icon 
                                    name="bell-alert-outline"
                                    color={'red'}
                                    size={20}
                                    
                            />
                            </Text>
                      </TouchableOpacity>
                      <Text></Text>
                      </View>
                    
                   
                </View>    
            )}
            numColumns={1}
        />
        
        </View>
        </ScrollView>
    )
}

