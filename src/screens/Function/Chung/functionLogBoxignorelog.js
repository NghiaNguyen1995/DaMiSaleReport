import { LogBox } from "react-native";
export const InvisibleLogBox=()=>{
    //LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);
    LogBox.ignoreAllLogs(true);
}