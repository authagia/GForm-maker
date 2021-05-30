function myFunction() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheets()[0];
  const values = sheet.getDataRange().getValues();
  Logger.log(values);
  return values
}

function readTest(r,c){
  if(!r&&!c){r=2;c=3}
  console.log(r+','+c)
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheets()[1];
  const values = sheet.getDataRange().getValues();
  if(r<values.length&&c<values[0].length){
    return ":boundary:"+values[r][c];
  }else{
    return ':boundary:out of range!!'
  }
}

function formCreate(forced=false) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheets()[0];
  const values = sheet.getDataRange().getValues();
  // フォームの作成
  const form = FormApp.create(values[1][0]);
  form.setTitle(values[2][0]);
  form.setDescription(values[2][1]);

  // 3個目のページ
  const thirdPage = form.addPageBreakItem();
  thirdPage.setTitle(values[2][0]);
  // 4個目のページの前に移動させる
  //form.moveItem(thirdPage.getIndex(), fourthPage.getIndex());
  const thirdPageTextItem = form.addParagraphTextItem();
  thirdPageTextItem.setTitle(values[6][0]).setRequired(values[6][3]==1||forced);
  const thirdPageScaleItem = form.addScaleItem();
  thirdPageScaleItem.setTitle(values[7][0]).setRequired(values[7][3]==1||forced);
  const boundsarg = values[values[7][2]-1][1].split(',');
  const labelsarg = values[values[7][2]-1][2].split(',');
  thirdPageScaleItem.setBounds(...boundsarg);
  thirdPageScaleItem.setLabels(...labelsarg);
  // 3個目のページに表示させたいので4個目のページの前に設定する
  //form.moveItem(thirdPageTextItem.getIndex(), fourthPage.getIndex());

  // 2個目のページ
  const secondPage = form.addPageBreakItem();
  secondPage.setTitle(values[2][0]);
  // 2個目のページに表示させたいので3個目のページの前に設定する
  form.moveItem(secondPage.getIndex(), thirdPage.getIndex());
  // 2個目のページからは4個目のページに遷移させるため、1個後のページでgotoを設定
  //thirdPage.setGoToPage(fourthPage);
  const secondPageTextItem = form.addParagraphTextItem();
  secondPageTextItem.setTitle(values[5][0]).setRequired(values[5][3]==1);
  // 2個目のページに表示させたいので3個目のページの前に設定する
  form.moveItem(secondPageTextItem.getIndex(), thirdPage.getIndex());
  thirdPage.setGoToPage(FormApp.PageNavigationType.SUBMIT);

  // 1個目のページのアイテム
  const firstPageListItem = form.addListItem();
  firstPageListItem.setTitle(values[3][0]).setRequired(values[3][3]==1);
  const teamList = []
  values[values[3][2]-1].shift();
  for(let i=0;i<values[0].length;i++){
    if(!values[values[3][2]-1][i])break;
    teamList.push(values[values[3][2]-1][i])
  }
  firstPageListItem.setChoiceValues(teamList);
  
  const firshPageMaltipleChoiceItem = form.addMultipleChoiceItem();
  firshPageMaltipleChoiceItem.setTitle(values[4][0]).setRequired(values[4][3]==1);
  const choices = [];
  values[values[4][2]-1].shift();
  for(let i=0;i*2<values[0].length;i++){
    if(!values[values[4][2]-1][2*i])break;
    const value = values[values[4][2]-1][2*i];
    switch(values[values[4][2]-1][2*i+1]){
      case 0:
      choices.push(firshPageMaltipleChoiceItem.createChoice(value,FormApp.PageNavigationType.SUBMIT));
      break;
      case 2:
      choices.push(firshPageMaltipleChoiceItem.createChoice(value,secondPage));
      break;
      case 3:
      choices.push(firshPageMaltipleChoiceItem.createChoice(value,thirdPage));
      break;
      default:
      console.log("something wrong");
      break;
    }
  }
  firshPageMaltipleChoiceItem.setChoices(choices);
  // 1個目のページに表示させたいので2個目のページの前に設定する
  form.moveItem(firstPageListItem.getIndex(), secondPage.getIndex());
  form.moveItem(firshPageMaltipleChoiceItem.getIndex(),secondPage.getIndex());
  moveFormFile(form.getId());
  return ":boundary:"+form.getPublishedUrl();
}

function moveFormFile(formId){
  const formfile = DriveApp.getFileById(formId);
  const folder = DriveApp.getFoldersByName('Forms').next();//select the first found folder
  folder.addFile(formfile);
  DriveApp.removeFile(formfile);
}
