import PushNotification from 'react-native-push-notification';
import { NameScreen } from '../../../../constants/NameScreen';

export class clsPushNotification{

  static configureNotification = ({navigation}) => {
      
    PushNotification.configure({
        onNotification: function (notification) {
            console.log('User clicked notification:', notification);

            // Kiểm tra nếu app đang chạy foreground/background và click vào noti
            if (notification.userInteraction) {
                console.log("Người dùng có nhấn vô thông báo")
                // Dùng navigationRef để điều hướng
                let data={
                  id: 'thongbao',
                  description: "THÔNG BÁO"
                }

                navigation.navigate(NameScreen.Thongbao,data);
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
      message: "Nội dung: "+message.modifiedBy+" vào lúc "+message.time,
    });
  }
  
}