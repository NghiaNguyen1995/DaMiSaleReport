import { Linking } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
export const RequestOpenSetting = async(typeSetting) => {
    //await Linking.openSettings()
    if(typeSetting=="LOCATION"){
        const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (result === 'granted') {                 
            console.log('You can use Geolocation');
            return true;
        } else{
            Linking.openSettings()
            return false;
        }
    }else{
        return null
    }
    
}