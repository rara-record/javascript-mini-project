'use strict';


  // 그림판을 그린다 : 메모리에 있는 게임판
  let game = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];
  
  let cellData = 0;

  // 메모리 게임판을 화면 게임판으로 복사해서 그린다.
  setInterval(function(){
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (game[y][x] == 0) {
          $("td.cell"+x+"x"+y).text("");
        } else {
          $("td.cell"+x+"x"+y).text(game[y][x])
		  console.log();
        }
      }
    }
  }, 50);
  // 게임 시작할때 랜덤한 위치에 2를 두개 만들어 준다.
  makeTwo();
  makeTwo();
  

  // 사용자로부터 키보드 입력을 받는다.
  $(document).on("keydown", function(ev) {
    switch (ev.keyCode) {
    case 37: // 왼쪽화살표 눌림
    moveLeft();
    calcLeft();
    moveLeft();
    if (makeTwo() == false) {
      // 게임오버 처리
      alert("GAME OVER");
    }
      break;
    case 38: // 위쪽화살표 눌림
    moveUp();
    calcUp();
    moveUp();
    if (makeTwo() == false) {
      // 게임오버 처리
      alert("GAME OVER");
    }
      break;
    case 39: // 오른쪽화살표 눌림
    moveRight();
    calcRight();
    moveRight();
    if (makeTwo() == false) {
      // 게임오버 처리
      alert("GAME OVER");
    }
      break;
    case 40: // 아래쪽화살표 눌림
    moveDown();
    calcDown();
    moveDown();
    if (makeTwo() == false) {
      // 게임오버 처리
      alert("GAME OVER");
    }
      break;  
    }
  });

  // 숫자를 왼쪽으로 몰아넣는 함수
  function moveLeft() {
    for (let y = 0; y < 4; y++) { // y는 네줄
      for (let p = 0; p < 3; p++) {
        for (let x = 0; x < 3; x++) {
          if (game[y][x] == 0) {
            game[y][x] = game[y][x + 1];
            game[y][x + 1] = 0;
          }
        }
      }
    }
  }
  
  // 숫자를 오른쪽으로 몰아넣는 함수
  function moveRight() {
    for (let y = 0; y < 4; y++) { // y는 네줄
      for (let p = 0; p < 3; p++) {
        for (let x = 3; x > 0; x--) { // x가 0보다는 클때까지 (3..2..1)
          if (game[y][x] == 0) {
            game[y][x] = game[y][x - 1];
            game[y][x - 1] = 0;
          }
        }
      }
    }
  }

  // 숫자를 위쪽으로 몰아넣는 함수
  function moveUp() {
    for (let x = 0; x < 4; x++) { // x방향으로 loop
      for (let p = 0; p < 3; p++) {
        for (let y = 0; y < 3; y++) { // y가 3보다 작을때까지 (0..1..2)
          if (game[y][x] == 0) {
            game[y][x] = game[y + 1][x];
            game[y + 1][x] = 0;
          }
        }
      }
    }
  }

  // 숫자를 아래쪽으로 몰아넣는 함수
  function moveDown() {
    for (let x = 0; x < 4; x++) { // x방향으로 loop
      for (let p = 0; p < 3; p++) {
        for (let y = 3; y > 0; y--) { // y가 3에서~1까지 (위로 올라가는 방향) 
          if (game[y][x] == 0) {
            game[y][x] = game[y - 1][x];
            game[y - 1][x] = 0;
          }
        }
      }
    }
  }


  // 왼쪽 방향으로 인접한 두 숫자가 같으면 합치는 함수
  function calcLeft() {
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 3; x++) {
        if (game[y][x] == game[y][x + 1]) {
			game[y][x] *= 2;
			game[y][x + 1] = 0;
        }
      }
    }
  }

  
  // 오른쪽 방향으로 인접한 두 숫자가 같으면 합치는 함수
  function calcRight() {
    for (let y = 0; y < 4; y++) {
      for (let x = 3; x > 0; x--) {
        if (game[y][x] == game[y][x - 1]) {
			game[y][x] *= 2;	  
			game[y][x - 1] = 0;
        }
      }
    }
  }


  // 위쪽 방향으로 인접한 두 숫자가 같으면 합치는 함수
  function calcUp() {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 3; y++) {
        if (game[y][x] == game[y + 1][x]) {
          game[y][x] *= 2; 
          game[y + 1][x] = 0;
        }
      }
    }
  }

  // 아래쪽 방향으로 인접한 두 숫자가 같으면 합치는 함수
  function calcDown() {
    for (let x = 0; x < 4; x++) {
      for (let y = 3; y > 0; y--) {
        if (game[y][x] == game[y - 1][x]) {
          game[y][x] *= 2; 
          game[y - 1][x] = 0;
        }
      }
    }
  }  
  

  // 랜덤한 위치에 2를 생성하는 함수
  // 2를 생성하는데에 성공했으면 true 리턴, 실패했으면 false 리턴
  function makeTwo (){
    let emptyCells = [];
    // 메모리 게임판에서 비어있는 칸들의 좌표를 배열로 모아둔다.
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (game[y][x] == 0) {
          emptyCells.push({x:x, y:y});
        }
      }
    }
    // 게임판에서 빈칸이 하나도 없으면 게임오버 처리
    if (emptyCells.length == 0) {
      return false;
    }
    
    // 빈칸 중에 랜덤한 한칸을 선택한다.
    let selectedCell = emptyCells[parseInt(Math.random()*1000000) % emptyCells.length];
    // 선택된 칸에 2를 만든다.
    game[selectedCell.y][selectedCell.x] = 2; 
    $("td").css("background-color", "#fff")
    $("td.cell"+selectedCell.x+"x"+selectedCell.y).css("background-color", "#eee1c9");
    return true;
}

