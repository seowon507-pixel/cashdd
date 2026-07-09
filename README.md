# 원/달러 환율봇

## 다운로드

1. GitHub 저장소로 이동: https://github.com/seowon507-pixel/cashdd
2. 초록색 **Code** 버튼 클릭 → **Download ZIP** 클릭
3. 다운로드된 zip 파일 압축 해제

## 실행 방법

자세한 그림 안내는 `guide.html` 파일을 더블클릭해서 보세요.

요약:
1. Terminal 앱을 엽니다.
2. 아래 명령어를 순서대로 입력합니다.
   ```
   cd ~/Desktop/money
   npm install
   node server.js
   ```
3. 브라우저에서 http://localhost:3000 을 엽니다.
4. 종료하려면 터미널에서 Control + C를 누르세요.

(`start.command` 더블클릭도 가능하지만 macOS 보안 경고가 뜰 수 있어 터미널 실행을 권장합니다.)

## API 키 설정

`.env` 파일에 아래 두 값이 필요합니다 (이미 설정되어 있다면 넘어가세요).

```
EXIM_API_KEY=한국수출입은행 API 키
FINNHUB_API_KEY=Finnhub API 키
```
