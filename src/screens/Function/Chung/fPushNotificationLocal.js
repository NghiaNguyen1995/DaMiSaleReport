import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { AppState, Platform } from 'react-native';
import { NameScreen } from '../../../../constants/NameScreen';
import { navigationRef } from '../../../../RootNavigation';

export class clsPushNotification {
  static initialNotification = null;

  // ⚙️ Cấu hình notification
  static configureNotification = () => {
    if (Platform.OS === 'android') {
      // ✅ Android config
      PushNotification.configure({
        onNotification: function (notification) {
          console.log('📩 Android notification:', notification);

          const { rowUniqueID, voucherID } = notification.data || {};
          const navData = {
            id: 'phieubanhang',
            description: 'PHIẾU\nBÁN HÀNG',
            rowUniqueID,
            voucherID,
          };

          // 🔀 Điều hướng luôn nếu navigation sẵn sàng
          if (navigationRef.current?.isReady()) {
            console.log('➡️ Navigate on Android:', navData);
            navigationRef.current.navigate(NameScreen.Phieubanhang, navData);
          } else {
            clsPushNotification.initialNotification = { navData };
          }

          // 👉 Nếu notification đến khi đang foreground → hiện local notification
          if (!notification.userInteraction) {
            PushNotification.localNotification({
              channelId: 'DaMiSaleReport',
              title: notification.title || 'Thông báo',
              message: notification.message || '',
              playSound: true,
              soundName: 'default',
              importance: 'high',
              vibrate: true,
              data: notification.data,
            });
          }
        },
        popInitialNotification: true,
        requestPermissions: true,
      });

      // 🔔 Tạo notification channel Android
      PushNotification.createChannel(
        {
          channelId: 'DaMiSaleReport',
          channelName: 'Thông báo',
          channelDescription: 'Thông báo hệ thống',
          importance: 4,
          vibrate: true,
        },
        (created) => console.log('✅ Android channel created:', created)
      );
    } else {
      // ✅ iOS config

      const onNotification = (notification) => {
        const data = notification.getData?.() || notification.data || {};
        const { rowUniqueID, voucherID } = data;

        const navData = {
          id: 'phieubanhang',
          description: 'PHIẾU\nBÁN HÀNG',
          rowUniqueID,
          voucherID,
        };

        console.log('🔔 iOS push notification:', data);
        if (navigationRef.current?.isReady()) {
          navigationRef.current.navigate(NameScreen.Phieubanhang, navData);
        } else {
          clsPushNotification.initialNotification = { navData };
        }

        // Nếu foreground, hiển thị local notification
        if (!data.userInteraction) {
          PushNotificationIOS.addNotificationRequest({
            id: `${Date.now()}`,
            title: notification.getTitle?.() || 'Thông báo',
            body: notification.getMessage?.() || '',
            userInfo: {
              ...data,
              userInteraction: true,
            },
            sound: 'default',
          });
        }
      };

      const localNotification = (notification) => {
        const data = notification.getData?.() || notification.userInfo || {};
        const { rowUniqueID, voucherID } = data;

        const navData = {
          id: 'phieubanhang',
          description: 'PHIẾU\nBÁN HÀNG',
          rowUniqueID,
          voucherID,
        };

        console.log('👆 User tapped local notification (iOS)', navData);
        if(navigationRef.current?.isReady()) {
          navigationRef.current.navigate(NameScreen.Phieubanhang, navData);
        } else {
          clsPushNotification.initialNotification = { navData };
        }
      };

      // 🔁 Đăng ký listener (không phụ thuộc AppState)
      PushNotificationIOS.addEventListener('notification', onNotification);
      PushNotificationIOS.addEventListener('localNotification', localNotification);

      // 🛑 Xin quyền iOS
      PushNotificationIOS.requestPermissions().then((res) =>
        console.log('✅ iOS permissions:', res)
      );
    }
  };

  // 📦 Xử lý notification khi app khởi động (đã bị kill)
  static handleInitialNotificationAfterNavReady = async () => {
    console.log("✅ Navigation ready");

    if (Platform.OS === 'ios') {
      const notification = await PushNotificationIOS.getInitialNotification();

      if (notification) {
        const data = notification.getData?.() || notification.data || {};
        const navData = {
          id: 'phieubanhang',
          description: 'PHIẾU\nBÁN HÀNG',
          rowUniqueID: data.rowUniqueID,
          voucherID: data.voucherID,
        };

        console.log('📥 Initial notification from iOS:', data);
        navigationRef.current?.navigate(NameScreen.Phieubanhang, navData);
        return;
      }
    }

    // ⏳ Nếu đã lưu navData nhưng navigation chưa sẵn sàng khi nhận notification
    if (clsPushNotification.initialNotification && navigationRef.current?.isReady()) {
      console.log('➡️ Navigate from saved notification');
      navigationRef.current.navigate(
        NameScreen.Phieubanhang,
        clsPushNotification.initialNotification.navData
      );
      clsPushNotification.initialNotification = null;
    }
  };

  // 🚨 Hiển thị local notification (tự tạo)
  static showLocalNotification = (title, message) => {
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        channelId: 'DaMiSaleReport',
        title: title,
        message: message.message,
        data: message,
        playSound: true,
        soundName: 'default',
        importance: 'high',
        vibrate: true,
      });
    } else {
      const userInfo = {
        ...message,
        userInteraction: false,
      };

      PushNotificationIOS.addNotificationRequest({
        id: `${Date.now()}`,
        title: title,
        body: message.message,
        userInfo: userInfo,
        sound: 'default',
      });
    }
  };
}
