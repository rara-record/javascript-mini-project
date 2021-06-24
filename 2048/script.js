'use strict';

const $table = document.getElementById('table'); 
const $score = document.getElementById('score'); 
let data = []; // 데이터


// table -> fragment -> tr -> td
function startGame() {
  // 메모리에만 존재하는 가상 fragment 변수를 만든다.
  const $fragment = document.createDocumentFragment(); 
  [1, 2, 3, 4].forEach(() => {
    const rowData = [];
    data.push(rowData);  // 2차원 배열
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach (() => {
      rowData.push(0); 
      const $td = document.createElement('td');
      $tr.appendChild($td);
    });
    $fragment.appendChild($tr);
  });  
  $table.appendChild($fragment); // 한번에 화면에 그려준다.
  put2ToRandomCell(); // 랜덤하게 2가 출력
  draw(); // 그리기
}




function put2ToRandomCell() {
  const emptyCells = [];
  data.forEach(function (rowData, i) { 
    rowData.forEach(function (cellData, j) {
      if(!cellData) { // 칸이 빈칸이라면?
        emptyCells.push([i, j]); // [[i1, j1], [i2, j2], [i3, j3]] 
      }
    });
  });
    // randomCell === [i, j]
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length) ];
    data[randomCell[0]][randomCell[1]] = 2;
}


function draw() {
    data.forEach((rowData, i) => {
      rowData.forEach((cellData, j) => {
        const $target = $table.children[i].children[j]; // tr, td
        if (cellData > 0) {
          $target.textContent = cellData;
          $target.className = 'color-' + cellData;
        } else {
          $target.textContent = '';
          $target.calssName = '';
        }
      });
  });
}
startGame();

data = [
  [0, 2, 4, 2],
  [0, 0, 8, 0],
  [2, 2, 4, 8],
  [0, 16, 0, 4],
];
draw();


// 숫자 합치기
function moveCells (direction) {
  switch (direction) {
    case 'left': {
      const newData = [[], [], [], []]; 
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j) => {
          if (cellData) {
            const currentRow = newData[i]
            const prevData = currentRow[currentRow.length -1];
            if (prevData === cellData) { // 이전 값과 지금 값이 같으면
              currentRow[currentRow.length - 1] *= -2;
            } else {
                newData[i].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'right': {
      const newData = [[], [], [], []];
      break;
    }
    case 'up': {
      const newData = [[], [], [], []];
      break;
    }
    case 'down': {
      const newData = [[], [], [], []];

      break;      
    }
  }
  draw();
}

// 키보드 이벤트
window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    moveCells('up');
  } else if (event.key === 'ArrowDown') {
    moveCells('down');
  } else if (event.key === 'ArrowLeft') {
    moveCells('left');
  } else if (event.key === 'Arrowright') {
    moveCells('right');
  }
});
