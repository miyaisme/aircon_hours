// JavaScript
// STEP 1: 透過 querySelector 選擇到 HTML 中的「箭頭」元素
const upElement = document.querySelector(".chevron-up");
const downElement = document.querySelector(".chevron-down");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const submit = document.querySelector(".submit");
const hour = document.querySelector(".number");
const results = document.querySelector(".result-container");
const STORAGE_KEY = "airconHours";
const records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const result = document.querySelectorAll(".result");
const dates = document.querySelectorAll('input[type="date"]')

let today = new Date()
let mm = today.getMonth().toString()
let dd = today.getDate().toString()
if (mm.length === 1) {
  mm = '0' + mm
}
if (dd.length === 1) {
  dd = '0' + dd
}
let date = `${today.getFullYear()}-${mm}-${dd}`
dates.forEach((_date) => _date.value = date)

// STEP 2: 透過 querySelector 選擇到 HTML 中的「數字」元素
const numberElement = document.querySelector(".number");

// STEP 3: 監聽 click 事件，並執行對應的行為
upElement.addEventListener("click", (e) => {
  // STEP 4: 取得當前網頁上的數字
  const currentNumber = Number(numberElement.textContent);

  // STEP 5: 將數字增加後帶回網頁上
  numberElement.textContent = currentNumber + 1;
});

downElement.addEventListener("click", (e) => {
  const currentNumber = Number(numberElement.textContent);
  if (currentNumber <= 0) {
    numberElement.textContent = 0
  } else {
    numberElement.textContent = currentNumber - 1;
  }
});

submit.addEventListener("click", recordTime);

results.addEventListener("click", deleteRecord)

records.forEach((item) => {
  results.innerHTML += `
    <div class="recordHours">
      <div class="result" data-id="${item.id}">${item.start} 到 ${item.end} ，吹了 ${item.hours} 小時</div>
      <div class="delete" data-id="${item.id}"><i class="far fa-trash-alt"></i></div>
    </div>
    `;
});

function _uuid() {
  var d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function recordTime() {
  if (Number(numberElement.textContent) <= 0) {
    return alert`請填入 0 小時以上的時數`
  }
  records.push({
    id: _uuid(),
    start: startDate.value,
    end: endDate.value,
    hours: hour.innerText
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  displayRecords()
}

function displayRecords() {
  results.innerHTML = ""
  records.forEach((item) => {
    results.innerHTML += `
    <div class="recordHours">
      <div class="result" data-id="${item.id}">${item.start} 到 ${item.end} ，吹了 ${item.hours} 小時</div>
      <div class="delete" data-id="${item.id}"><i class="far fa-trash-alt"></i></div>
    </div>
    `;
  });
}

function deleteRecord(e) {
  if (e.target.classList.contains("fa-trash-alt")) {
    let i = e.target.parentElement.dataset.id
    let recordIndex = records.findIndex((record) => record.id === i)
    records.splice(recordIndex, 1)
    e.target.parentElement.parentElement.remove();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }
}
