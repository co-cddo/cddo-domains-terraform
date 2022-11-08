#!/usr/bin/env bash
set -euo pipefail

CWD="$PWD"
if [[ $PWD = */router ]]; then
  cd ../../../
elif [[ $PWD = */build ]]; then
  cd ../
fi

cd cdn/functions/router/

if [ -n "$(command -v nvm || echo '')" ]; then
  nvm install
  nvm use
fi

if [ -z "$(command -v npm || echo '')" ]; then
  echo "npm command not found!"
  exit 1
fi

npm install
npm test

cd "$CWD"
