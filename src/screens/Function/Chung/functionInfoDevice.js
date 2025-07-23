import DeviceInfo from 'react-native-device-info';

export const GetDevice = ()=>{
    let deviceModel = DeviceInfo.getModel();
    return deviceModel
}
