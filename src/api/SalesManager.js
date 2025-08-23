import { handleSearch } from '../screens/Function/Chung/functionContentError';
import { DAMI_API } from './ApiManager';
import { DaMiHeader } from './SetUpDaMi';

export class SalesManagerAPI   {
  static GetInventoryBalanceByDate = async(taikhoan,makho,tungay,denngay,setload) => {
    console.log('Biến truyền vào tồn kho đầy đủ: ',taikhoan,makho,tungay,denngay)
    try {
      const result = await DAMI_API.get(`GetInventoryBalanceByDate?sAccountID=${taikhoan}&sWareHouseID=${makho}&vFromDate=${tungay}&vToDate=${denngay}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          //data: JSON.stringify(data)
      });
      setload(false);
      return result;
    } catch (error) {
      setload(false)
      return handleSearch(error)
    }
}

// GetEndInvBalanceByDate: Báo cáo Tồn kho đến ngày (dạng rút gọn):
static GetEndInvBalanceByDate = async(taikhoan,makho,tungay,denngay,setload) => {
  console.log('Biến truyền vào tồn kho rút gọn: ',taikhoan,makho,tungay,denngay)
    try {
      const result = await DAMI_API.get(`GetEndInvBalanceByDate?sAccountID=${taikhoan}&sWareHouseID=${makho}&vFromDate=${tungay}&vToDate=${denngay}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          //data: JSON.stringify(data)
      });
      setload(false);
      return result;
    } catch (error) {
      setload(false)
      return handleSearch(error)
    }
}

// GetCustomerBalancebyDate: Báo cáo Công nợ (dạng đầy đủ):
static GetCustomerBalancebyDate = async(taikhoan,tungay,denngay,setload) => {
    console.log('Biến truyền vào công nợ đầy đủ: ',taikhoan,tungay,denngay)
    try {
      const result = await DAMI_API.get(`GetCustomerBalancebyDate?sAccountID=${taikhoan}&vFromDate=${tungay}&vToDate=${denngay}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          //data: JSON.stringify(data)
      });
      setload(false);
      return result;
    } catch (error) {
      setload(false)
      return handleSearch(error)
    }
}

// GetEndCustBalancebyDate: Báo cáo Công nợ đến ngày (dạng rút gọn):
static GetEndCustBalancebyDate = async(taikhoan,tungay,denngay,setload) => {
    console.log('Biến truyền vào công nợ rút gọn: ',taikhoan,tungay,denngay)
    try {
      const result = await DAMI_API.get(`GetEndCustBalancebyDate?sAccountID=${taikhoan}&vFromDate=${tungay}&vToDate=${denngay}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          //data: JSON.stringify(data)
      });

      setload(false);

      return result;
    } catch (error) {
      setload(false)
      return handleSearch(error)
    }
}

// GetChartAccount: Danh mục tài khoản công nợ
static GetChartAccount = async() => {
    try {
      const result = await DAMI_API.get('GetChartAccount', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          //data: JSON.stringify(data)
      });

      return result;
    } catch (error) {
      return handleSearch(error)
    }
}

// GetWareHouseList: Danh mục kho
static GetWareHouseList = async() => {

    try {
      const result = await DAMI_API.get('GetWareHouseList', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          //data: JSON.stringify(data)
      });
      
      return result;
    } catch (error) {
      return handleSearch(error)
    }
}

// GetEmployeeList: Lấy danh sách nhân viên
static GetEmployeeList = async() => {
    try {
      const result = await DAMI_API.get('GetEmployeeList', {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          //data: JSON.stringify(data)
      });
      return result;
    } catch (error) {
      return handleSearch(error)
    }
}

// Login: Đăng nhập
static GetLogin = async(username,password,setload) => {
    try {
      const result = await DAMI_API.get(`Login?sUserID=${username}&sUserPass=${password}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          //data: JSON.stringify(data)
      });
      setload(false);
      return result;
    } catch (error) {
      setload(false);
      return handleSearch(error);
    }
}
// ResetPassword: Reset password
static ResetPassword = async(data) => {
    try {
      const result = await DAMI_API('ResetPassword', {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
            'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
          },
          data: JSON.stringify(data)
      });
      return result;
    } catch (error) {
      return handleSearch(error);
    }
}

  // GetSalesVoucher: Phiếu bán hàng
  static GetSalesVoucher = async(vVoucherDate,sVoucherNo,sCustomerName,sSalesManID,setload) => {
      
      try {
        const result = await DAMI_API.get(`GetSalesVoucher?vVoucherDate=${vVoucherDate}&sVoucherNo=${sVoucherNo}&sCustomerName=${sCustomerName}&sSalesManID=${sSalesManID}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
              'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
            },
            //data: JSON.stringify(data)
        });
        setload(false);
        return result;
      } catch (error) {
        setload(false);
        return handleSearch(error)
      }
  }

  // GetGeneralSalesByDate: Doanh thu bán hàng theo nhân viên Proceduce SL_spRptGeneralSalesByDate
  static GetGeneralSalesByDate = async(vFromday,vToDay,sSalesManID,sItemGroupID,sWareHouseID,setload) => {
  try {
        const result = await DAMI_API.get(`GetGeneralSalesByDate?vFromDate=${vFromday}&vToDate=${vToDay}&sSalesManID=${sSalesManID}&sItemGroupID=${sItemGroupID}&sWareHouseID=${sWareHouseID}`, {
            //method: 'GET',
            headers: {
              'content-type': 'application/json',
              'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
              'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
            },
            //data: JSON.stringify(data)
        });
        setload(false);
        return result;
      } catch (error) {
        setload(false);
        return handleSearch(error)
      }
  }
  // GetSalesRevenueByProc: Doanh thu lãi gộp:  Proceduce SL_spRptGeneralGrossProfitByItem
  static GetGeneralGrossProfitByItem = async(vFromday,vToDay,sSalesManID,sItemGroupID,sWareHouseID,setload) => {
      try {
        const result = await DAMI_API.get(`GetGeneralGrossProfitByItem?vFromDate=${vFromday}&vToDate=${vToDay}&sSalesManID=${sSalesManID}&sItemGroupID=${sItemGroupID}&sWareHouseID=${sWareHouseID}`, {
            //method: 'GET',
            headers: {
              'content-type': 'application/json',
              'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
              'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
            },
            //data: JSON.stringify(data)
        });
        setload(false);
        return result;
      } catch (error) {
        setload(false);
        return handleSearch(error)
      }
  }

  // GetNotification: Danh sách thông báo
  static GetNotification = async(setload) => {
      try {
        const result = await DAMI_API.get(`GetNotification`, {
            //method: 'GET',
            headers: {
              'content-type': 'application/json',
              'DaMiPartnerGUID': DaMiHeader[0].DaMiPartnerGUID,
              'DaMiPartnerToken': DaMiHeader[0].DaMiPartnerToken
            },
            //data: JSON.stringify(data)
        });
        setload(false);
        return result;
      } catch (error) {
        setload(false);
        return handleSearch(error)
      }
  }
}