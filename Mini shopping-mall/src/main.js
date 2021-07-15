
// JSON 파일에서 item들을 가져온다
function loadItems() {
  // fetch를 이용해서 데이터를 받아온다
  return fetch('data/data.json')
  // 받아온 데이터가 성공적이면 JSON으로 변환한다
  .then(response => response.json())
  // JSON안에 있는 items를 return한다
  .then(json => json.items);
}

// json에 있는 items을 받아서 items들을 나열한다
function displayItems(items) {
  const container = document.querySelector(".items");
  // const html = items.map(items => createHTMLString(items));
  // console.log(html);

  // 각각의 items li tag로 변환한다.
  container.innerHTML = items.map(items => createHTMLString(items)).join("");
}

// jsonItems을 받아서 item을 li로 만든다. (문자열)
function createHTMLString(items) {
  return `
    <li class="item">
      <img src="${items.image}" alt="${items.type}" class="item_thumbnail" />
      <span class="item__description">${items.gender}, ${items.size}</span>
    </li>
  `;
}

// items 선택하기 
function setEventListeners(items) {
  // 버튼의 요소를 정의한다
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  // 버튼이 클릭되면 event가 발생한 버튼과, items도 인자로 전달해줌
  buttons.addEventListener("click", event => onButtonClick(event, items));
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  // 필터링 할 수 있는 정보가 들어있지 않다면 아무것도 처리하지 않고 함수를 끝낸다.
  if ( key == null || value == null) {
    return;
  }


  // 필터링 할 수 있는 정보가 들어있다면, 실행
  const filtered = items.filter(item => item[key] === value);
  displayItems(filtered);


}


  // main
  loadItems()
  .then(items => { 
    displayItems(items); 
    setEventListeners(items);
  })
  .catch(console.log);

// onButtonClick : 버튼이 클릭이 되면, 클릭이 될때 그 정보들을 이용해서 items를 필터링한다.
// 그 다음 displayItems를 다시 호출해서, 필터링 한 items를 최종적으로 화면에 보여준다.