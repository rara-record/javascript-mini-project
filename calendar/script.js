'use strict';

// 날짜 객체 가져오기
let date = new Date(); 

const calendar = function() {
    
    const week = document.querySelector(".week"); 
    const days = document.querySelector(".days"); 

    /* 현재 연도, 월, 일 */
    const y = date.getFullYear(); // 현재 연도
    const m = date.getMonth(); // 현재 월
    const d = date.getDate(); //현재 일

    // 매월 1일 
    const firstDay = new Date(y, m, 1);

    // 매월 1일의 index (요일)
    const firstDayIndex = firstDay.getDay(); 

    // 매월 마지막 날
    const lastDay = new Date(y, m+1, 0);

    // 매월 마지막 날짜 index (요일)
    const lastDayIndex = new Date(y, m+1 ,0).getDay();

    // 토요일까지만 공백
    const nextDays = 7 - lastDayIndex - 1; 

    // 요일 생성
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // 요일 뿌리기
    week.innerHTML = weekDays.map((week) => `<div class="weekdays">${week}</div>`).join("");

    // 월 생성
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    // 이번 달 표시
    document.querySelector("#calendar h2").innerHTML = months[date.getMonth()];
    document.querySelector("#calendar p").innerHTML = new Date().toDateString();

    // 태그, 공백 생성
    let tag = "";
    let blank = 0;

    // 1일 전 공백
    for (let p = 0; p < firstDay.getDay(); p+=1) {
        tag += `<div class="blank"> ${"[]"} </div>`;
        blank++;
    }
    // 날짜 뿌리기
    for (let i = 1; i <= lastDay.getDate(); i+=1) {
        if (( i == new Date().getDate()) && (m === new Date().getMonth())) {
            tag += `<div class="today"> ${i} </div>`;
        } else {
            tag += `<div class="day"> ${i} </div>`;
        }
        days.innerHTML = tag;
    }
    

    // 마지막 날짜 후 공백
    for (let n = 1; n <= nextDays; n+=1) {
        tag += `<div class="blank">${"[]"}</div>`;
        days.innerHTML = tag;
    }
};

// 이전 달
document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    calendar();
});

// 다음 달
document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    calendar();
});
calendar();




