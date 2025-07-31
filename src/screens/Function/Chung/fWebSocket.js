
export function fWebSocket(){

  // Kết nối WebSocket đến server
  const socket = new WebSocket('ws://192.168.1.86:8082');

  clsSetSocket.opensocket(socket);
  clsSetSocket.messagesocket(socket);
  clsSetSocket.errorsocket(socket);
  clsSetSocket.closesocket(socket);
    
  return  clsSetSocket.oncloseSocket(socket);
   
}

class clsSetSocket {

    static opensocket(socket){
      socket.onopen = () => {
        console.log('🔌 WebSocket connected');
      };
    }

    static messagesocket(socket){
      socket.onmessage = (event) => {
        console.log('📨 Nhận thông báo:', event.data);

        try {
          const data = JSON.parse(event.data);
          const title = data.title || 'Thông báo';
          const message = data.message || 'Bạn có thông báo mới';
          if (Platform.OS === 'android' && Platform.Version >= 33) {
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
              .then((granted) => {
                  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    clsPushNotification.showLocalNotification(title, message);
                    console.log("📲 Notification permission granted");
                  } else {
                    console.log("🚫 Notification permission denied");
                  }
              });
          }else{
              showLocalNotification(title, message);
          }
          
        } catch (err) {
          console.warn('Lỗi xử lý JSON:', err);
        }
      };
    }

    static errorsocket(socket){
      socket.onerror = (error) => {
        console.error('WebSocket Error:', error.message);
      };
    }

    static closesocket(socket){
      socket.onclose = () => {
        console.log('🛑 WebSocket đóng');
      };
    }
    
    static oncloseSocket(socket){
      socket.close();
    }

}
