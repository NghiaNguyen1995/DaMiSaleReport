import { handleSearch } from '../screens/Function/Chung/functionContentError';
import { DAMI_API } from './ApiManager';
import { DaMiHeader } from './SetUpDaMi';

//Hàm lấy dữ liệu Báo cáo Tồn kho đầy đủ
export const GetInventoryBalanceByDate = async(taikhoan,makho,tungay,denngay,setload) => {
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


// Login
export const GetLogin = async(username,password,setload) => {
    try {
      const result = await DAMI_API(`Login?sUserID=${username}&sUserPass=${password}`, {
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

// GetSalesVoucher
export const GetSalesVoucher = async(vVoucherDate,sVoucherNo,sCustomerName,setload) => {
    try {
      const result = await DAMI_API.get(`GetSalesVoucher?vVoucherDate=${vVoucherDate}&sVoucherNo=${sVoucherNo}&sCustomerName=${sCustomerName}`, {
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








