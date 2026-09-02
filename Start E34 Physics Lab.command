#!/bin/zsh
set -e

cd "${0:A:h}"

if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js and npm are required. Install Node.js, then run this launcher again."
  read -r "?Press Return to close."
  exit 1
fi

echo "Starting the E34 Physics Laboratory…"
npm run start &
lab_server_pid=$!
trap 'kill "$lab_server_pid" 2>/dev/null || true' EXIT INT TERM

for attempt in {1..50}; do
  if curl --silent --fail http://127.0.0.1:5173/ >/dev/null 2>&1; then
    open http://127.0.0.1:5173/
    echo "Laboratory opened at http://127.0.0.1:5173/"
    echo "Keep this window open while using the laboratory. Press Control-C to stop."
    wait "$lab_server_pid"
    exit 0
  fi
  sleep 0.1
done

echo "The local server did not become ready. Review the npm error above."
wait "$lab_server_pid"
