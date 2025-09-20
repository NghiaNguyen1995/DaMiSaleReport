// App.js
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routers from './src/routers';
import { clsSignalRService } from './src/screens/Function/Chung/fSignalRService';
import { useNotifeeNotification } from './src/screens/Function/Chung/useNotifeeNotification';

const App = () => {
    useNotifeeNotification();
    useEffect(() => {  
      clsSignalRService.startConnection();
    }, []);
    
  return (
    <SafeAreaProvider>
      <Routers />
    </SafeAreaProvider>
  );
};

export default App;
