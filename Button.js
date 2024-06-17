// HTML 요소들 참조
const button = document.getElementById('movingButton');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');
const recordDisplay = document.getElementById('record');
const restartButton = document.getElementById('restartButton');

let startTime; // 타이머 시작 시간
let timerInterval; // 타이머 인터벌 ID
let bestTime = Infinity; // 최고 기록 시간
let moveTimeout; // 버튼 이동 타임아웃 ID

// 버튼의 초기 위치를 설정하는 함수
function setButtonPosition() {
    button.style.top = '50%';
    button.style.left = '50%';
}

// 버튼을 랜덤한 위치로 이동시키는 함수
function moveButton() {
    const windowHeight = window.innerHeight; // 창 높이
    const windowWidth = window.innerWidth; // 창 너비

    // 랜덤한 위치 계산
    const top = Math.random() * (windowHeight - button.clientHeight);
    const left = Math.random() * (windowWidth - button.clientWidth);

    // 버튼 위치 설정
    button.style.top = `${top}px`;
    button.style.left = `${left}px`;
}

// 버튼 위에 마우스가 있을 때 실행되는 함수
function onMouseOverButton() {
    const minDelay = 0; // 최소 딜레이 (0.05초)
    const maxDelay = 100; // 최대 딜레이 (0.1초)
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay; // 랜덤 딜레이 설정
    setTimeout(moveButton, randomDelay); // 랜덤 시간 후에 버튼 이동
}

// 마우스 오버 이벤트 리스너 추가
button.addEventListener('mouseover', onMouseOverButton);

// 버튼 클릭 이벤트 리스너 추가
button.addEventListener('click', () => {
    stopTimer(); // 타이머 멈춤
    message.style.visibility = 'visible'; // 성공 메시지 표시
    button.classList.add('success'); // 버튼에 성공 클래스 추가
    button.removeEventListener('mouseover', onMouseOverButton); // 마우스 오버 이벤트 리스너 제거
});

// 다시 시작 버튼 클릭 이벤트 리스너 추가
restartButton.addEventListener('click', () => {
    clearInterval(timerInterval); // 기존 타이머 인터벌 취소
    timerDisplay.textContent = 'Time: 0.0s'; // 타이머 초기화
    setButtonPosition(); // 버튼 초기 위치 설정
    message.style.visibility = 'hidden'; // 성공 메시지 숨김
    button.classList.remove('success'); // 버튼에서 성공 클래스 제거
    button.addEventListener('mouseover', onMouseOverButton); // 마우스 오버 이벤트 리스너 추가

    startTimer(); // 타이머 시작
});

// 타이머를 시작하는 함수
function startTimer() {
    startTime = Date.now(); // 타이머 시작 시간 기록
    timerInterval = setInterval(() => {
        Time = (Date.now() - startTime) / 1000; // 경과 시간 계산
        timerDisplay.textContent = `Time: ${Time.toFixed(1)}s`; // 타이머 표시 업데이트
    }, 100); // 0.1초마다 업데이트
}

// 타이머를 멈추는 함수
function stopTimer() {
    clearInterval(timerInterval); // 타이머 인터벌 취소
    if (Time < bestTime) {
        bestTime = Time; // 새로운 최고 기록 설정
        recordDisplay.textContent = `최고 기록: ${bestTime.toFixed(1)}s`; // 최고 기록 표시 업데이트
    }
}

// 페이지 로드 시 초기 설정
window.onload = () => {
    setButtonPosition(); // 버튼 초기 위치 설정
    startTimer(); // 타이머 시작
};
