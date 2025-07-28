import moment from 'moment';
import { Platform } from 'react-native';

export class clsFunc {

  // Format dữ liệu từng dòng
  static fFormatDataItem(key, item) {
    if (key.includes('Quantity') || key.includes('Debit') || key.includes('Credit') || key.includes('ConvertPrice') || key.includes('ConvertAmount')) {
      return item[key] != 0 && item[key] != '' && item[key] != null ? clsFunc.fFormatNumberVN(item[key].toString()) : '';
    }else if (key.includes('Date')) {
      return item[key] != '' && item[key] != null ? moment(item[key],"DD/MM/YYYY").format("DD/MM/YYYY") : '';
    } else {
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
      ItemID: "Mã hàng",
      ItemName: "Tên hàng",
      UnitName: "ĐVT",
      UnitNameForVoucher:"ĐVT",
      WareHouseID: "Kho",
      BegInvQuantity: "Tồn đầu (kg)",
      BegInvQuantity2: "Tồn đầu (cây)",
      InQuantity: "Nhập (kg)",
      InQuantity2: "Nhập (cây)",
      OutQuantity: "Xuất (kg)",
      OutQuantity2: "Xuất (cây)",
      EndInvQuantity: "Tồn cuối (kg)",
      EndInvQuantity2: "Tồn cuối (cây)",
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
    };
    return mapping[key] || key;
  }

  // Lấy ngày đầu tháng -> hiện tại
  static fSetTimeFromTo(setstartDay, settoDay) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    if (setstartDay) setstartDay(firstDay);
    if (settoDay) settoDay(today);
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
        if(loaiview === 'phieugiaohang'){
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

  static fNameTotalRow(key,item,id) {
    if(id === 'phieugiaohang'){
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

  static fSetTimeToOpenModalThongBao(setOpenModal,giatri){
    if(Platform.OS==='ios'){
      setTimeout(() => {
        setOpenModal(giatri);
      }, 600);
    }else{
      setOpenModal(giatri);
    }
  }
}
