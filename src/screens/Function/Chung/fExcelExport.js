import { Alert } from 'react-native';
import XLSX from 'xlsx';
import { writeFile, DocumentDirectoryPath } from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { GetGuidId } from './functionGetDate';
import { clsFunc } from './fSupport';

export default async function fXuatExcel(data, name) {

  try {

    let nameReplace = name + GetGuidId();
    
    //Xử lý tên Key trước khi ghi file data vô excel
    data = data.map(item => {
        let newItem = {};
        Object.keys(item).forEach(key => {
            // Thay thế các key theo yêu cầu
            let newKey = clsFunc.fRenameHeaderTable(key);
            newItem[newKey] = item[key];
        });
        return newItem;
    })

    // 1. Tạo sheet và workbook
    const ws = XLSX.utils.json_to_sheet(data);
    // Cài đặt độ rộng cột tự động
    const colWidth = Object.keys(ws).reduce((acc, key) => {
        if (key[0] === '!') return acc; // Bỏ qua các key
        const col = key.split(':')[0].replace(/\d/g, ''); // Lấy tên cột
        const width = ws[key] ? (ws[key].v ? ws[key].v.toString().length : 10) : 10; // Độ dài của giá trị
        acc[col] = Math.max(acc[col] || 0, width);
        return acc;
    }, {});
    ws['!cols'] = Object.keys(colWidth).map(col => ({ wch: colWidth[col] + 2 })); // Thêm độ rộng cột

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, nameReplace);

    // 2. Ghi file vào bộ nhớ
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    const path = `${DocumentDirectoryPath}/${nameReplace}.xlsx`;

    try {
      await writeFile(path, wbout, 'base64');
    } catch (writeErr) {
      return 'ErrorWriteExcel'; // Dừng nếu lưu lỗi
    }

    // 3. Mở file nếu đã lưu thành công
    try {
      await FileViewer.open(path);
    } catch (openErr) {
      return 'ErrorOpenExcel'; // Dừng nếu không mở được file
    }

  }catch (error) {
    return "ErrorExportExcel"; // Trả về thông báo lỗi nếu có lỗi xảy ra
  }
}
