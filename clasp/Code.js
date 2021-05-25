function myFunction() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheets()[0];
  const values = sheet.getDataRange().getValues();
  return values  
}

function readTest(r,c){
  if(!r&&!c){r=2;c=3}
  console.log(r+','+c)
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheets()[0];
  const value = sheet.getDataRange().getValues()[r][c];
  console.log(value);
  return value  
}
