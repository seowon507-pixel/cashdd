# 원/달러 환율봇

## 다운로드

1. GitHub 저장소로 이동: https://github.com/seowon507-pixel/cashdd
2. 초록색 **Code** 버튼 클릭 → **Download ZIP** 클릭
3. 다운로드된 zip 파일 압축 해제

## 실행 방법 (Mac)

1. 압축 해제한 `money` 폴더를 엽니다.
2. `start.command` 파일을 더블클릭합니다.
   - 처음 실행할 때 "확인되지 않은 개발자" 경고가 뜨면: 파일을 **control(⌃) 키를 누른 채 클릭** → **열기**를 선택하세요.
3. 잠시 후 브라우저가 자동으로 열리고 환율봇이 화면에 나타납니다.
4. 끄고 싶으면 열려 있는 터미널 창을 닫으세요.

## API 키 설정

`.env` 파일에 아래 두 값이 필요합니다 (이미 설정되어 있다면 넘어가세요).

```
EXIM_API_KEY=한국수출입은행 API 키
FINNHUB_API_KEY=Finnhub API 키
```
