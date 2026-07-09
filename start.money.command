#!/bin/bash
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "필요한 패키지를 설치하는 중..."
  npm install
fi

node server.js &
SERVER_PID=$!

echo "서버를 시작하는 중..."
i=0
until curl -sf http://localhost:3000 >/dev/null || [ $i -ge 20 ]; do
  sleep 0.5
  i=$((i+1))
done

open http://localhost:3000
echo "환율봇이 실행되었습니다. 이 창을 닫으면 서버도 종료됩니다."

wait $SERVER_PID
