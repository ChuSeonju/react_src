import { addInput, list } from "./tags.js";
// 고민 메뉴 목록에 메뉴 추가
function add(data) {
  const inputValue = addInput.value;
  const index = data.length;

  const li = document.createElement('li');
  li.classList.add('item');

  li.innerHTML = `<b>${index + 1}</b>${inputValue}<button class="del-btn" data-index="${index}">X</button>`;
  list.append(li);

  data.push(inputValue);

  addInput.value = '';
  addInput.focus();
}

function emptyAlert() {
  alert('고민되는 메뉴를 입력해 주세요.');
  addInput.focus();
}
function maxAlert() {
  alert('메뉴는 최대 5개 까지만 고민할 수 있습니다.');
  addInput.value = '';
}

function addMenu(data) {
  const inputValue = addInput.value;
  if (inputValue === '') {
    emptyAlert();
  } else if (data.length > 4) {
    maxAlert();
  } else {
    add(data);
  }
}

export default addMenu;