#!/bin/bash
cd /home/kavia/workspace/code-generation/dreamscape-serenity-24026-134f384b/dreamscape_serenity
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

