// const fs = require("fs");
const XLSX = require("xlsx");

const workbook = XLSX.readFile("./employee_data_.xlsx");
let worksheets = {};
for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

// console.log(worksheets.Sheet)
let arr = worksheets.Sheet
for(let i = 0; i < worksheets.Sheet.length; i++){
  if (arr[i].AnnualSalary < 50000){
    Object.assign(arr[i],{BonusPercentage:'5%'})
    Object.assign(arr[i],{BonusAmount: (5*arr[i].AnnualSalary)/100})
  }

  else if (arr[i].AnnualSalary >= 50000 && arr[i].AnnualSalary <= 100000) {
    Object.assign(arr[i],{BonusPercentage:'7%'})
    Object.assign(arr[i],{BonusAmount: (7*arr[i].AnnualSalary)/100})
  }
  else{
    Object.assign(arr[i],{BonusPercentage:'10%'})
    Object.assign(arr[i],{BonusAmount: (10*arr[i].AnnualSalary)/100})
  }
//   console.log(arr[i])
}
// console.log(arr)
try{

const ws = XLSX.utils.json_to_sheet(arr);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
XLSX.writeFile(wb, 'Employee-Data-Processor.xlsx');
}
catch(err){
  console.log(err)
}