import PushNotification from 'react-native-push-notification';
import { NameScreen } from '../../../../constants/NameScreen';

export class clsPushNotification{

  static configureNotification = ({navigation}) => {
      
    PushNotification.configure({
        onNotification: function (notification) {
            console.log('User clicked notification:', notification);

            // Kiểm tra nếu app đang chạy foreground/background và click vào noti
            if (notification.userInteraction) {

                console.log("Người dùng có nhấn vô thông báo");

                let rowUniqueID = notification.data?.rowUniqueID;
                let voucherID = notification.data?.voucherID;
                
                console.log('rowUniqueID click: ', rowUniqueID);
                console.log('voucherID click: ', voucherID);
                
                // Dùng navigationRef để điều hướng
                /*let data={
                  id: 'thongbao',
                  description: "THÔNG BÁO",
                  rowUniqueID: rowUniqueID,
                  //voucherID: voucherID
                }
                navigation.navigate(NameScreen.Thongbao,data);*/
                
                let data={
                  id: 'phieubanhang',
                  description: "PHIẾU\nBÁN HÀNG",
                  rowUniqueID: rowUniqueID,
                  voucherID: voucherID
                }

                navigation.navigate(NameScreen.Phieubanhang,data);
            }
        },

        popInitialNotification: true,
        requestPermissions: true,
    });

    PushNotification.createChannel(
        {
            channelId: "DaMiSaleReport", // ID dùng khi gửi thông báo
            channelName: "Kênh mặc định",
            channelDescription: "Kênh cho thông báo WebSocket",
            importance: 4, // HIGH importance
            vibrate: true,
            soundName: 'default', // optional
            playSound: true,
        },
        (created) => console.log("🔧 createChannel returned", created) // true nếu tạo mới
    );

  };

  static showLocalNotification = (title, message) => {
    PushNotification.localNotification({
      channelId: "DaMiSaleReport",
      title: title,
      message: message.message,
      data: message, // <-- Truyền toàn bộ data vào userInfo
    });
  }
  
}