import React,{useEffect} from 'react';
import Routers from './src/routers';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform,PermissionsAndroid  } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App =()=>{
  
  /*useEffect(()=>{
    
  //})
  
  // Giành cho Firebase FCM Message: Phải đăng ký json App cho ios.
  const notifymessBackground=()=>{
    messaging().setBackgroundMessageHandler(remoteMessage=>{
      if(remoteMessage){
          title = remoteMessage.notification.title;
          body= remoteMessage.notification.body
          Alert.alert(`${title}`,`${body}`)
      }
    });
  }*/

  return (
    <SafeAreaProvider>   
        <Routers />     
    </SafeAreaProvider>
  );
}

export default App;

