// var 변수에서 for 블럭 사용 시 문제
var div, container = document.getElementById('container');

for (var i = 0; i<5; i++){
  div = document.createElement('div');
  div.onclick = function() {
    alert('이것은 박스 No.' + i + " 인덱스 입니다.");
  }
  container.appendChild(div);
}