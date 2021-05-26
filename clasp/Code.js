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
  const sheet = ss.getSheets()[0];
  const values = sheet.getDataRange().getValues();
  if(r<values.length&&c<values[0].length){
    return values[r][c];
  }else{
    return 'out of range!!'
  }
}

function formCreate() {
  // フォームの作成
  const form = FormApp.create("フォームを作成するサンプル");
  form.setTitle("フォームを作成するサンプル");

  // 3個目のページ
  const thirdPage = form.addPageBreakItem();
  thirdPage.setTitle("3個目のページ");
  // 4個目のページの前に移動させる
  //form.moveItem(thirdPage.getIndex(), fourthPage.getIndex());
  const thirdPageTextItem = form.addTextItem();
  thirdPageTextItem.setTitle("テキスト入力（3ページ目）").setRequired(true);
  // 3個目のページに表示させたいので4個目のページの前に設定する
  //form.moveItem(thirdPageTextItem.getIndex(), fourthPage.getIndex());

  // 2個目のページ
  const secondPage = form.addPageBreakItem();
  secondPage.setTitle("2個目のページ");
  // 2個目のページに表示させたいので3個目のページの前に設定する
  form.moveItem(secondPage.getIndex(), thirdPage.getIndex());
  // 2個目のページからは4個目のページに遷移させるため、1個後のページでgotoを設定
  //thirdPage.setGoToPage(fourthPage);
  const secondPageTextItem = form.addTextItem();
  secondPageTextItem.setTitle("テキスト入力（2ページ目）").setRequired(true);
  // 2個目のページに表示させたいので3個目のページの前に設定する
  form.moveItem(secondPageTextItem.getIndex(), thirdPage.getIndex());

  // 1個目のページのアイテム
  firstPageItem = form.addMultipleChoiceItem();
  firstPageItem.setTitle("ページ選択").setRequired(true);
  firstPageItem.setChoices([
    firstPageItem.createChoice("2ページ目", secondPage),
    firstPageItem.createChoice("3ページ目", thirdPage),
  ]);
  // 1個目のページに表示させたいので2個目のページの前に設定する
  form.moveItem(firstPageItem.getIndex(), secondPage.getIndex());
}
