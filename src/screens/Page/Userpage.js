import React,{useState,useRef} from 'react'
import {View,StyleSheet,Text,Dimensions,Modal,
TextInput,TouchableOpacity,Image, KeyboardAvoidingView,FlatList,ActivityIndicator} from 'react-native'
import { useRoute } from '@react-navigation/native';
import {DrawerItem} from '@react-navigation/drawer'
import {Avatar,Drawer} from 'react-native-paper'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import CheckBox from 'react-native-check-box';
import { icons } from "../../../constants"
import {FunctionViewThongBao} from '../Function/Chung/functionViewThongBao';
import { NameScreen } from '../../../constants/NameScreen';
import { HeaderStyle,containerView,flatlistViewTitle,flatlistViewSupTitle,containerInput, ModalStyle } from '../../../constants/stylechung';
import { object } from '../../../constants/theme';
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore"
import Clipboard from '@react-native-clipboard/clipboard';
import { GetDevice } from '../Function/Chung/functionInfoDevice';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;

export default function UserScreen({navigation,route}) {
    
    const [taikhoan,settaikhoan]= useState("")
    const [mnv,setmnv]=useState("")
    const inputmnv=useRef(null)
    const [tennv,settennv]=useState("")
    const inputtennv=useRef(null)
    const [phone,setphone] = useState('')
    const inputphone=useRef(null)
    const [pw,setpw] = useState('')
    const [emailreceive,setemailreceive]=("")
    const [actionType,setactionType] = useState('')
    const [danhsachuser,setdanhsachuser]= useState([])
    const [danhsachuserfirebase,setdanhsachuserfirebase]= useState([])

    const [manhanvien,setmanhanvien] = useState('')
    const [tennhanvien,settennhanvien] = useState('')

    const [chucvu,setchucvu] = useState('')
    const [phongban,setphongban] = useState('')
    const [tencongty,settencongty] = useState('')
    const [anh,setanh] = useState(null)
   
    const [isDarkTheme,setIsDarkTheme]= React.useState(false);
    const [visible,setVisible]= useState(false);

    const [UserDel,setUserDel]= useState('');
    const [visibleXoaUser,setvisibleXoaUser]= useState(false);

    const [modalthongbao,setmodalthongbao] = useState(false)
    const [loaithongbao,setloaithongbao] = useState('')

    const [selectedItem,setSelectedItem] = useState("")

  
    const LaydulieuDemo = async() => {
        
        if(dulieudemo==false){
          setVisible(true)

          //Id thư mục lấy từ file JSON đối với tài khoản chưa đăng ký || nhấn nút xem dữ liệu Demo
          let idthumuc = await AsyncStorage.getItem("idthumuc")
          
          if(idthumuc!=null){
            let listfile = await _getAllMyAppFilesList_myFolder(idthumuc,"")
          
            for(let i = 0;i<listfile.length;i++){
              //Hàm đọc File JSON
              const fileContent = await getContentFile(listfile[i].id);
              if (fileContent) {
                if (listfile[i].name === "danhsachduan.json") {
                  console.log("danhsachduan: ",listfile[i]) 
                  AsyncStorage.setItem('fileduan',JSON.stringify(listfile[i]))
                } else if (listfile[i].name === "canhbaocongviec.json") {
                   console.log("canhbaocongviec: ",listfile[i])    
                  AsyncStorage.setItem('filecongviec',JSON.stringify(listfile[i]))
                } else if(listfile[i].name === "canhbaohopdong.json"){
                  console.log("canhbaohopdong: ",listfile[i])
                  AsyncStorage.setItem('filehopdong',JSON.stringify(listfile[i]))
                }
              }
            } 
            setdulieudemo(!dulieudemo)
            setVisible(false)       
            navigation.navigate(NameScreen.DuanDrive)
          }else{
            setVisible(false)
          }         
        }else{
          setloaithongbao("Datademo")
          setmodalthongbao(true)
          if(modalthongbao==false){ 
            navigation.navigate(NameScreen.DuanDrive)
          }
          
        }
        
    };

    const Dangxuat = ()=>{
      navigation.navigate(NameScreen.Login)
    }

    const LoadingAnimation=()=>{
              return (
                <View style={styles.indicatorWrapper}>
                      <ActivityIndicator size="large" style={styles.indicator} />
                      <Text style={styles.indicatorText}>Loading ...
                      </Text>   
                </View>
              );
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setDuLieu()
        });

    return () => {unsubscribe};
    //}, [route.name]);
    }, [navigation]);

    // Set dữ liệu ban đầu
    const setDuLieu = async()=>{

        setmanhanvien(route.params?.manv.toUpperCase())
        settennhanvien(route.params?.hoten.toUpperCase())

        //set ảnh:
        let imageurl = await AsyncStorage.getItem("imageurl")
        console.log("imageurl",imageurl)
        if(imageurl!=null){
          setanh(imageurl)
        }else{
          return null
        }
    }

    // Tải file lên Storage
    const UpToStorage = async()=>{
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
    
        // Read the file as base64 using RNFS
        //const fileData = await RNFS.readFile(res[0].uri, 'base64');
    
        // Upload the file to Firebase Storage
        await storage().ref('duongdan.json').putFile(res[0].uri);
    
        console.log('File uploaded successfully');
      } catch (error) {
        console.log('Error picking or uploading the file:', error);
      }
    }
    
    const getRandomPassword = () => {
      //const letters = '0123456789abcdefghjklmnopkrwxyz';
      const letters = '0123456789';
      let pw = "";
      for (let i = 0; i < 4; i++) {
        //pw += letters[Math.floor(Math.random() * 16)];
        pw += letters[Math.floor(Math.random() * 10)]; // Changed 16 to 10 to ensure random selection from 0-9
      }
      //if(UserDel!=''){
        //Clipboard.setString(`USERNAME: ${UserDel.toUpperCase()}, PASSWORD: ${pw}`)
      //}else{
        //Clipboard.setString(`TK: ${taikhoan.toUpperCase()} / MK: ${pw}`)
      //}
      console.log(`Mật khẩu: ${pw}`)  
      setpw(pw)    
      return pw;
    };
    
    //Chức nay đăng ký Tài Khoản vào firestore Database
    const dangkyFirebase = async()=>{
      
      //let foundMatch = false;

      //Đang xài giành cho chọn trong List: 09012024
      //let emailchoose = taikhoan.USERNAME.toUpperCase()

      //let emailchoose = taikhoan.toUpperCase()
      let emailchoose = mnv.toUpperCase()
      await firestore()
            .collection('token-user').doc(emailchoose)
            .set({
              'lastlogin':'',
              'hoten':tennv.trim(),
              'phone': phone,          
              'pw': pw,//getRandomPassword(),
              'token': '',
            })
            .then(() => {
              Clipboard.setString(`TK: ${mnv.toUpperCase()} / MK: ${pw}`)
              let Danhsachuserfirebase = []
              fetchDanhSachUserFirestore(Danhsachuserfirebase) 
              setmnv('') //mã nhân viên
              settennv('')
              setpw('') // password
              setphone('') //điện thoại    
              setSelectedItem('') 
              setVisible(false)
              //setloaithongbao('UserAdd')
              //setmodalthongbao(true)
              
            });
    }
   
    //Tìm user khi nhập vào TextInput và trả về tên đơn vị nếu tìm thấy
    const findUserInput = ()=>{
      let emailchoose = taikhoan.toUpperCase()
      for(let i=0;i<danhsachuser.length;i++){
        if(emailchoose==danhsachuser[i].USERNAME){  
          return danhsachuser[i].TENCONGTY
        }
      }
      
    }
 
    //Modal Thêm Tài Khoản
    const ViewModalThemUser = ()=>{

      const xettieude =()=>{
        if(actionType=='adduser'){
          return "Thêm người dùng"
        }else{
          return "Cập nhật thông tin"
        }
      }

      return(  
      <Modal visible={visible} animationType="fade" transparent={true}>
        <KeyboardAvoidingView behavior='position'>
          <View style={{...ModalStyle.Modal,marginTop:150}}>     
            <View style={{//borderColor:'#8B4513',borderWidth: 2
            backgroundColor:'white'}}>   
              
                <View style={{...HeaderStyle.hearderTrangBaoCaoDuAn,justifyContent:'center'}}>
                    <Text style={{...object.labelTitle}}>{xettieude()}</Text>
                </View>
                
                {/* Mã nhân viên */}
                <View style={{...containerInput.viewItem}}>
                  <Text style={{...containerInput.textLabel}}>Tài khoản:</Text>
               
                  {/*<DropDownList 
                    value={selectedItem}
                    data={danhsachuser}
                    onSelect={onSelect}
                  /> - Đang xài: 09012024*/}

                  {<TextInput 
                  ref={inputmnv}
                  style={{...containerInput.textLabel,width:windowWidth*0.68,paddingTop:-3}}
                  placeholder=""
                  value={mnv}
                  onChangeText={text => {setmnv(text)}}
                  onSubmitEditing={()=>{inputtennv.current.focus()}}
                  editable={actionType=="adduser"?true:false}
                  />}
                  {<Icon 
                      name="star"
                      size={15}
                      style={{position: 'absolute',top: -10,right: -5,color:'red',zIndex:1}}
                    />
                  }
                </View>

                {/* Họ tên */}
                <View style={{...containerInput.viewItem}}>
                  <Text style={{...containerInput.textLabel}}>Họ tên:</Text>
               
                  {<TextInput 
                  ref={inputtennv}
                  style={{...containerInput.textLabel, width:windowWidth*0.73,paddingTop:-3}}
                  placeholder=""
                  value={tennv}
                  onChangeText={text => {settennv(text)}}
                  onSubmitEditing={()=>{inputphone.current.focus()}}
                  />}
                  
                </View>

                {/* Số điện thoại */}
                <View style={{...containerInput.viewItem}}>
                {<Text style={{...containerInput.textLabel}}>Mã thiết bị:</Text>
                }
                <TextInput 
                ref={inputphone}
                style={{...containerInput.textLabel, width:windowWidth*0.65,paddingTop:-3}}
                //multiline={true}
                placeholder=""
                keyboardType="numeric"
                value={phone}
                onChangeText={text => {setphone(text)}}
                onSubmitEditing={()=>{
                  if(mnv.trim()!=""){
                    dangkyFirebase()
                  }else{
                    inputmnv.current.focus()
                  }
                }}
                />
                {/*<Icon 
                  name="star"
                  size={15}
                  style={{position: 'absolute',top: -10,right: -5,color:'red',zIndex:1}}
                />*/}
                </View>

                {/* Mã đăng ký */}
                <View style={{...containerInput.viewItem,alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={{...containerInput.textLabel}}>Mã đăng ký:   {pw}</Text>
                
            

                    <TouchableOpacity onPress={()=>{getRandomPassword()}}>
                      <Image
                        source={icons.resetpw} 
                        style={{height:23,width:23,tintColor:'black' ,marginTop:3,marginRight:5}}
                      />
                    </TouchableOpacity>
                  {/*<TextInput style={{...style1.text1,marginTop:-7,marginLeft:0, width:windowWidth*0.67}}
                  //multiline={true}
                  placeholder=""
                  value={pw}
                  onChangeText={text => {setpw(text)}}
                  editable={false}
                  />*/}
                  {/*<Icon 
                    name="star"
                    size={15}
                    style={{position: 'absolute',top: -10,right: -5,color:'red',zIndex:1}}
                  />*/}
                  
                </View>
                
                {/* Button */}
                <View style={{...containerInput.viewButton,marginBottom:15,marginTop:15}}>
                  <TouchableOpacity
                    style={{...containerInput.buttonCancle,marginLeft:10}}
                    onPress={() => {setVisible(false),setmnv(''),settennv(''),setSelectedItem(''),setpw(''),setphone('')}}
                  >
                    <Text style={{...containerInput.buttonText}}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{...containerInput.buttonOK,marginRight:10}}
                    onPress={() => { 
                      if(/*phone.trim()==''||token.trim()==''||*/mnv.trim()==''){
                        setloaithongbao('NodataInput')
                        setmodalthongbao(true)
                       //setSelectedItem('')
                      }else{
                        dangkyFirebase()
                      }
                    }}
                  >
                    <Text style={{...containerInput.buttonText}}>Cập nhật</Text>
                  </TouchableOpacity>
                </View>

            </View>
          {/*</ImageBackground>*/}
          
          
          </View>
        </KeyboardAvoidingView>
      </Modal>    
      )
    }

    // View Xoá hoặc reset mật khẩu
    const ViewActionType = ()=>{

      const xetTieude=()=>{
        if(actionType=="DELETE"){
          return "Xoá dữ liệu"
        }else if(actionType=="RESET"){
          return "Điều chỉnh"
        }
        //return "Xoá dữ liệu";
      }

      const xetNoidung=()=>{
        if(actionType=="DELETE"){
          return `Tài khoản:   ${UserDel} ?`
        }else if(actionType=="RESET"){
          return `Cấp mật khẩu mới cho tài khoản: ${UserDel} ?`
        }
      }
      
      return(  
      <Modal visible={visibleXoaUser} animationType="fade" transparent={true}>
        <KeyboardAvoidingView behavior='position'>
          <View style={{...ModalStyle.Modal,marginTop:270}}>     
            <View style={{//borderColor:'#8B4513',borderWidth: 2
            backgroundColor:'white'}}>   
              
                <View style={{...HeaderStyle.hearderTrangBaoCaoDuAn,justifyContent:'center'}}>
                    <Text style={{...object.labelTitle}}>{xetTieude()}</Text>
                </View>

                <View style={{alignItems:'center'}}>
                  <Text style={{...containerInput.textLabel}}>{xetNoidung()}</Text>
                </View>
                {/* Button */}
                <View style={{...containerInput.viewButton,marginTop:15,marginBottom:15}}>
                  <TouchableOpacity
                    style={{...containerInput.buttonCancle,marginLeft:15}}
                    onPress={() => {setvisibleXoaUser(false)}}
                  >
                    <Text style={{...containerInput.buttonText}}>Huỷ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{...containerInput.buttonOK,marginRight:15}}
                    onPress={() => { 
                      if(actionType=="DELETE"){
                        del()
                      }else if(actionType=="RESET"){
                        reset()
                      }
                      setvisibleXoaUser(false) 
                    }}
                  >
                    <Text style={{...containerInput.buttonText}}>Cập nhật</Text>
                  </TouchableOpacity>
                </View>

            </View>
          {/*</ImageBackground>*/}
          
          
          </View>
        </KeyboardAvoidingView>
      </Modal>    
      )
    }

    //Chức năng chọn Tài khoản từ danhsachuser
    const onSelect = (item) => {
      setSelectedItem(item)
      settaikhoan(item)
    }
    
    //Xoá user trong list token-user trong firestore
    const del=()=>{
      firestore().collection('token-user').doc(UserDel).delete().then(()=>{
        let Danhsachuserfirebase = []
        fetchDanhSachUserFirestore(Danhsachuserfirebase)
        setUserDel('')
      })
    }

    //Reset mật khẩu user trong list token-user trong firestore
    const reset=()=>{
      firestore().collection('token-user').doc(UserDel).update({
        'pw': getRandomPassword(),
        'newpw':''
      }).then(()=>{
        //sendmail()  
        let Danhsachuserfirebase = []
        fetchDanhSachUserFirestore(Danhsachuserfirebase)
        setUserDel('')
      })
    }

    //Function lấy danh sách user trong firestore
    const fetchDanhSachUserFirestore = async(Danhsachuserfirebase)=>{
      await firestore().collection('token-user').get().then(querySnapshot =>{
        
        querySnapshot.forEach(documentSnapshot => {
          //console.log('data: ',documentSnapshot.data())      
          if(documentSnapshot.id!="ADMIN"){
            Danhsachuserfirebase.push({
              id: documentSnapshot.id,
              hoten: documentSnapshot.data().hoten,
              phone: documentSnapshot.data().phone,
              pw: documentSnapshot.data().pw
            })  
          }    
        });
        console.log('Danh sách tài khoản Firebase: ',Danhsachuserfirebase)
        setdanhsachuserfirebase(Danhsachuserfirebase)
      })
    }


    const MarginTopByDevice =()=>{
      let device = GetDevice()
      // Kiểm tra nếu model là từ iPhone X trở lên
      if (device.includes('X') || device.includes('11') || device.includes('12') || device.includes('13')|| device.includes('14')|| device.includes('15')) {
         return ({
              marginTop:30
         })
      } else {
          return ({
              marginTop:0
          })
      }
    }

    const checkquanly=()=>{
      if(taikhoan!=null&&taikhoan.isquanly==true){
        return (
          <View style={{flexDirection:'row'}}>
            <Text style={{fontSize: 15,color:'#4F4F4F',paddingTop:5}}>Quyền quản lý:</Text>
            <CheckBox
                  isChecked={taikhoan.isquanly}
                  disabled ={false}
                  onClick={()=>{}}
                  style={{ fontSize: 15,marginLeft: 20,paddingTop:3}}
            />
          </View>
        )
      }
    }

    const styles = StyleSheet.create({
      indicatorWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      indicator: {},
      indicatorText: {
        fontSize: 18,
        marginTop: 0,
        color: 'black'
      },
      userInfoSection:{
          paddingLeft: 5,
      },
      title:{
          fontSize:15,
          marginTop: 0,
          fontWeight:'normal',
          //color:'#A9A9A9',
          //fontWeight:'bold',
          marginLeft: 5
      },
      caption:{
          fontSize: 15,
          fontWeight:'100',
          //color:'#A9A9A9',
          lineHeight:14,
          marginLeft: 5,
        
      },
      row:{
          marginTop: 20,
          flexDirection:'row',
          alignItems: 'center',
      },
      section:{
          flexDirection:'row',
          alignItems:'center',
          marginRight: 15,
          
      },
      paragraph:{
          fontWeight:'bold',
          marginRight:3,
      },
      
      drawerContent:{
        //flex:0.9,  
        //height: windowHeight*0.28
      },
      bottomDrawerSection:{
          borderTopColor:'#f4f4f4',
          borderTopWidth: 1,   
          //marginBottom:-5
      },
      
      drawSection:{
        //height:'25%',
        marginTop:-13,
        marginLeft: 0,
        fontSize:15,
       
      },
      preference:{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingVertical: 12,
          paddingHorizontal: 16,
      },
      card: {
          flex:1,
          width: windowWidth*0.95,
          height: 100,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          //alignItems:'center',
          //justifyContent: 'center',
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 5,
          margin: 7,
          marginLeft:10,
      },
      cardTop: {
          //flex:1,
          width: windowWidth*0.98,
          //height: windowHeight*0.29,
          backgroundColor: 'white',
          borderWidth: 1,
          //borderColor: 'black',
          borderRadius: 5,
          //alignItems:'center',
          //justifyContent: 'center',
          //shadowColor: 'black',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 5,
          margin: 5,
          marginLeft:5,
          //height: taikhoan.isquanly==true?'38.6%':'32.4%'
      },
  
      cardFlatList: {
          //flex:1,
          width: windowWidth*0.95,
          //height: windowHeight*0.59,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 5,
          //alignItems:'center',
          //justifyContent: 'center',
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 5,
          //margin: 3,
          //marginTop:-20,
          //marginTop:0,
          marginLeft:10,
      },
  
      cardText: {
          fontSize: 18,
      },
    });

    //Chức năng chọn ảnh đại diện
    const selectImage = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        console.log(res[0].uri)
        setanh(res[0].uri);
        AsyncStorage.setItem("imageurl",res[0].uri)
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker');
        } else {
          console.log('Error: ', err);
        }
      }
    };

    return (
        
            <View style={{height:'100%',backgroundColor:'white'}}>
              <SafeAreaView>  
                {/* View Thông tin */}
                <View style={{...styles.cardTop,marginTop:MarginTopByDevice(),marginTop:10}} keyboardShouldPersistTaps="handled">

                        {/* View Ảnh */}
                        <View style={{flexDirection:'row',paddingTop: 10,paddingLeft:10}}>
                            {anh==null? 
                            (
                            <TouchableOpacity onPress={()=>{selectImage()}}>
                              <Avatar.Image
                                source={icons.user_button}
                                size={40}
                                style={{
                                  backgroundColor:'white',
                                  tintColor: 'black'
                              }}   
                              />
                            </TouchableOpacity>
                            ):(
                            <TouchableOpacity onPress={()=>{selectImage()}}>
                              <Avatar.Image
                                source={{uri: anh}} 
                                size={40}     
                              />
                            </TouchableOpacity>)} 
                            <View style={{marginLeft:10,marginTop:-5}}>
                                  <Text style={{fontSize: 15,width:windowWidth*0.87,marginLeft:5,color:'#4F4F4F'}}>Tài khoản: {manhanvien}</Text>
                                  <Text style={{fontSize: 15,width:windowWidth*0.87,marginLeft:5,color:'#4F4F4F'}}>Họ tên: {tennhanvien}</Text>
                            </View>
                            
                        </View>
                        
                        {/*#region"Thông tin chức vụ, phòng ban, đơn vị"
                        {/* View Text Chức vụ, phòng ban ...
                        <View style={{paddingLeft: 10,paddingBottom:10,paddingTop:5}}>
                          <Text style={{fontSize: 15,color:'#4F4F4F',paddingTop:5}}>Chức vụ: {chucvu}</Text>
                          <Text style={{fontSize: 15,color:'#4F4F4F',paddingTop:5}}>Phòng ban: {phongban}</Text>
                          <Text style={{fontSize: 15,color:'#4F4F4F',paddingTop:5}}>Đơn vị: {tencongty}</Text>
                          {checkquanly()}
                          
                        </View> 
                        #endregion*/}

                        {/*"Nút đăng ký tài khoản"*/}
                        {/* View 3 Button
                        {manhanvien=="ADMIN"||manhanvien=="NGHIA-IOS"||manhanvien=="NGHIA"?
                        <TouchableOpacity onPress={()=>{setVisible(true),getRandomPassword(),setactionType('adduser')}}
                        style={{flexDirection:'row',padding:7,borderTopColor:'#f4f4f4',
                        borderTopWidth: 1,}}>
                              <Image source={icons.device}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: 'black' }}
                              />
                              <Text style={{fontSize: 15,color:'#4F4F4F',marginLeft:15}}>Đăng ký người dùng</Text>
                        </TouchableOpacity>:null*/}
                   
                        
                        {/*<TouchableOpacity onPress={()=>{LaydulieuDemo()}}
                          style={{flexDirection:'row',padding:7, borderTopColor:'#f4f4f4',
                          borderTopWidth: 1}}
                        >
                              <Image source={icons.tailieu}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: 'black' }}
                              />
                              <Text style={{fontSize: 15,color:'#4F4F4F',marginLeft:15}}>Xem dữ liệu</Text>
                        </TouchableOpacity>*/}

                        <TouchableOpacity onPress={()=>{ Dangxuat() }}
                        style={{flexDirection:'row',padding:7,borderTopColor:'#f4f4f4',
                        borderTopWidth: 1, paddingLeft:10}}>
                              <Image source={icons.exit}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: 'black' }}
                              />
                              <Text style={{fontSize: 15,color:'#4F4F4F',marginLeft:13}}>Đăng xuất</Text>
                        </TouchableOpacity>
                        
                        {/*"Drawer.Section"*/}
                        {/*<Drawer.Section style={{...styles.bottomDrawerSection}}>
                          {manhanvien=="ADMIN"||manhanvien=="NGHIA-IOS"||manhanvien=="NGHIA"?
                            <DrawerItem 
                              icon={({color,size})=> (
                                <Image source={icons.device}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: 'black' }}/>
                                  
                              )}
                              label="Đăng ký người dùng"
                              style={{...styles.drawSection,paddingTop:10}}
                              onPress={()=>{setVisible(true),getRandomPassword()}}
                            />:null}
                            
                            <DrawerItem 
                              icon={({color,size})=> (
                                <Image source={icons.huongdan}
                                resizeMode='contain'
                                style={{ width: 25, height: 25, tintColor: 'black' }}/>
                              )}
                              label="Tài liệu hướng dẫn"
                              onPress={()=>{Linking.openURL('https://dong-tay.com/helpdesk/')}}
                            />

                            <DrawerItem 
                                icon={({color,size})=> (
                                    <Image 
                                      source={icons.support}
                                      resizeMode='contain'
                                      style={{ width: 25, height: 25, tintColor: 'black' }}/>
                                    
                                )}
                                label="Trung tâm hỗ trợ"
                                style={{...styles.drawSection,paddingTop:5}}
                                onPress={()=>{Linking.openURL('https://t.me/qldadongtay')}}
                            />

                            <DrawerItem 
                                icon={({color,size})=> (
                                  <Image source={icons.exit}
                                  resizeMode='contain'
                                  style={{ width: 23, height: 23, tintColor: 'black'}}/>
                                    
                                )}
                                label="Đăng xuất"
                                style={{...styles.drawSection,paddingTop:5,marginBottom:-10,paddingLeft:3}}
                                onPress={()=>{ navigation.navigate(NameScreen.Login) }}
                            />
                        </Drawer.Section>*/}

                </View>

                  {/*"View Danh sách tài khoản"*/}
                  {/*(manhanvien == "ADMIN"||manhanvien=="NGHIA"||manhanvien=="NGHIA-IOS")&&(visible==false)?
                  <View style={{...containerView(chucnang,danhsachuserfirebase),marginTop:5}}>

                      <View style={{...flatlistViewTitle}}>
                          <Text style={{...object.labelTitle}}>Danh sách người dùng</Text>
                      </View>

                      <View style={{...flatlistViewSupTitle}}>
                          <Text style={{paddingLeft:5,color:'white',fontSize:15}}>Tài khoản</Text> 
                          <Text style={{paddingRight:5,color:'white',fontSize:15}}>Họ tên</Text>
                      </View>
                    
                      <FlatList 
                      data={danhsachuserfirebase}
                      keyExtractor={(item, index) => item.id + index.toString()}
                      renderItem={({ item }) => (
                        
                          <TouchableOpacity style={{flexDirection:'row',padding:5,justifyContent:'space-between',borderBottomWidth:0.5,height:40,alignItems:'center'}}
                            onPress={()=>{setVisible(true),setactionType('updateuser'),setmnv(item.id),settennv(item.hoten),setphone(item.phone),setpw(item.pw)}}
                          >
                            
                            <Text style={{paddingLeft:5,color:'black',width:'50%'}}>{item.id}</Text>

                            <View style={{flexDirection:'row'}}>

                              <Text style={{color:'black',textAlign:'right',paddingRight:15}}>{item.hoten}</Text>

                              <TouchableOpacity onPress={()=>{setvisibleXoaUser(true),setUserDel(item.id),setactionType('DELETE')}}>
                                <Image
                                  style={{height:20,width:20,tintColor:'red',marginLeft:5}}
                                  source={icons.del} 
                                />
                              </TouchableOpacity> 
                            </View>
                            
                            
                          </TouchableOpacity>
                        
                      )}

                      />
                    
                  </View>:null*/}
            
                  {/*visible ? ViewModalThemUser():null*/}
                  {/*visibleXoaUser?ViewActionType():null*/}
                  {visible==true?<LoadingAnimation />:null}
                  {modalthongbao == true ? (FunctionViewThongBao(loaithongbao,modalthongbao,setmodalthongbao,setVisible)) : null}
              </SafeAreaView>
            </View>
        
    )
}

