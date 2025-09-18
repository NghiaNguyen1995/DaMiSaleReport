// fPushNotificationLocal.js
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import { NameScreen } from '../../../../constants/NameScreen';
import { navigationRef } from '../../../../RootNavigation';

export class clsPushNotification {
  static initialNotification = null;

  static configureNotification = () => {
    if (Platform.OS === 'android') {
      PushNotification.configure({
        onNotification: function (notification) {
          const { rowUniqueID, voucherID } = notification.data || {};
          const navData = {
            id: 'phieubanhang',
            description: 'PHIẾU\nBÁN HÀNG',
            rowUniqueID,
            voucherID,
          };

          console.log('📩 Android notification:', notification);

          if (notification.userInteraction) {
            if (navigationRef.current?.isReady()) {
              console.log('➡️ Navigate on Android:', navData);
              navigationRef.current.navigate(NameScreen.Phieubanhang, navData);
            } else {
              clsPushNotification.initialNotification = { navData };
            }
          } else {
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

          notification.finish?.(PushNotification.FetchResult.NoData);
        },
        popInitialNotification: true,
        requestPermissions: true,
      });

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
      // iOS
      const onNotification = (notification) => {
        const data = notification.getData?.() || notification.data || {};
        const { rowUniqueID, voucherID, userInteraction } = data;

        const navData = {
          id: 'phieubanhang',
          description: 'PHIẾU\nBÁN HÀNG',
          rowUniqueID,
          voucherID,
        };

        console.log('🔔 iOS notification:', data);

        if (userInteraction) {
          if (navigationRef.current?.isReady()) {
            console.log('➡️ Navigate on iOS:', navData);
            navigationRef.current.navigate(NameScreen.Phieubanhang, navData);
          } else {
            clsPushNotification.initialNotification = { navData };
          }
        } else {
          PushNotificationIOS.addNotificationRequest({
            id: `${Date.now()}`,
            title: notification.getTitle?.() || 'Thông báo',
            body: notification.getMessage?.() || '',
            userInfo: {
              ...data,
              userInteraction: true, // REQUIRED
            },
            sound: 'default',
          });
        }
      };

      PushNotificationIOS.addEventListener('notification', onNotification);
      PushNotificationIOS.requestPermissions().then((res) =>
        console.log('✅ iOS permissions:', res)
      );
    }
  };

  static handleInitialNotificationAfterNavReady = async () => {
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

    // Handle saved notification (in case navigation wasn't ready)
    if (clsPushNotification.initialNotification && navigationRef.current?.isReady()) {
      console.log('➡️ Navigate from saved notification');
      navigationRef.current.navigate(NameScreen.Phieubanhang, clsPushNotification.initialNotification.navData);
      clsPushNotification.initialNotification = null;
    }
  };

  static showLocalNotification = (title, message) => {
    if (Platform.OS === 'android') {
      PushNotification.localNotification({
        channelId: 'DaMiSaleReport',
        title,
        message: message.message,
        data: message,
        playSound: true,
        soundName: 'default',
        importance: 'high',
        vibrate: true,
      });
    } else {
      PushNotificationIOS.addNotificationRequest({
        id: `${Date.now()}`,
        title,
        body: message.message,
        userInfo: {
          ...message,
          userInteraction: true,
        },
        sound: 'default',
      });
    }
  };
}
