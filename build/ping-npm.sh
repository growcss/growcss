#!/usr/bin/env bash

OK="OK"
ERROR="ERROR"

NPM_REGISTRY="registry.npmjs.org"

NPM_PING_STATUS=`ping -c 1 ${NPM_REGISTRY} > /dev/null && echo ${OK} || echo ${ERROR}`
NPM_HTTP_STATUS=`curl "https://"${NPM_REGISTRY} -k -s -f -o /dev/null && echo ${OK} || echo ${ERROR}`

echo "npm ping status: $NPM_PING_STATUS"
echo "npm http status: $NPM_HTTP_STATUS"

if [[ [ ${NPM_HTTP_STATUS} = ${ERROR} ] ]]; then
    echo "Network failure";
    exit 1;
fi
