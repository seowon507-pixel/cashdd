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

## 더블클릭으로 실행하기

`start.money.command` 파일을 더블클릭하면 서버 실행 + 브라우저 열기가 한 번에 됩니다.

- 처음 실행할 때 "Apple이 확인할 수 없음" 경고가 뜨면:
  1. **시스템 설정 → 개인정보 보호 및 보안**으로 이동
  2. 아래로 스크롤해서 `start.money.command` 옆의 **"그래도 열기"** 클릭
  3. 다시 더블클릭 → "열기" 확인
- 한 번 허용하면 그 다음부터는 경고 없이 바로 실행됩니다.

## API 키 설정

`.env` 파일에 아래 두 값이 필요합니다 (이미 설정되어 있다면 넘어가세요).

```
EXIM_API_KEY=한국수출입은행 API 키
FINNHUB_API_KEY=Finnhub API 키
```
