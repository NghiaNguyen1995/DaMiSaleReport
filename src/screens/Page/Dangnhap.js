import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect,useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,Keyboard,TextInput,
  Dimensions,Platform , Linking, KeyboardAvoidingView , ImageBackground  , ActivityIndicator, 
  TouchableWithoutFeedback
} from 'react-native';
import firestore from "@react-native-firebase/firestore";
import filter from 'lodash.filter';
import messaging from '@react-native-firebase/messaging'
import { icons, COLORS, FONTS } from '../../../constants';
import { Alert } from 'react-native';
import { FunctionViewThongBao } from '../Function/Chung/functionViewThongBao';
import { NameScreen } from '../../../constants/NameScreen';
import { buttonStyle, containerInput } from '../../../constants/stylechung';

import { _getAllMyAppFilesList_FolderShare, _getAllMyAppFilesList_myFolder, createFolderDrive, createJsonFile, getContentFile, getSharedParentFolder } from '../../Function/GoogleDrive/GetListFileGGDrive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetLogin } from '../../api/SalesManager';
import { ViewLoadingAnimation } from '../Function/fViewLoading';
import { pick, types } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import { getBaseURL } from '../../api/ApiManager';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SIGN_IN = 'SIGN_IN'

export default function Login({ navigation }) {
    const [Token, setToken] = useState('')
    const [page, setPage] = useState(SIGN_IN);

    const [tencongty,settencongty]=useState()
    const [visibleLoadData,setvisibleLoadData]=useState(false)

    useEffect(() => {
        RequestUserPermission()
        CheckApplicationPermission()
        Getappcaption()
        GetthongbaoFirebase()
    }, []);
   
    //Yêu cầu quyền thiết bị để lấy Token trong IOS
    async function RequestUserPermission() {
      const authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus) {
       
        return getToken()
      }
    }

    async function CheckApplicationPermission() {
      const authorizationStatus = await messaging().requestPermission();

      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        
        return getToken()
      } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        
        return getToken()
      } else {
        return null
       
      }
    }

    //Lấy token từ Firebase. Lưu token thiết bị vào firebase nếu Token chưa tồn tại và sau đó dùng Token để nhận thông báo
    const getToken = async() => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');       
        if (fcmToken==null) {

          fcmToken = await messaging().getToken()
          AsyncStorage.setItem('fcmToken',fcmToken)
         
          setToken(fcmToken)
         
          // add token-device vào token-group để nhận thông báo chung
          if(fcmToken!=null) {

            await AsyncStorage.setItem('fcmToken',fcmToken)
            firestore().collection('token-group').add({
              token: fcmToken
            })

          }
        }else{
          setToken(fcmToken)
          //console.log('Token từ function AsyncStorage.getItem(fcmToken): ',fcmToken)
          AsyncStorage.setItem('fcmToken',fcmToken)
        }
    } 

    //Lấy tên App
    const Getappcaption=async()=>{
      //AsyncStorage.removeItem('user');
      
      //const filePath = require('../../../package.json');
      //settencongty(filePath.appcaption)
      
      let user = JSON.parse(await AsyncStorage.getItem('user'));
      
      if(user){
        settencongty(user.CompanyName)
      }else{
        const filePath = require('../../../package.json');
        settencongty(filePath.appcaption)
      }
    }

    //Lấy thông báo từ Firebase.
    const GetthongbaoFirebase=async()=>{

      // when the application is opened from a quite state
      await messaging().getInitialNotification().then((remoteMessage) => {
        if (remoteMessage) {
          var title = remoteMessage.notification.title;
          var body = remoteMessage.notification.body
          Alert.alert(`${title}`, `${body}`)
        }
        else {
          return null
        }
      });

      // foreground state message
      messaging().onMessage((remoteMessage) => {
        if (remoteMessage) {
          let notification = null;
          if (Platform.OS === 'ios') {
            notification = remoteMessage.data.notification;
          } else {
            var title = remoteMessage.notification.title;
            var body = remoteMessage.notification.body
            Alert.alert(`${title}`, `${body}`)
          }

        }
      }); 
    }

    const date = new Date()

    const Title = ({ page, setPage }) => {

      const [urlImage, setUrlImage] = useState('');

      async function fGetImage(){
        let url = await AsyncStorage.getItem('urlImage')
        if(url!=null && url!='')
        {
          setUrlImage(url)
        }
      }

      async function fSetImage() {
        try {
          const results = await pick({
            types: [types.images],
            allowMultiSelection: false,
            copyToCacheDirectory: false,
          });

          const res = results[0];

          if (!res || !res.uri) {
            console.log('Không chọn ảnh nào');
            return;
          }

          // Lấy extension file
          const ext = res.name?.split('.').pop() || 'jpg';
          const destPath = `${RNFS.CachesDirectoryPath}/${Date.now()}.${ext}`;

          // Copy từ content:// sang cache folder
          await RNFS.copyFile(res.uri, destPath);

          const fileUri = `file://${destPath}`;
          console.log('Copied file to:', fileUri);

          setUrlImage(fileUri);
          await AsyncStorage.setItem('urlImage', fileUri);
        } catch (err) {
          console.error('Error picking image:', err);
        }
      }


      useEffect(() => {
          fGetImage()  
      },[navigation]);

        return (
          <View style={{ flex: 1}}>
            <StatusBar barStyle='light-content' />
            <View style={{ width: '100%', height: '100%',alignItems: 'center', justifyContent: 'center',alignSelf:'center',marginTop:15}}>
                  <TouchableOpacity onPress={()=>{fSetImage()}}>
                    <Image  source={urlImage ? { uri: urlImage } : icons.logoDami}
                            style={{ width: 280, height: 150 }} />
                  </TouchableOpacity>
                  
                  <Text style={{ color: COLORS.app.title, fontSize: 25, fontWeight: 'bold', fontFamily: 'Roboto-Bold',marginTop:20 }}>{tencongty}</Text>
                  <Text style={{ color: "black", fontSize: 20, fontFamily: 'Roboto-Bold',marginTop:20,alignContent:"center" }}>Quản lý Bán hàng trên Mobile</Text>                           
            </View>
          </View>
        )
    }
    
    const Body = () => {

        const [manv, setmanv] = useState('');      
        const [pw,setpw] = useState('')
        const [seePassword, setSeePassword] = useState(true);
        const [modalthongbao,setmodalthongbao] = useState(false)
        const [loaithongbao,setloaithongbao] = useState('')
        const [visileLoad,setvisileLoad]= useState(false)
        
        useEffect(() => { 
            fGetRememberTaikhoan()
        },[navigation]);

      
        function fLoginByPassWord(){
          
          setvisileLoad(true)
          
          if(manv == '' && pw == ''){
                setloaithongbao("NoUsernamePasswordInput")
                setmodalthongbao(true)
                return setvisileLoad(false)
          }else if(manv ==''){
                setloaithongbao("NoUsernameInput")
                setmodalthongbao(true)
                return setvisileLoad(false)
          }else if(pw == ''){
                setloaithongbao("NoPassInput")
                setmodalthongbao(true)
                return setvisileLoad(false)
          }else{
              fGetLoginAPI()
          }
        }

        async function fGetLoginAPI() {

          await GetLogin(manv,pw,setvisileLoad).then((data)=>{
            console.log('Data trả về sau đăng nhập: ',data.data.ObjectData);
            if (data.status == 200) {
                let user = data.data.ObjectData;

                if (user && typeof user === 'object') {
                    user.ID = manv.toUpperCase();  
                    user.Password = pw;  
                    console.log('Có ObjectData: ', user);
                    AsyncStorage.setItem('user', JSON.stringify(user));
                    navigation.navigate(NameScreen.TrangChu, user);
                } else {
                    console.log('Không Có ObjectData');
                    const defaultUser = {
                        'ID': manv.toUpperCase(),
                        'UserName': manv.toUpperCase(),
                        'CompanyName': manv.toUpperCase(),
                        'Password': pw
                    };
                    AsyncStorage.setItem('user', JSON.stringify(defaultUser));
                    navigation.navigate(NameScreen.TrangChu, defaultUser);
                }
            }else{
                if(data.status==401){
                    setloaithongbao('ErrorPassword');
                    setmodalthongbao(true);
                }else if(data.status==500){
                    setloaithongbao('NoRegistAccount');
                    setmodalthongbao(true);
                }
 
            }
          })
           
        }
       
        async function fGetRememberTaikhoan(){
            let usrRemember = JSON.parse(await AsyncStorage.getItem('user'))
            if(manv!=null && pw!=null){
                setmanv(usrRemember.ID)
                setpw(usrRemember.Password)
            }
        }

        return (

          <View style={{...containerInput.ctnInput,height:'100%',marginTop:50,alignItems:'center'}}>
            
            
            <View style={{ ...containerInput.viewItem,width:'90%',height:50}}> 
                <TextInput
                  style={{ ...containerInput.textLabel, width: windowWidth * 0.85 }}
                  placeholder="Tài khoản"
                  value={manv}
                  autoCapitalize='characters'
                  keyboardType='default'
                  onChangeText={text => { setmanv(text)}}
                />
            </View>
          
            <View style={{ ...containerInput.viewItem,marginTop:20,width:'90%',height:50}}>
                <TextInput
                  style={{ ...containerInput.textLabel, width: windowWidth * 0.75 }}
                  placeholder="Mật khẩu"
                  value={pw}
                  keyboardType='default'
                  secureTextEntry={seePassword}
                  onChangeText={text => { setpw(text)}}
                  onSubmitEditing={()=>{
                      if(manv!=''){
                        fLoginByPassWord()
                      }
                  }}  
                />
                <TouchableOpacity
                  style={{ ...styles.wrapperIcon }}
                  onPress={() => setSeePassword(!seePassword)}>
                  <Image source={seePassword ? icons.eye : icons.eye_no} style={styles.icon} />
                </TouchableOpacity>

            </View>
            
            <View style={{...buttonStyle.viewButton,paddingTop:windowHeight/60}}>   
                <TouchableOpacity 
                    style={{...buttonStyle.buttonOK, width:windowWidth*0.85,flexDirection:"row",alignItems:'center'}} 
                    onPress={() => { fLoginByPassWord() }} 
                    disabled={visileLoad}> 
                  <Text style={{...buttonStyle.buttonText}}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            {modalthongbao==true? FunctionViewThongBao(loaithongbao,modalthongbao,setmodalthongbao,''):null}
            {visileLoad?<ViewLoadingAnimation/>:null}
          </View>
          
        );
    }
   
    const Footer = () => {

        return (

          <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
        
            <TouchableOpacity disabled={visibleLoadData} onPress={() => { navigation.navigate(NameScreen.Regist)}} style={{ ...styles.box }}>
              <Image source={icons.user_dangky}
                resizeMode='contain'
                
                style={{ width: 0.1 * (windowWidth - 60), height: 30, tintColor: 'white' }}
              /><Text style={{ color: 'white' }}>Đăng ký</Text>
            </TouchableOpacity>
            
            {/*<TouchableOpacity disabled={visibleLoadData} onPress={() => { Linking.openURL('https://www.youtube.com/watch?v=5zlECMmQpqI') }} style={{ ...styles.box }}>
              <Image source={icons.huongdan}
                resizeMode='contain'
                
                style={{ width: 0.1 * (windowWidth - 60), height: 30, marginLeft: 18, tintColor: 'white' }}
              /><Text style={{ color: 'white' }}>Hướng dẫn</Text>
            </TouchableOpacity>*/}

            <TouchableOpacity disabled={visibleLoadData} onPress={() => {navigation.navigate(NameScreen.Dangkyurl)}} style={styles.box}>
              <Image source={icons.website}
                resizeMode='contain'
                style={{ width: 0.1 * (windowWidth - 60), height: 30, tintColor: 'white',alignContent:'center' }}
              />
              <Text style={{ color: 'white' }}>Đăng ký URL</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={visibleLoadData} onPress={() => {/*testSo()*/Linking.openURL('https://damivn.com/lien-he/')}} style={{ ...styles.box }}>
              <Image source={icons.support}
                resizeMode='contain'
                style={{ width: 0.1 * (windowWidth - 60), height: 30, tintColor: 'white' }}
              />
              <Text style={{ color: 'white' }}>Hỗ trợ</Text>
            </TouchableOpacity>

          </View>

        )
    }

    //Ẩn bàn phím khi nhấn bất kỳ điểm nào trên View
    const DismissKeyboard =({children})=> (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
          {children}
      </TouchableWithoutFeedback>
    );

    return ( 
      <DismissKeyboard>
          <KeyboardAvoidingView 
              style={{ flex: 1, backgroundColor: 'white' }} 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200} // Điều chỉnh offset tùy thuộc vào kích thước của bàn phím
          >
            
              <View style={{ height: '100%', width: '100%', flex: 1}}>
                <ImageBackground source={date.getMonth()+1 == 1 ?icons.backgroundtet:icons.backgroundchuan}
                  resizeMode='stretch' style={{ flex: 0 }}>
                      <SafeAreaView>
                          <View style={{ height: '25%', width: '100%'}}>
                            <Title page={page} setPage={setPage} />
                          </View>
                          
                          <View style={{ height: '65%', width: '100%'}}>   
                              <Body />
                          </View>
                        
                          <View style={{ height: '10%'}}>   
                              <Footer />
                          </View>
                          
                      </SafeAreaView>
                </ImageBackground>
              </View>
          </KeyboardAvoidingView>
      </DismissKeyboard>
      
    );
  
  }

  const styles = StyleSheet.create({
    indicatorWrapper: {
      marginTop:-40,
      flex: 0,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    indicator: {},
    indicatorText: {
      fontSize: 18,
      marginTop: 0,
      color: 'black'
    },
    container: {
      flex: 1,
      //  justifyContent: 'center',
      marginHorizontal: 20,
      marginTop: 25,
    
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'flex-end', // Đảm bảo footer luôn nằm ở dưới cùng
    },
    wrapperInput: {
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: 'grey',
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      //marginLeft:90,
      //color:COLORS.dialogTitle,
      //fontSize:20,
      //marginRight:20
      fontSize: 15, width: windowWidth * 0.75,
      color: 'gray'
    },
    wrapperIcon: {
      position: 'absolute',
      right: 0,
      padding: 10,
    },
    icon: {
      width: 30,
      height: 24,
    },
    button: {
      //padding: 12,
      height:48,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.app.buttonLogin,
      borderRadius: 5,
      marginTop: 40,
      width: windowWidth * 0.75
    },
    button1: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.dialogTitle,
      borderRadius: 20,
      marginTop: 5,
      width: windowWidth * 0.3
    },
    buttonDisable: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'gray',
      borderRadius: 5,
      marginTop: 25,
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20
    },
    textFailed: {
      alignSelf: 'flex-end',
      marginRight: 35,
      marginTop: 10
      //color: 'red',
    },
    box: {
      paddingLeft: 25,
      paddingRight: 20,
      paddingTop: 6,
      alignItems:'center'
    }
  });

