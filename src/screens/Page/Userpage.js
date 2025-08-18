import React,{useState,useRef} from 'react'
import {View,StyleSheet,Text,Dimensions,Modal,
TextInput,TouchableOpacity,Image, KeyboardAvoidingView,FlatList,ActivityIndicator} from 'react-native'
import {Avatar,Drawer} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { icons } from "../../../constants"
import {FunctionViewThongBao} from '../Function/Chung/fViewThongBao';
import { NameScreen } from '../../../constants/NameScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { pick, types } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import { ViewLoadingAnimation } from '../Function/fViewLoading'

const windowWidth = Dimensions.get('window').width;

export default function UserScreen({navigation,route}) {


    const [manhanvien,setmanhanvien] = useState('')
    const [tennhanvien,settennhanvien] = useState('')

   
    const [anh,setanh] = useState(null)
   
    const [isDarkTheme,setIsDarkTheme]= React.useState(false);
    const [visible,setVisible]= useState(false);

   
    const [modalthongbao,setmodalthongbao] = useState(false)
    const [loaithongbao,setloaithongbao] = useState('')

  
    const Dangxuat = ()=>{
      navigation.navigate(NameScreen.Login)
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

        setmanhanvien(route.params?.ID.toUpperCase())
        settennhanvien(route.params?.UserName.toUpperCase())

        //set ảnh:
        let anhdaidien = await AsyncStorage.getItem("anhdaidien")
        console.log("anhdaidien",anhdaidien)
        if(anhdaidien){
          setanh(anhdaidien)
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

          setanh(fileUri);
          await AsyncStorage.setItem('anhdaidien', fileUri);
        } catch (err) {
          console.error('Error picking image:', err);
        }
    }

    return (
        
            <View style={{height:'100%',backgroundColor:'white'}}>
              <SafeAreaView>  
                {/* View Thông tin */}
                <View style={{...styles.cardTop,marginTop:10}} keyboardShouldPersistTaps="handled">

                        {/* View Ảnh */}
                        <View style={{flexDirection:'row',paddingTop: 10,paddingLeft:10}}>
                            <TouchableOpacity onPress={()=>{fSetImage()}}>
                              <Avatar.Image
                                source={anh?{uri: anh}:icons.user_button} 
                                size={40}     
                              />
                            </TouchableOpacity>
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
                  {visible==true?<ViewLoadingAnimation />:null}
                  {modalthongbao == true ? (FunctionViewThongBao(loaithongbao,modalthongbao,setmodalthongbao,setVisible)) : null}
              </SafeAreaView>
            </View>
        
    )
}

