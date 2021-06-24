'use strict';

const startSlider = function() {

  // 변수 지정
  const $slideWrap = document.querySelector('.container'),
        $slideContainer = document.querySelector('.slider-container'),
        $slide = document.querySelectorAll('.slide-list'),
        $prev = document.getElementById('prev'),
        $next = document.getElementById('next'),
        $pager = document.querySelector('.pager');

  // 슬라이드 갯수
  let $slideCount = $slide.length; 

  // 현재 index 
  let $currentIndex = 0; 

  // setInterval 전역 변수
  let $timer;

  //  페이지 버튼 변수
  let $pagerHTML = '';
  
  // 슬라이드가 있으면 가로로 배열하기
  for (let i = 0; i < $slideCount; i++) {
    $slide[i].style.left = i * 100 + '%';

    // 페이지 버튼 그리기 <span data-idx="0">1</span>
    $pagerHTML += `<span data-idx="${i}">${i+1}</span>`;
    $pager.innerHTML = $pagerHTML;
  }
  const $pagerBtn = document.querySelectorAll('.pager span');

  // 슬라이드 이동 함수 
  function goToSlide(index) {
    $slideContainer.classList.add('animated');
    $slideContainer.style.left = -100 * index + '%';
    $currentIndex = index;
    prevBtnAdd();

    // 현재 index에 페이지 버튼 활성화
    for (let n = 0; n < $pagerBtn.length; n++) {
      $pagerBtn[n].classList.remove('active');
    }
    $pagerBtn[index].classList.add('active');
  }
  goToSlide(0);

  // 자동 슬라이드
  function autoSlide() {
    $timer = setInterval(function() {
      let nextIndex = ($currentIndex + 1) % $slideCount; // 나눈 나머지
      goToSlide(nextIndex);
    }, 3000)
  }
  autoSlide();

  // 마우스 멈춤 or 시작
  function stopSlide() {
    clearInterval($timer);
  }

  $slideWrap.addEventListener('mouseenter', function() {
    stopSlide();
  });

  $slideWrap.addEventListener('mouseleave', function() {
    autoSlide();
  });

  // 이전버튼 추가, 삭제
  function prevBtnAdd() {
    if ($currentIndex !== 0) {
      $prev.classList.add('add');
    } else {
      $prev.classList.remove('add');
    }
  }

  // 버튼을 클릭하면 슬라이드 이동
  $prev.addEventListener('click', function() {
    if ($currentIndex == 0) {
      goToSlide($slideCount - 1);
    } else {
      goToSlide($currentIndex - 1);
    }  
  });

  $next.addEventListener('click', function() {
    if ($currentIndex == $slideCount - 1) {
      goToSlide(0);
    } else {
      goToSlide($currentIndex + 1);
    }   
  });

  // 페이지 버튼 클릭시 슬라이드 이동
  for (let j = 0; j < $pagerBtn.length; j++) {
    $pagerBtn[j].addEventListener('click', function(evevnt) {
      //console.log(evevnt.target.innerText);

      //let pagerNum = evevnt.target.getAttribute('data-idx');
      let pagerNum = evevnt.target.innerText - 1; // span
      goToSlide(pagerNum);
    });
  }
  

}
startSlider();
