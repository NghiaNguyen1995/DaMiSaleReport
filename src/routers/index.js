// src/routers/index.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '../../RootNavigation';
import { clsPushNotification } from '../screens/Function/Chung/fPushNotificationLocal';

import Login from '../screens/Page/Dangnhap';
import { Regist } from '../screens/Page/Dangky';
import { TrangChu } from '../screens/Page/Homepage';
import UserScreen from '../screens/Page/Userpage';
import Report from '../screens/Page/Report';
import Invoice from '../screens/Page/Invoice';
import SetupUrl from '../screens/Page/Setupurl';
import Notification from '../screens/Page/Notification';
import { NameScreen } from '../../constants/NameScreen';
import { clsSignalRService } from '../screens/Function/Chung/fSignalRService';


const Stack = createStackNavigator();

const Routers = () => {

  
  useEffect(() => {
      clsPushNotification.configureNotification();
      clsSignalRService.startConnection();
    }, []);
  const onNavigationReady = () => {
    console.log('✅ Navigation is ready');
    clsPushNotification.handleInitialNotificationAfterNavReady();
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
      <Stack.Navigator initialRouteName={NameScreen.Login} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NameScreen.Login} component={Login} />
        <Stack.Screen name={NameScreen.Regist} component={Regist} />
        <Stack.Screen name={NameScreen.TrangChu} component={TrangChu} />
        <Stack.Screen name={NameScreen.Thongbao} component={Notification} />
        <Stack.Screen name={NameScreen.Tonghophanghoa} component={Report} />
        <Stack.Screen name={NameScreen.Phieubanhang} component={Invoice} />
        <Stack.Screen name={NameScreen.ThongTinTaiKhoan} component={UserScreen} />
        <Stack.Screen name={NameScreen.Dangkyurl} component={SetupUrl} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
