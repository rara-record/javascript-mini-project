'use strict';

let numOne = '';
let numTwo = '';
let operator = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

// 숫자 버튼 클릭 => operator가 비어있는가? 비어있지 않은가?
const onClickNumber = (event) => {
    if(!operator) {  // numOne변수에 숫자를 저장한다.
        numOne += event.target.textContent;
        $result.value += event.target.textContent;
        return;
    } 
    //비어있지 않다.
    if (!numTwo) { // numTwo변수에 숫자를 저장한다.
        $result.value = '';
    }
    numTwo += event.target.textContent;
    $result.value += event.target.textContent;
};
document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);

// 연산자 버튼 클릭 => numOne값이 존재하는가?
const onClickOperator = (op) => () => {
    if(numOne) {  // 연산자를 변수에 저장한다
        operator = op;
        $operator.value = op;
    } else {
        alert('숫자를 먼저 입력하세요');
    }
}
document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));
document.querySelector('#calculate').addEventListener('click', () => {
  if (numTwo) { // '='버튼 클릭 => numTwo값이 존재 하는가?
    switch (operator) { // 계산하기
      case '+':
        $result.value = parseInt(numOne) + parseInt(numTwo);
        break;
      case '-':
        $result.value = numOne - numTwo;
        break;
      case '*':
        $result.value = numOne * numTwo;
        break;  
      case '/':
        $result.value = numOne / numTwo;
        break;         
    }   
    $operator.value = '';
    numOne = $result.value;
    operator = '';
    numTwo = '';
  } else {
    alert('숫자를 먼저 입력하세요.');
  }
});

// 초기화
document.querySelector('#clear').addEventListener('click', () => {
  numOne = '';
  numTwo = '';
  operator = '';
  $operator.value = '';
  $result.value = '';
});
