import { handleSearch } from '../screens/Function/Chung/functionContentError';
import { DAMI_API } from './ApiManager';
import { DaMiHeader } from './SetUpDaMi';

//Hàm lấy dữ liệu Báo cáo Tồn kho đầy đủ
export const GetInventoryBalanceByDate = async(taikhoan,makho,tungay,denngay,setload) => {
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

// Hàm lấy dữ liệu Báo cáo Tồn kho đến ngày (dạng rút gọn):
export const GetEndInvBalanceByDate = async(taikhoan,makho,tungay,denngay,setload) => {
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

// Hàm lấy dữ liệu Báo cáo Công nợ (dạng đầy đủ):
export const GetCustomerBalancebyDate = async(taikhoan,tungay,denngay,setload) => {
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

// Hàm lấy dữ liệu Báo cáo Công nợ đến ngày (dạng rút gọn):
export const GetEndCustBalancebyDate = async(taikhoan,tungay,denngay,setload) => {
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

// Load Dm Tài khoản Công Nợ
export const GetChartAccount = async() => {
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

// Load Dm Kho
export const GetWareHouseList = async() => {

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
export const GetEmployeeList = async() => {
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

// Login
export const GetLogin = async(username,password,setload) => {
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
// Login
export const ResetPassword = async(data) => {
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

// GetSalesVoucher: Phiếu giao hàng
export const GetSalesVoucher = async(vVoucherDate,sVoucherNo,sCustomerName,sSalesManID,setload) => {
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


// GetGeneralSalesByDate: Doanh thu bán hàng theo nhân viên
export const GetGeneralSalesByDate = async(vFromday,vToDay,sSalesManID,sItemGroupID,sWareHouseID,setload) => {
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













