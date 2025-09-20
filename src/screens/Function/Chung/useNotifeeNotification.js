import notifee, { EventType } from '@notifee/react-native';
import { useEffect } from 'react';
import { navigationRef } from '../../../../RootNavigation';
import { kiemTraVaChuyenManHinh } from './checkScreen';

export function useNotifeeNotification() {
  useEffect(() => {

    // Handler dùng lại
    const handleNotificationTap = (data) => {
      if (!data || !navigationRef.current?.isReady()) return;

      const navData = {
        id: 'phieubanhang',
        description: 'PHIẾU\nBÁN HÀNG',
        rowUniqueID: data?.rowUniqueID,
        voucherID: data?.voucherID,
      };

      const currentRoute = navigationRef.current.getCurrentRoute();
      const currentRouteName = currentRoute?.name;

      if (currentRouteName) {
        kiemTraVaChuyenManHinh(navigationRef.current, currentRouteName, navData);
      }
    };

    // Khi app mở từ trạng thái killed do bấm notification
    notifee.getInitialNotification().then(initialNotification => {
      const data = initialNotification?.notification?.data;
      console.log("App mở từ notification (killed/background): ", data);
      handleNotificationTap(data);
    });

    // Khi app đang foreground/background, người dùng tap vào notification
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
        const data = detail.notification?.data;
        console.log("Tap notification khi app foreground/background: ", data);
        handleNotificationTap(data);
      }
    });

    // Khi app đang ở background bị tap notification → chạy nền
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
        const data = detail.notification?.data;
        console.log("Tap notification khi app background (background handler): ", data);
        handleNotificationTap(data);
      }
    });

    // Cleanup foreground event
    return () => {
      unsubscribe();
    };
  }, []);
}
