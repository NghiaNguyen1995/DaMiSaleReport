import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,  ImageBackground, ActivityIndicator, Modal} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { icons, COLORS, FONTS } from '../../../constants';
import {FunctionViewThongBao} from '../Function/Chung/fViewThongBao';
import { useRoute } from '@react-navigation/native';
import { GetDevice } from '../Function/Chung/functionInfoDevice';
import { buttonStyle } from '../../../constants/stylechung';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SIGN_IN = 'SIGN_IN'
const GET_STARTED = 'GET_STARTED'

export function Regist({ navigation }) {

  const [tokendevicedangky, settokendevicedangky] = useState('')
  const [visible, setVisible] = useState(false);
  const [modalthongbao,setmodalthongbao] = useState(false)
  const [loaithongbao,setloaithongbao] = useState('')

  const [Version,setVersion]=useState('')

  const route = useRoute()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            version()
            getdulieu()
            console.log('Refreshed!');
        });
        return () => {unsubscribe};
    }, [navigation])

    // Hiện lấy version từ package.json
    const version =()=>{
      const filePath = require('../../../package.json');
      setVersion(filePath.version) 
    }

    const getdulieu = async () => {
      let token =  await AsyncStorage.getItem('fcmToken')
      settokendevicedangky(token)
      console.log(await AsyncStorage.getItem('fcmToken'))

    }

    const date = new Date()

    const laytoken = () => {
        Clipboard.setString(tokendevicedangky)
        setloaithongbao('COPYTOCLIPBOARD')
        setmodalthongbao(true)
    }

    function LoadingAnimation() {
      return (
        <View style={styles.indicatorWrapper}>
          {visible == true ? (
            <View>
              <ActivityIndicator size="large" style={styles.indicator} />
              <Text style={styles.indicatorText}>Loading ...
              </Text>
            </View>) : null}

        </View>
      );
    }

    const MarginTopByDevice =()=>{
      let device = GetDevice()
      // Kiểm tra nếu model là từ iPhone X trở lên
      if (device.includes('X') || device.includes('11') || device.includes('12') || device.includes('13')|| device.includes('14')|| device.includes('15')) {
         return 10
      } else {
          return 5
      }
    }

    const paddingTopByDevice = ()=>{
        let device = GetDevice()
        // Kiểm tra nếu model là từ iPhone X trở lên
        if (device.includes('X') || device.includes('11') || device.includes('12') || device.includes('13')|| device.includes('14')|| device.includes('15')) {
            return 30
        }else{
            return 15
            
        }
    }

  return (
    <View>

          <ImageBackground source={date.getMonth == 1?icons.backgroundtet:icons.backgroundchuan} resizeMode='cover'>
            <View style={{ height: '100%', marginLeft: 10,paddingTop:paddingTopByDevice() }}> 

              <View style={{marginLeft:-10,alignItems:'center',justifyContent:'center',marginTop:MarginTopByDevice()}}>
                <StatusBar  barStyle='light-content'/>
                  <Text style={{ color: COLORS.app.title, fontSize: 25, fontWeight: 'bold', fontFamily: 'Roboto-Bold' }}>Đăng ký thiết bị</Text>
              </View>

              

              {/*mathietbi*/}
              <View style={{ ...styles.wrapperInput, marginLeft: 10, borderWidth: 1, backgroundColor: 'white', borderRadius: 5, width: windowWidth * 0.9,marginTop:20 }}>
                <Text style={{ ...styles.input, width: windowWidth * 0.9, padding: 10 }}>Mã đăng ký: {tokendevicedangky}</Text>
              </View>
              
              {/*nút button*/}
              <View style={{flexDirection:'row',justifyContent:'center'}}>

                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity style={{...buttonStyle.butttonSaoChep}} onPress={() => { 
                        laytoken()
                    }} >
                      <Text style={{...buttonStyle.buttonTextSaoChep}}>Sao chép</Text>
                    </TouchableOpacity>
                  </View>

                  

              </View>
      
            </View>

            <Modal visible={visible} animationType="fade" transparent={true}>
              <LoadingAnimation />
            </Modal>

            {modalthongbao == true ? (FunctionViewThongBao(loaithongbao,modalthongbao,setmodalthongbao,'')) : null } 
          
          </ImageBackground>

          <View style={{ position: 'absolute', bottom: 0, alignSelf: 'center',justifyContent:'center',marginBottom:10 }}>
            <Text style={{fontSize:10,color:'white',padding:10,textAlign:'center'}}>Phiên bản: {Version}</Text>
          </View>
          
    </View>
  )
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
    marginTop: 12,
    color: 'green'
  },
  container: {
    flex: 1,
    //  justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 25
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
    color:'gray'
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
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dialogTitle,
    borderRadius: 20,
    marginTop: 40,
    marginLeft: 28, width: windowWidth * 0.75
  },
  button1: {
   // padding: 10,
    height:48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.app.buttonLogin,
    borderRadius: 5,
    marginTop: 35,
    width: windowWidth * 0.3
  },
  buttonGG: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    marginTop: 35,
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6
  }
});
