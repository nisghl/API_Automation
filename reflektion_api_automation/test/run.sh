#!/bin/bash
echo "************************"
echo "Testing API REST Starting..."
echo "************************"
NOW=$(date  +%d-%m-%y-%H:%M) && ./node_modules/mocha/bin/mocha  test/runThis.js --timeout 100000 --reporter mochawesome --reporter-options enableCode=false, reportFilename=test-${NOW}
echo "************************"
echo "Testing API REST Ending..."
echo "************************"
jobs -p | xargs -I {} kill {}
