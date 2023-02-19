'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const indexNo = [0, 0, 0, 0, 0];
const defColor = document.getElementsByTagName("caption")[0].backgroundColor;
let lastObject = [defColor, defColor, defColor, defColor];
let lastTr = 0;

const arrayNameOfId = ["aName", "bName", "cName", "dName", "eName"];
const arrayTd = [
  ["ax", "bx", "cx", "dx", "ex"],
  ["ay", "by", "cy", "dy", "ey"], 
  ["az", "bz", "cz", "dz", "ez"]
];

const tr = ["trA", "trB", "trC", "trD", "trE"];
const car = ["carA", "carB", "carC", "carD", "carE"];

const arrayCsv = [];  //データ格納用

// 現在の年月日時刻を文字列で返す
function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth();
  if (String(month).length < 2) {month = "0" + month};
  let date = now.getDate();
  if (String(date).length < 2) {date = "0" + date};
  let hour = now.getHours();
  if (String(hour).length < 2) {hour = "0" + hour};
  let minute = now.getMinutes();
  if (String(minute).length < 2) {minute = "0" + minute};
  let second = now.getSeconds();
  if (String(second).length < 2) {second = "0" + second};
  return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
}

// 時刻を更新
function action() {  
  document.getElementsByTagName("caption")[0].innerText = getDate();
}

// テーブル作成
function createTable() {
  
  const objBody = document.getElementsByTagName("body")[0];
  const objTable = document.createElement("table");
  objBody.append(objTable);
  const objTBody = document.createElement("tbody");
  objTable.appendChild(objTBody);
  
  const objCaption = document.createElement("caption");
  objCaption.innerText = getDate();
  objTBody.appendChild(objCaption);

  const title = ["車両", "エリア", "X", "Y", "Z"];
  let objTr = document.createElement("tr");
  objTBody.appendChild(objTr);
  for (const elem of title) {
    const objTh = document.createElement("th");
    objTr.appendChild(objTh);
    objTh.innerText = elem;
    objTBody.appendChild(objTr);
  }
  objTBody.appendChild(objTr);

  for (let i = 0; i <= 4; i++) {
    // tr
    let objTr = document.createElement("tr");
    objTr.id = tr[i];
    objTBody.appendChild(objTr);
    
    // td
    let objTd = document.createElement("td");
    objTd.className = "center";
    objTd.innerText = "車両" + String.fromCharCode(65 + i);
    objTr.appendChild(objTd);
    objTBody.appendChild(objTr); 
    
    objTd = document.createElement("td");
    objTd.id = arrayNameOfId[i]
    objTd.className = "center";
    objTr.appendChild(objTd);
    objTBody.appendChild(objTr);

    for (let j = 0; j <= 2; j++) {
      objTd = document.createElement("td");
      objTd.id = arrayTd[j][i];
      objTd.className = "right";
      objTr.appendChild(objTd);
      objTBody.appendChild(objTr);    
    }
  }
}

function setData() {
  // 要素選択用Random
  let min = 0;
  let max = 4;
  const id = Math.floor( Math.random() * (max + 1 - min) ) + min;
  
  // マスターレコード選択用
  min = 0;
  max = arrayCsv.length - 1 // 29347;
  if ((indexNo[id] === 0) || (indexNo[id] === max)) {
    indexNo[id] = Math.floor( Math.random() * (max + 1 - min) ) + min;
  } else {
    indexNo[id] += 1;
  }

  if (lastTr !== 0) {
    lastTr.style.backgroundColor = "white";
  }
  lastTr = document.getElementById(tr[id]);

  lastObject[0] = document.getElementById(arrayNameOfId[id]);
  lastObject[1] = document.getElementById(arrayTd[0][id]);
  lastObject[2] = document.getElementById(arrayTd[1][id]);
  lastObject[3] = document.getElementById(arrayTd[2][id]);

  lastObject[0].innerText = arrayCsv[indexNo[id]][5];
  lastObject[1].innerText = arrayCsv[indexNo[id]][6];
  lastObject[2].innerText = arrayCsv[indexNo[id]][7];
  lastObject[3].innerText = arrayCsv[indexNo[id]][8];
  lastTr.style.backgroundColor = "lavender";

  setDraw(id, arrayCsv[indexNo[id]][6], arrayCsv[indexNo[id]][7]);
}  

function setDraw(carIndex, x, y) {
  const objCarIcon = document.getElementById(car[carIndex]);
  objCarIcon.style.left = Math.abs(y) + 500 + "px";
  objCarIcon.style.top = Math.abs(x) + 600 + "px";
}

setInterval(action, 1000);  // 時計用

const fileInput = document.getElementById("getfile");
const fileReader = new FileReader();

// ファイル変更時イベント
fileInput.onchange = () => {
  const file = fileInput.files[0];
  fileReader.readAsText(file, "UTF-8");
};

// ファイル読み込み時
fileReader.onload = () => {
  // ファイル読み込み
  const lines = fileReader.result.split('\n');
  // 先頭行のヘッダを削除
  lines.shift();
  // 配列へ格納
  for (let i = 0; i < lines.length; ++i) {
    arrayCsv.push(lines[i].split(","))
  }
  setInterval(setData, 500);  // データ用
  return arrayCsv;
}

// CSVファイルを読込み、データ配列を返す
function readCsv() {
  // 返り値
  const arrayRet = [];
  // HTTPでファイルを読み込む
  const csv = new XMLHttpRequest(); 
  // 取得するファイルの設定
  csv.open("GET", "https://daisuke.s3.ap-northeast-1.amazonaws.com/m_route_master_10000.csv", true);
  // レスポンスの確認
  csv.onload = function (e) {
    if (csv.readyState === 4) {
      if (csv.status === 200) {
        const responce = csv.responseText;
        const lines = responce.split("\n");
        // 配列に格納
        for(let i = 0; i < lines.length; i++){
          arrayRet[i] = lines[i].split(',');
        }
      } else {
        console.error(csv.statusText);
      }
    }
  };
  // リクエストの要求送信
  csv.send(null);
  return arrayRet;
}

// 地図上の座標確認用
document.body.addEventListener("click", function(event) {
	let x = event.pageX;
	let y = event.pageY;
  console.log("x: ",x);
  console.log("y: ", y);
});
