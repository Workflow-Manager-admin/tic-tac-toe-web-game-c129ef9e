#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tic-tac-toe-web-game-c129ef9e/react_js_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

