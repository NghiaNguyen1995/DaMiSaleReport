import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Page/Dangnhap';
import { Regist } from '../screens/Page/Dangky';
import { TrangChu } from '../screens/Page/Homepage';
import UserScreen from '../screens/Page/Userpage';
import Report from '../screens/Page/Report';
import Invoice from '../screens/Page/Invoice';
import SetupUrl from '../screens/Page/Setupurl';
import Notification from '../screens/Page/Notification';



const Stack = createStackNavigator();

const Routers = () => {
  return ( 
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Login"screenOptions={{headerShown:false}} >
       
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DangKyTaiKhoan" component={Regist} />  

        <Stack.Screen name="TrangChu"  component={TrangChu}  />
        <Stack.Screen name="Thongbao"  component={Notification}  />
    
        <Stack.Screen name="Report"  component={Report}  />
        <Stack.Screen name="Invoice"  component={Invoice}  />

        <Stack.Screen name="ThongTinTaiKhoan"  component={UserScreen}  />
        <Stack.Screen name="Setupurl"  component={SetupUrl}  />
        

     </Stack.Navigator>
     </NavigationContainer>
  );
};

export default Routers;
