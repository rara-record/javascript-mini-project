'use strict';

// td = 가로세로 27개씩 
const blockCount = 27; 

// 지렁이가 움직이는 방향
let directionX = 1, directionY = 0;

// 지렁이 몸통
let worm = [];

// 먹이
let food = [];

// setInterval 변수
let gameInterval;

// 스코어
let score = 0;

init();

// 버튼 누르면 게임 시작
$(document).on("click", "#startBtn", function(e){
  e.preventDefault();
  endGame();
  startGame();
  $(this).css("background", "gray");
})

// 키보드 입력 이벤트 
$(document).on("keydown", function(ev) {
  switch (ev.keyCode) {
    case 37: // 왼쪽화살표 눌림
    left();
      break;
    case 38: // 위쪽화살표 눌림
    up();
      break;
    case 39: // 오른쪽화살표 눌림
    right();
      break;
    case 40: // 아래쪽화살표 눌림
    down();
      break;
  }
});

// 초기 설정
function init() {
  score = 0;
  makeTable();
  initWorm();
  initFood();
}

function startGame() {
  gameInterval = setInterval(move, 60);
}

function endGame() {
  clearInterval(gameInterval);
}

//난수 생성 함수
function generateRandom (min, max) {
  var ranNum = Math.floor(Math.random()*(max - min + 1)) + min;
      return ranNum;
}

// 테이블 그리기
function makeTable() {
  let tableCode = '';
  for(let i = 0; i < blockCount; i++) {
    tableCode += "<tr>";

    let rowCode = "";
    for(let j = 0; j < blockCount; j++) {
      rowCode += `<td id="block${i}_${j}"></td>`;
    }
    tableCode += rowCode + "</tr>";
    $("#wormTable").html(tableCode);
  }
}
makeTable();

// 지렁이 초기화 
function initWorm() {
  worm = [];
  worm.push([0,1])
  makeWorm();
}

// 지렁이 그리기
function makeWorm() {
  let state = "";
  $("#wormTable td").removeClass("worm");
  for(let i = 0; i < worm.length; i++) {
    $("#block"+ worm[i][0] + "_" + worm[i][1]).addClass("worm");
    //먹이를 먹었을 때
    if($("#block"+worm[i][0]+"_"+worm[i][1]).hasClass
    ("food")) {
      scoring();
      food.pop(); // 먹이 제거
      initFood(); // 새로운 먹이 추가
      //뱀 꼬리 늘리기
      state = "eat";
    }
    
  }
  return state;
}
makeWorm();

// 먹이 초기화
function initFood() {
  let x;
  let y;

  do {

    x = generateRandom(0, blockCount - 1);
    y = generateRandom(0, blockCount - 1);

  } while ($("#block"+x+"_"+y).hasClass("worm")); // 지렁이랑 겹쳐지면 다시

  food = [];
  food.push([x, y]);
  makeFood();
}

// 먹이 그리기
function makeFood() {
  $("#wormTable td").removeClass("food").text("");
  for(let i = 0; i < food.length; i++) {
    $("#block"+food[i][0]+"_"+food[i][1]).addClass("food").text(generateRandom(1,9));
  }
}
makeFood();

// move 
function move() {
  let head = [];
  head[0] = worm[0][0];
  head[1] = worm[0][1];

  let tmp = head[0]+1 * directionY;
  head[0] = tmp;
  tmp = head[1]+1 * directionX;
  head[1] = tmp;

  // 지렁이가 경계에 있을 때 처리
  if (head[1] < 0) {
      head[1] = blockCount - 1
  }
  if (head[1] > blockCount - 1) {
      head[1] = 0
  }
  if (head[0] < 0) {
      head[0] = blockCount - 1
  }
  if (head[0] > blockCount - 1) {
      head[0] = 0
  }

  // 충돌 체크
  if($("#block"+head[0]+"_"+head[1]).hasClass("worm")) {
    gameover();
  }
  worm.unshift(head); // 머리 늘어남
  
  if(makeWorm() != "eat") { // 먹지 않았으면
    worm.pop(); // 연장 xx
  }
}

// 방향 컨트롤
function left() {
    if(directionY == 0) return; // 반대방향으로 방향전환 불가
    directionX = -1;
    directionY = 0;
}
function right() {
    if(directionY == 0) return; // 반대방향으로 방향전환 불가
    directionX = 1;
    directionY = 0;
}
function up() {
    if(directionX == 0) return; // 반대방향으로 방향전환 불가
    directionX = 0;
    directionY = -1;
}
function down() {
    if(directionX == 0) return; // 반대방향으로 방향전환 불가
    directionX = 0;
    directionY = 1;
}

// 점수 반영 및 게임 오버
function scoring() {
  score += 10; // 점수 증가
  $('#score').text(score); //점수 반영
}
function gameover() {
  alert(`[Game Over] Score: ${score}`);
  startGame();
  init();
  location.reload();
}

// 버튼 꾸미깅
$(document).on("click", "keydown", function() {
  let key = $(this).attr("data-key");
  switch (key) {
    case "up" :
      up();
        break;
    case "down" :
      down();
        break;
    case "left" :
      left();
        break;
    case "right" :
      right();
        break;        
  }
});

$(document).on("keydown", "body", function(ev) {
  switch (ev.key) {
    case "ArrowUp" :
      $(".up_btn").css("background", "skyblue");
      up();
        break;
    case "ArrowDown" :
      $(".down_btn").css("background", "skyblue");
      down();
        break;
    case "ArrowLeft" :
      $(".left_btn").css("background", "skyblue");
      left();
        break;        
    case "ArrowRight" :
      $(".right_btn").css("background", "skyblue");
      right();
        right;        

}
});

$(document).on("keyup", "body", function(){
  $(".btn").css("background", "#CCCCCC");
});