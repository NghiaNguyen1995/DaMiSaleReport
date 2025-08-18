import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { DaMiHeader } from '../../../api/SetUpDaMi';
import { clsPushNotification } from './fPushNotificationLocal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class clsSignalRService {
    static connection = null;

    static async startConnection() {
        
        async function getOrCreateUserId() {
            let userID = JSON.parse(await AsyncStorage.getItem('user'));
    
            return userID;
        }

        // Dùng khi connect SignalR:
        const userID = await getOrCreateUserId();

        this.connection = new HubConnectionBuilder()
        .withUrl('http://simsoft.com.vn:8082/notificationHub', {
        //.withUrl('http://192.168.1.15:5055/notificationHub',{
            //accessTokenFactory: () => 'your_token', // nếu có token
            headers: {
                'UserID': userID.ID? userID.ID : '',
                'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
                'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
            }
        })
       
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();
        
        //let datamessage = JSON.parse(await AsyncStorage.getItem('notification')) || [];

        this.connection.on('ReceiveNotification', (message) => {

            console.log('message back end: ',message);
            clsPushNotification.showLocalNotification('Thông báo', message); //Thông báo khi trạng thái app online
        
        });

        try {
            await this.connection.start();
            console.log('SignalR connected');
        } catch (err) {
            console.error('Lỗi kết nối SignalR:', err);
        }
    }

    static async closeConnection() {
        if (this.connection) {
            try {
                // Ngắt các handler nếu cần
                this.connection.off('ReceiveNotification');

                // Ngắt kết nối
                await this.connection.stop();
                console.log('❌ SignalR connection closed.');
            } catch (err) {
                console.error('❌ Lỗi khi đóng SignalR:', err);
            }
        }
    }
    
}
