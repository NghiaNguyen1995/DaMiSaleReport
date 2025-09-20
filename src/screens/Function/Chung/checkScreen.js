import { CommonActions } from '@react-navigation/native';
import { NameScreen } from '../../../../constants/NameScreen';

export function kiemTraVaChuyenManHinh(navigation, currentRouteName,navData) {
  if (currentRouteName === NameScreen.Phieubanhang) {
    // Reset stack: về TrangChu
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: NameScreen.TrangChu },
          { 
            name: NameScreen.Phieubanhang,
            params: navData, // Truyền dữ liệu tại đây
          },
        ],
      })
    );
  }else{
    navigation.navigate(NameScreen.Phieubanhang, navData);
  }
}
