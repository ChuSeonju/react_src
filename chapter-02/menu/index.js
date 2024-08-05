import {addBtn, addInput, list, rollBtn} from './tags.js';

// default export 된 각 함수수들을 import
import addMenu from './add.js';
import deleteMenu from './delete.js';
import rollMenu from './roll.js';

const data = [];

addBtn.addEventListener('click', () => addMenu(data));
addInput.addEventListener('keypress', (e) => e.code === "Enter" && addMenu(data));
list.addEventListener('click', ({target}) => target.tagName === 'BUTTON' && deleteMenu(data, target.dataset.index));
rollBtn.addEventListener('click', () => list.classList.contains('rolling') || rollMenu(data));