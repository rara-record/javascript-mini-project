'use strict';

$(document).ready(function() {
    let number = $(".slides figure").length;
    let index = 0;
    let timer;


    // 자동 이미지 슬라이드 
    function slideTimes() {
        timer = setInterval(() => {
            if (index < number -1) {
                index++;
            }
            else {
                index = 0;
            }
            
            // 모든 이미지에서 active클래스를 제거 ===> 모두 opacity: 0; 
            $(".slides figure").removeClass("active");
            // index 순번에 따라 active ===> opacity: 1;
            $(".slides figure").eq(index).addClass("active");

            $(".pagination li").removeClass("active");
            $(".pagination li").eq(index).addClass("active");
        }, 4000);
    } 
    slideTimes();

    // 이전 버튼 클릭
    function prev() {
        $(".prev").on('click', function(e) {
            e.preventDefault();
            if (index > 0) {
                index--; 
            } else {
                index = number -1; 
            }
    
            $(".slides figure").removeClass("active");
            $(".slides figure").eq(index).addClass("active");
            $(".pagination li").removeClass("active");
            $(".pagination li").eq(index).addClass("active");    
        });
    }
    prev();

    // 다음 버튼 클릭
    function next() {
        $(".next").on('click', function(e){
            e.preventDefault();
            if( index < 2 ) {
                index++; 
            } else {
                index = 0; // index = 0번으로
            } 
    
            $(".slides figure").removeClass("active");
            $(".slides figure").eq(index).addClass("active");
            $(".pagination li").removeClass("active");
            $(".pagination li").eq(index).addClass("active");
        });
    };
    next();

    // 마우스 멈춤 or 다시 실행
    function stopSlide() {
        $(".slides figure").mouseenter(() => {
            clearInterval(timer);
        })
        .mouseleave(() => {
            slideTimes();
        });
        
        
    }
    stopSlide();

    // 페이지
    function paginate() {
        $(".pagination li").on('click', function(e){
            e.preventDefault();
            $(".pagination li").removeClass("active");
            $(this).addClass("active");
            index = $(this).index();
    
            $(".slides figure").removeClass("active");
            $(".slides figure").eq(index).addClass("active");	
        });
    }
    paginate();
});