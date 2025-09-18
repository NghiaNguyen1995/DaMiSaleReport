import moment from 'moment';
import { Platform } from 'react-native';

export class clsFunc {

    // Format dữ liệu từng item
    static fFormatDataItem(key, item) {
      if (key.includes('Quantity') || key.includes('Debit') || key.includes('Credit') || key.includes('ConvertPrice') || key.includes('ConvertAmount')) {
        return item[key] != 0 && item[key] != '' && item[key] != null ? clsFunc.fFormatNumberVN(item[key].toString()) : '';
       }else if (key.includes('Date') && !key.includes('EventsDate')) {
        return item[key] != '' && item[key] != null ? moment(item[key],"DD/MM/YYYY").format("DD/MM/YYYY") : '';
      }else if(key.includes('EventsDate')){
        return item[key] != '' && item[key] != null ? moment(item[key]).format("DD/MM/YYYY HH:mm:SS") : '';
      }else if(key.includes('ModifiedObjID')){
        return this.fRenameModifiedObj(item[key]);
      }else if(key.includes('ModifiedType')){
        return this.fRenameModifiedType(item[key]);
      }else if(key.includes('MsgNotify')){
        return item[key].slice(0,40) +' ...';
      }else{ 
        return item[key];
      }
    }

    // Format số theo chuẩn hàng nghìn
    static fFormatNumberVN(str) {
      if (!str) return '';
      str = str.toString().trim();
      const isNegative = str.startsWith('-');
      if (isNegative) str = str.slice(1);
      str = str.replace(/\s/g, '');

      let intPart = '', decimalPart = '';
      if (str.includes(',')) {
        [intPart, decimalPart] = str.split(',');
      } else if (str.includes('.')) {
        [intPart, decimalPart] = str.split('.');
      } else {
        intPart = str;
      }

      intPart = intPart.replace(/\./g, '');
      const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      if (decimalPart) decimalPart = decimalPart.substring(0, 4);

      const result = decimalPart ? `${formattedInt},${decimalPart}` : formattedInt;
      return isNegative ? `-${result}` : result;
    }

    // Sắp xếp tăng dần
    static fIncSort(data, loaisort) {
      return [...data].sort((a, b) => (a[loaisort] > b[loaisort] ? 1 : -1));
    }

    // Sắp xếp giảm dần
    static fDesSort(data, loaisort) {
      return [...data].sort((a, b) => (a[loaisort] < b[loaisort] ? 1 : -1));
    }

    // Kiểm tra từ ngày <= đến ngày
    static fCheckFromToDate(fromDate, toDate) {
      const from = moment(fromDate, "YYYY-MM-DD");
      const to = moment(toDate, "YYYY-MM-DD");
      return from.isSameOrBefore(to);
    }

    // Đổi tên cột tiêu đề bảng
    static fRenameHeaderTable(key) {
      const mapping = {
        //Báo cáo tồn kho
        ItemID: "Mã hàng",
        ItemName: "Tên hàng",
        UnitName: "ĐVT",
        UnitNameForVoucher:"ĐVT",
        WareHouseID: "Kho",
        
        BegInvQuantity: "Tồn đầu (kg)",
        BegInvQuantity2: "Tồn đầu (cây)",
        BegInvValue:  "Giá trị\ntồn đầu",
       
        InQuantity: "Nhập (kg)",
        InQuantity2: "Nhập (cây)",
        InValue: "Giá trị nhập",
    
        OutQuantity: "Xuất (kg)",
        OutQuantity2: "Xuất (cây)",
        OutValue: "Giá trị xuất",
        
        EndInvQuantity: "Tồn cuối (kg)",
        EndInvQuantity2: "Tồn cuối (cây)",
        EndInvValue: "Giá trị\ntồn cuối",
        //Báo cáo công nợ
        AccountID: "Mã TK",
        CustomerName: "Tên\nkhách hàng",
        TradeName: "Tên\nkhách hàng",
        TaxCode: "Mã số thuế",
        CnvBegDebit: "Phải thu\nđầu kỳ",
        CnvBegCredit: "Phải trả\nđầu kỳ",
        CnvDebit: "Phải thu\ntrong kỳ",
        CnvCredit: "Phải trả\ntrong kỳ",
        CnvEndDebit: "Phải thu\ncuối kỳ",
        CnvEndCredit: "Phải trả\ncuối kỳ",
        //Phiếu bán hàng và doanh thu bán hàng
        RowNumber: "STT",
        VoucherDate: "Ngày",
        VoucherNo: "Số phiếu",
        Description: "Diễn giải",
        InvoiceNo: "Số\nhóa đơn",
        InvoiceDate: "Ngày\nhóa đơn",
        SerialNo: "Số serial",
        PaymentMethodName: "Phương thức\nthanh toán",
        CustomerID: "Mã\nkhách hàng",
        Address1: "Địa chỉ",
        ItemColor: "Màu sắc",
        Specification: "Quy cách",
        Quantity: "Số lượng",
        QuantityByVoucher:"Số lượng",
        Quantity2: "Số lượng phụ",
        QtyCay: "Số cây",
        QtyMet: "Số mét",
        ConvertPrice: "Đơn giá",
        CnvPriceByVoucher: "Đơn giá",
        ConvertPrice2: "Đơn giá quy đổi phụ",
        CnvPriceCay: "Đơn giá theo cây",
        CnvPriceMet: "Đơn giá theo mét",
        ConvertAmount: "Thành tiền",
        NoteDetails: "Ghi chú",
        PrepairedByName: "Người bán",
        Transactor: "Người giao dịch",
        TranAddress: "Địa chỉ giao dịch",
        AttachDocInfo: "Thông tin tài liệu đính kèm",
        Notes: "Ghi chú",
        SalesManID: "Mã NV",
        SalesManName: "Tên NV",
        ItemGroupID: "Mã\nnhóm hàng",
        CreatedDate:"Ngày lập",
        //Thông báo
        UserID:"Người\nthực hiện",
        ComputerName:"Máy tính",
        EventsDate:"Ngày\nthực hiện",
        Action:"Thao tác",
        ModifiedObjID:"Đối tượng\nthay đổi",
        ModifiedType:"Kiểu\nthay đổi",
        TitleNotify:"Tiêu đề",
        MsgNotify:"Nội dung",
        ListUserSeen:'Tài khoản\nđã xem',
        RowUniqueID:'ID\ndòng',
        //Doanh thu lãi gộp
        CnvAmount511:"Doanh thu",
        CnvAmount632:"Giá vốn",
        CnvGrossProfit:"Lãi gộp",
        InvUnitOfMeasr: "ĐVT\ntồn kho",
        SellUnitOfMeasr: "ĐVT\nbán hàng"

      };
      return mapping[key] || key;
    }

    // Lấy ngày đầu tháng -> hiện tại
    static fSetTimeFromTo(setstartDay, settoDay) {
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let firstDay = new Date(year, month, 1);
      setstartDay(firstDay);
      settoDay(today);
      //console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }

    // Load dữ liệu vào combobox
    static fLoadDataToCombobox(data, setitem) {
      if (data.length > 0) {
        const keys = Object.keys(data[0]);
        const maKey = keys.find(k => k.includes('ID'));
        const tenKey = keys.find(k => k.includes('Name'));

        if (!maKey || !tenKey) {
          console.warn(`Không tìm thấy key chứa ID hoặc Name`);
          return;
        }

        const opts = [
          ...data.map(item => ({
            label: item[tenKey],
            value: item[maKey]
          })),
          {
            label: 'Không chọn',
            value: null
          }
        ];

        setitem(opts);
      }
    }

    // Thêm dòng tổng cộng
    static fAddTotalRowToData(objectList, loaiview) {
      if (!Array.isArray(objectList)) return { list: [], totalRow: {} };

      const numericKeys = ['Quantity', 'Debit', 'Credit', 'ConvertPrice', 'ConvertAmount'];
      const totalRow = {};
      const allKeys = Object.keys(objectList[0] || {});

      for (let key of allKeys) {
        if (numericKeys.some(field => key.includes(field))) {
          totalRow[key] = objectList.reduce((sum, item) => {
            
            const val = parseFloat(item[key]);

            return !isNaN(val) ? sum + val : sum;
          }, 0);
        } else if (key.includes('ItemName') || key.includes('TradeName') || key.includes('VoucherNo')) {
          if(loaiview === 'phieubanhang'){
            totalRow['ItemName'] ='TỔNG CỘNG';
          }else{
            totalRow[key] = 'TỔNG CỘNG';
          }
        } else {
          totalRow[key] = '';
        }
      }

      return totalRow;
    }

    // Đặt tên value cho cột là Tổng cổng của dòng Total 
    static fNameTotalRow(key,item,id) {
      if(id === 'phieubanhang'){
        if(key=="ItemName"){
          return item['ItemName']='TỔNG CỘNG';
        }else{
          return item[key];
        }
      }else if(id === 'doanhthubanhang'){
        if(key=="SalesManName"){
          return item['SalesManName']='TỔNG CỘNG';
        }else{
          return item[key];
        }
      }else{
        if(key=="ItemName" || key=="TradeName"){
              return item[key]='TỔNG CỘNG';``
        }else{
                return item[key];
        }
      }
      
    }  

    // Chức năng cho Apple để xử lý bất đồng bộ (Load dữ liệu xong thì mới View Modal)
    static fSetTimeToOpenModalThongBao(setOpenModal,giatri){
      if(Platform.OS==='ios'){
        setTimeout(() => {
          setOpenModal(giatri);
        }, 600);
      }else{
        setOpenModal(giatri);
      }
    }

    // Set màu cho Background View hoặc Color Item đối với các dữ liệu đặc biệt trong FlatList
    static fSetColorForItemSpecial(TypeSet,key,item){
        //Kiểm tra key có trong item đó không!
        if (!item || !(key in item)) {
          return null; 
        }
        // Giành cho color Backgroup Item
        if(TypeSet==='background'){
          switch(item[key]){
            case '1':
              return '#b65656ff'
            case '2':
              return '#9c12126e'
            case '4': 
              return '#CD853F'
            case '8':
              return '#c4b707af'
            default:
              return null
          }
        }else{ 
          // Giành color TextItem
          if(item[key]=="1"||item[key]=="2"||item[key]=="4"||item[key]=="8"){
            return 'white'
          }else{
            return null
          }
         
        }
    }

    static fSetFontWeightForItem(key,item){
      if (!item || !(key in item)) {
          return null; 
        }
      if(item[key]=="1"||item[key]=="2"||item[key]=="4"||item[key]=="8"){
        return 'bold'
      }
      else{
          return null
      }
        
    }

    // Đặt tên tiếng việt cho các trường của ModifiedObjID
    static fRenameModifiedObj(key){
      switch(key){
        case '1':
          return 'Số lượng thay đổi (sửa số lượng)'
        case '2':
          return 'Đơn giá bán thay đổi (sửa Giá bán)'
        case '4':
          return 'Số lượng và Đơn giá bán thay đổi\n(sửa số lượng và đơn giá)'
        default: 
          return ''
      }
    }

    // Đặt tên tiếng việt cho các trường của ModifiedType
    static fRenameModifiedType(key){
      switch(key){
        case '1':
          return 'Thay đổi Bảng giá bán'
        case '2':
          return 'Lập phiếu mới: Giá bán khác với Bảng giá bán chuẩn'
        case '4':
          return 'Sửa phiếu bán hàng: Sửa số lượng hoặc đơn giá của Mặt hàng đã lập'
        case '8':
          return 'Sửa phiếu bán hàng: thêm Mặt hàng mới: có giá bán khác với Bảng giá bán chuẩn'
        default: 
          return ''
      }
    }

    static fRenameAction(key){
      switch(key){
        case 'ADD_VOU':
          return 'Thêm mới phiếu bán hàng'
        case 'EDIT_VOU':
          return 'Chỉnh sửa phiếu bán hàng'
        case 'ADDNEW':
          return 'Thêm mới dữ liệu'
        case 'EDIT':
          return 'Sửa dữ liệu'
        case 'DELETE':
          return 'Xóa dữ liệu'
        default: 
          return ''
      }
    }

}
