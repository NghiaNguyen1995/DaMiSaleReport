import React, { useState,useEffect} from 'react'
import { Text, View,TouchableWithoutFeedback, KeyboardAvoidingView,Keyboard,TouchableOpacity, FlatList,ScrollView,TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import từ các file khác
import { containerHeader, containerView, GridStyle} from '../../../constants/stylechung'
import { NameScreen } from '../../../constants/NameScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons } from '../../../constants';
import { clsFunc } from '../Function/Chung/fSupport';

export const Notification = ({navigation,route}) => {


  const [titleHeaderComponent,settitleHeaderComponent] = useState([])
  const defaultkey = ["title", "message", "time"];
  const [visibleKeys, setVisibleKeys] = useState(defaultkey);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
        fInitLoad()
    });
  
    return () => {unsubscribe};
  },[navigation])

  //#region Function Init
  "Function load thiết lập"
  function fInitLoad(){
    settitleHeaderComponent(route.params);   
    fLoadNotifications();
    if(data != ""){
      fInitFilter(data,setFilters)
    }
  }
      
  "Function Init Filter data = trống"
  function fInitFilter(data,setFilters){
    // Khởi tạo filters trống
    const initialFilters = {};
    Object.keys(data[0]).forEach(key => {
      initialFilters[key] = '';
    });
    setFilters(initialFilters);
  }
  //#endregion
 
  //#region Get danh sách thông báo từ bộ nhớ cục bộ
  async function fLoadNotifications() {
    try {
      const storedData = await AsyncStorage.getItem('notification');
      const parsedData = storedData ? JSON.parse(storedData) : [];

      if (Array.isArray(parsedData)) {
        const currentDate = new Date();

        // Lọc ra những item trong vòng 7 ngày gần nhất
        const dt = parsedData.filter(item => {
          const itemDate = new Date(item.time);
          const diffTime = currentDate - itemDate; 
          const diffDays = diffTime / (1000 * 60 * 60 * 24); 

          return diffDays <= 7;
        });

        // Ghi lại vào AsyncStorage chỉ các item còn lại
        await AsyncStorage.setItem('notification', JSON.stringify(dt));

        // Hiển thị
        setData(dt.reverse()); // Hiển thị mới nhất trước
        setFilteredData(dt.reverse());
      }

    } catch (error) {
      console.error('Lỗi khi đọc notification từ AsyncStorage', error);
    }
  };
  //#endregion

  //#region "Function Filter Data"
    "Filter theo từng cột của FlatList"
    function fHandleFilterChange(key, value) {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);

        const isAllEmpty = Object.values(newFilters).every(v => !v?.trim());
        
        if (isAllEmpty) {
            setFilteredData(data); // Trả toàn bộ dữ liệu nếu không có filter nào
            return;
        }

        const newData = data.filter(item => {
            return Object.keys(newFilters).every(k => {
                const filterVal = newFilters[k]?.toLowerCase().trim() || '';
                const itemVal = item?.[k]?.toString().toLowerCase() || '';
                return itemVal.includes(filterVal);
            });
        });

        setFilteredData(newData);
    }

    

  //#endregion

  const ComponentHeader=()=>{   
      return( 
          <View style={{...containerHeader.ctnHeader,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                
              <TouchableOpacity 
                  onPress={()=>{navigation.navigate(NameScreen.TrangChu,'')}} 
                  style={{paddingLeft:10,width:'30%'}}>
                    <Image
                      source={icons.trove}
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: 'white',
                      }} 
                    />
              </TouchableOpacity>

              <Text style={{...containerHeader.headerCaption,width:'30%'}}>{titleHeaderComponent.description}</Text>
                  
              <View style={{width:'30%'}}>                 
              </View>
          </View>
      )
  }
      
  let keys = visibleKeys;

  return (
    <TouchableWithoutFeedback onPress={()=>{ Keyboard.dismiss()}} accessible={false}>
        <KeyboardAvoidingView  style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}> 
                <ComponentHeader />
                <View style={{ flex: filteredData.length>0?1:null}}>
                  <ScrollView
                    horizontal
                    keyboardShouldPersistTaps="handled"
                  >
                    <View style={{...containerView('report',data)}}>
                        {/* Header */}
                        <View style={{...GridStyle(visibleKeys.length,'').headerRow}}>
                            {keys.map(key => (
                                <Text key={key} style={{...GridStyle(visibleKeys.length,key).headerCell}}>{clsFunc.fRenameHeaderTable(key)}</Text>
                            ))}
                        </View>
    
                        {/* Filter row */}
                        <View style={{...GridStyle(visibleKeys.length,'').filterRow}}>
                            {keys.map(key => (
                                <TextInput                          
                                    key={key}
                                    style={{...GridStyle(visibleKeys.length,key).filterInput}}
                                    placeholder={''}
                                    value={filters[key]}
                                    onChangeText={value => fHandleFilterChange(key, value)}
                                />
                            ))}
                        </View>
            
                        <FlatList
                            data={filteredData} // luôn data gốc
                            keyExtractor={(item, index) => index.toString()}
                            style={{ height: 'auto'}} 
                            ListEmptyComponent={() => (
                                <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
                                    <Text style={{textAlign:'center',textAlignVertical:'center',}}>Không có dữ liệu</Text>
                                </View>
                            )}
                            renderItem={({ item }) => {
                                if (!item) return null;                    
                                const show = !!item && Object.keys(filters).every(k =>
                                    (item?.[k] ?? '').toString().toLowerCase().includes((filters[k] ?? '').toLowerCase())
                                );
                                        
                                if (!show) return null;
    
                                return (
                                    <View style={{...GridStyle(visibleKeys.length,'').dataRow}} >
                                        {keys.map(key => (
                                            <Text 
                                                key={key} 
                                                style={{...GridStyle(visibleKeys.length,key).dataCell}}
                                                onPress={()=>{}}>
                                                    {clsFunc.fFormatDataItem(key,item)}
                                            </Text>
                                        ))}
                                    </View>
                                );
                            }}
                        />
                                     
                    </View>
                  </ScrollView>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Notification;
