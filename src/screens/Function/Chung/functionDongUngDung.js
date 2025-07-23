import { BackHandler, ToastAndroid } from 'react-native';

let backPressedOnce = false;
export  const BackAction = () => {

    if (!backPressedOnce) {
        backPressedOnce = true;
        console.log('Nhấn 2 lần để thoát ứng dụng');
        ToastAndroid.show('Nhấn 2 lần để thoát ứng dụng', ToastAndroid.SHORT);
        setTimeout(() => {
          backPressedOnce = false;
        }, 5000); // Reset lại giá trị backPressedOnce sau 2 giây nếu không nhấn lần thứ 2
        return true;
      }
      
      return BackHandler.exitApp();
}