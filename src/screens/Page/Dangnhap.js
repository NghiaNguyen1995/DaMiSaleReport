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
import RNFS from 'react-native-fs';
import { icons, COLORS, FONTS } from '../../../constants';
import { Alert } from 'react-native';
import { FunctionViewThongBao } from '../Function/Chung/fViewThongBao';
import { NameScreen } from '../../../constants/NameScreen';
import { buttonStyle, containerInput, ModalStyle } from '../../../constants/stylechung';
import { _getAllMyAppFilesList_FolderShare, _getAllMyAppFilesList_myFolder } from '../../Function/GoogleDrive/GetListFileGGDrive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetLogin, ResetPassword } from '../../api/SalesManager';
import { ViewLoadingAnimation } from '../Function/fViewLoading';
import { pick, types } from '@react-native-documents/picker';
import { Modal } from 'react-native-paper';
import { clsFunc } from '../Function/Chung/fSupport';
import { clsSignalRService } from '../Function/Chung/fSignalRService';
import { clsPushNotification } from '../Function/Chung/fPushNotificationLocal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Login({ navigation }) {
    const [Token, setToken] = useState('')

    const [tencongty,settencongty]=useState()
    
    const [showTitle, setShowTitle] = useState(false);
    const [showBody, setShowBody] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    const [sUsername,setsUsername]=useState('')
    const [sPassword,setsPassword]=useState('')
    const [mViewDoiMatKhau,setmViewDoiMatKhau]=useState(false);
    
    const [modalthongbao,setmodalthongbao] = useState(false);
    const [loaithongbao,setloaithongbao] = useState('');

    const [visileLoad,setvisileLoad]= useState(false);

    useEffect(() => {

        //Platform.OS==='ios'?null:RequestUserPermission()
        //Platform.OS==='ios'?null:CheckApplicationPermission()
        //Platform.OS==='ios'?null: GetthongbaoFirebase()

        Getappcaption()

        const t1 = setTimeout(() => setShowTitle(true), 100);
        const t2 = setTimeout(() => setShowBody(true), 200);
        const t3 = setTimeout(() => setShowFooter(true), 300);

        clsPushNotification.configureNotification({navigation});   
        clsSignalRService.startConnection();

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        }
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

    const Title = () => {

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
                            style={{ marginTop: 10,width: 260, height: 130 }} />
                  </TouchableOpacity>
                  
                  <Text style={{ color: COLORS.app.title, fontSize: 25, fontWeight: 'bold', fontFamily: 'Roboto-Bold',marginTop:20 }}>{tencongty}</Text>
                  <Text style={{ color: "black", fontSize: 20, fontFamily: 'Roboto-Bold',marginTop:20,alignContent:"center" }}>Quản lý Bán hàng trên Mobile</Text>                           
            </View>
          </View>
        )
    }
    
    const Body = ({setsUsername,setsPassword}) => {

        const [manv, setmanv] = useState('');      
        const [pw,setpw] = useState('');

        const [seePassword, setSeePassword] = useState(true);

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
                    fSetStorageUserPass(user);
                    navigation.navigate(NameScreen.TrangChu, user);
                } else {
                    const defaultUser = {
                        'ID': manv.toUpperCase(),
                        'UserName': manv.toUpperCase(),
                        'CompanyName': manv.toUpperCase(),
                        'Password': pw
                    };
                    fSetStorageUserPass(defaultUser);
                    navigation.navigate(NameScreen.TrangChu, defaultUser);
                }
            }else{
                if(data.status==401){
                    setloaithongbao('ErrorPassword');
                    clsFunc.fSetTimeToOpenModalThongBao(setmodalthongbao,true);
                }else if(data.status==500){
                    setloaithongbao('NoRegistAccount');
                    clsFunc.fSetTimeToOpenModalThongBao(setmodalthongbao,true);  
                }
 
            }
          })
           
        }

        async function fSetStorageUserPass(user){
          setsUsername(manv.toUpperCase());
          setsPassword(pw);
          await AsyncStorage.setItem('user', JSON.stringify(user));
        }
       
        async function fGetRememberTaikhoan(){
            let usrRemember = JSON.parse(await AsyncStorage.getItem('user'))
            if(manv!=null && pw!=null){

                //Biến bên trong Component
                setmanv(usrRemember.ID);
                setpw(usrRemember.Password);

                //Biến bên ngoài truyền vào Component Body
                setsUsername(usrRemember.ID);
                setsPassword(usrRemember.Password);
            }
        }

        return (
       
          <View style={{...containerInput.ctnInput,height:'100%',marginTop:50,alignItems:'center'}}>
            
              
            <View style={{ ...containerInput.viewItem,width:'90%',height:50}}> 
                <TextInput
                  style={{ ...containerInput.textLabel, width: windowWidth * 0.85 }}
                  placeholder="Nhập tài khoản"
                  placeholderTextColor={COLORS.black}
                  value={manv}
                  autoCapitalize='characters'
                  keyboardType='default'
                  onChangeText={text => { setmanv(text)}}
                />
            </View>
          
            <View style={{ ...containerInput.viewItem,marginTop:20,width:'90%',height:50}}>
                <TextInput
                  style={{ ...containerInput.textLabel, width: windowWidth * 0.75 }}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={COLORS.black}
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

          </View>

        );
    }
   
    const Footer = () => {

        return (

          <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
        
            <TouchableOpacity disabled={false} onPress={() => { 
                //navigation.navigate(NameScreen.Regist) 
                setmViewDoiMatKhau(true);
              }} style={{ ...styles.box }}>
              <Image source={icons.user_dangky}
                resizeMode='contain'
                
                style={{ width: 0.1 * (windowWidth - 60), height: 30, tintColor: 'white' }}
              /><Text style={{ color: 'white',textAlign:'center' }}>Mật khẩu</Text>
            </TouchableOpacity>
       
            <TouchableOpacity disabled={false} onPress={() => {navigation.navigate(NameScreen.Dangkyurl)}} style={styles.box}>
              <Image source={icons.website}
                resizeMode='contain'
                style={{ width: 0.1 * (windowWidth - 60), height: 30, tintColor: 'white',alignContent:'center' }}
              />
              <Text style={{ color: 'white' }}>Đăng ký URL</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={false} onPress={() => {/*testSo()*/Linking.openURL('https://damivn.com/lien-he/')}} style={{ ...styles.box }}>
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
      </TouchableWithoutFeedback>
    );

    const ViewDoiMatKhau = ({ sUsername, sPassword, mViewDoiMatKhau, setmViewDoiMatKhau }) => {
            const [msUser, setmsUser] = useState(sUsername);
            const [msPass, setmsPass] = useState(sPassword);
            const [msPassNew, setmsPassNew] = useState('');

            useEffect(() => {
              setmsUser(sUsername);
              setmsPass(sPassword);
            }, [sUsername, sPassword]);

            function fResetPassword(){
                if(msUser == '' && msPass == '' && msPassNew==''){
                    setloaithongbao("NoUsernamePasswordInput");
                    setmodalthongbao(true);
                    return setvisileLoad(false);
                }else if(msUser ==''){
                    setloaithongbao("NoUsernameInput");
                    setmodalthongbao(true);
                    return setvisileLoad(false);
                }else if(msPass == '' || msPassNew==''){
                    setloaithongbao("NoPassInput");
                    setmodalthongbao(true);
                    return setvisileLoad(false);
                }else{
                    fRePassAPI()
                }           
            }

            async function fRePassAPI() {
                let data = {
                      'userID': msUser.toUpperCase(),
                      'oldPassword':msPass,
                      'newPassword':msPassNew
                }
                await ResetPassword(data).then((data)=>{
                  if(data.status==200){
                    setloaithongbao('UpdatePasswordSuccess');
                    clsFunc.fSetTimeToOpenModalThongBao(setmViewDoiMatKhau,false);
                    clsFunc.fSetTimeToOpenModalThongBao(setmodalthongbao,true);
                  }else{
                    setloaithongbao('UpdatePasswordFail');
                    clsFunc.fSetTimeToOpenModalThongBao(setmodalthongbao,true);
                  }
                })
            }

            return(
              <Modal visible={mViewDoiMatKhau} animationType="fade" transparent>
                  <TouchableWithoutFeedback onPress={() => {
                      Keyboard.dismiss();
                      setmViewDoiMatKhau(false);                 
                    }}>    
                    <KeyboardAvoidingView
                      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 50}
                    >              
                      <View style={{...ModalStyle.centeredView,flex:0,height:'100%'}}>
                          <View style={{...ModalStyle.Modal}}>
                            

                            <Text style={styles.title}>ĐỔI MẬT KHẨU</Text>

                            <TextInput
                              style={styles.textInput}
                              placeholder="Tài khoản"
                              value={msUser}
                              onChangeText={setmsUser}
                              autoCapitalize="characters"
                              placeholderTextColor="#999"
                            />

                            <TextInput
                              style={styles.textInput}
                              placeholder="Nhập mật khẩu cũ"
                              value={msPass}
                              onChangeText={setmsPass}
                              secureTextEntry
                              placeholderTextColor="#999"
                            />

                            <TextInput
                              style={styles.textInput}
                              placeholder="Nhập mật khẩu mới"
                              value={msPassNew}
                              onChangeText={setmsPassNew}
                              secureTextEntry
                              placeholderTextColor="#999"
                            />

                            <View style={styles.buttonContainer}>
                              <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#1976D2' }]}
                                onPress={() => {
                                  fResetPassword();
                                }}
                              >
                                <Text style={styles.buttonText}>Cập nhập</Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[styles.button, { backgroundColor: COLORS.red }]}
                                onPress={() => setmViewDoiMatKhau(false)}
                              >
                                <Text style={styles.buttonText}>Huỷ</Text>
                              </TouchableOpacity>
                            </View>
                            
                          </View>
                      </View>
                    </KeyboardAvoidingView>
                  </TouchableWithoutFeedback>
                 
              </Modal>
            );
    }

    return ( 
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: 'white' }}
          //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          //keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <ImageBackground
              source={date.getMonth() + 1 === 1 ? icons.backgroundtet : icons.backgroundchuan}
              resizeMode="cover"
              style={{ flex: 1 }}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 2.5 }}>
                  {showTitle && <Title />}
                </View>

                <View style={{ flex: 6.5 }}>
                  {showBody && (
                    <Body 
                      setsUsername={setsUsername} 
                      setsPassword={setsPassword} 
                    />
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  {showFooter && <Footer />}
                </View>

                {mViewDoiMatKhau? 
                  <ViewDoiMatKhau
                      sUsername={sUsername}
                      sPassword={sPassword}
                      mViewDoiMatKhau={mViewDoiMatKhau}
                      setmViewDoiMatKhau={setmViewDoiMatKhau}
                  />
                :null}
                {modalthongbao==true? FunctionViewThongBao(loaithongbao,modalthongbao,setmodalthongbao,''):null}
                {visileLoad?<ViewLoadingAnimation/>:null}
               
              </SafeAreaView>
            </ImageBackground>   
        </KeyboardAvoidingView>
      </DismissKeyboard>
      
      
    );
  
  }

  const styles = StyleSheet.create({
 
    wrapperIcon: {
      position: 'absolute',
      right: 0,
      padding: 10,
    },
    icon: {
      width: 30,
      height: 24,
    },
    box: {
      paddingLeft: 25,
      paddingRight: 20,
      paddingTop: 6,
      alignItems:'center'
    },


    //Modal Đổi mật khẩu
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: '#333',
      paddingTop: 16
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      marginHorizontal: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      marginBottom: 12,
      backgroundColor: '#F9F9F9',
      color: '#000'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 12,
      marginHorizontal: 16,
      marginBottom: 16
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    }
  });

