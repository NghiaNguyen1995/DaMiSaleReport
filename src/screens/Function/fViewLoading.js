import { View,Text,ActivityIndicator,StyleSheet,Modal } from "react-native"

export function ViewLoadingAnimation({modalPhieugiaohang}){
    return (
        <Modal visible={modalPhieugiaohang} animationType="fade"  transparent={true}>
            <View style={styles.indicatorWrapper}>
                <ActivityIndicator size="large" style={styles.indicator} />
                <Text style={styles.indicatorText}>Hệ thống đang lấy dữ liệu ...</Text>   
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    indicatorWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicator: { 
        color:'green'
    },
    indicatorText: {
      fontSize: 18,
      marginTop: 5,
      color: 'black'
    }
});