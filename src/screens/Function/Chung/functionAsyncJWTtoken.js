import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SaveJWTToken(tokenjwt){
    AsyncStorage.setItem('AccessToken',tokenjwt)
}

export async function GetJWTToken(){
    let token = await AsyncStorage.getItem('AccessToken')
    return token 
}