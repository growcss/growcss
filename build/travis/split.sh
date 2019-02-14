#!/bin/bash

source ./build/travis/try_catch.sh
source ./build/travis/tfold.sh

git subsplit init git@github.com:narrowspark/framework.git

component_array=(
    'packages/coding-standard/babel-preset:git@github.com:growcss/babel-preset.git'
    'packages/coding-standard/browserslist-config-growcss:git@github.com:growcss/browserslist-config-growcss.git'
    'packages/coding-standard/eslint-config:git@github.com:growcss/eslint-config.git'
    'packages/coding-standard/babel-preset:git@github.com:growcss/babel-preset.git'
    'packages/coding-standard/stylelint-config:git@github.com:growcss/stylelint-config.git'
    'packages/core/elaborate:git@github.com:growcss/elaborate.git'
    'packages/core/image:git@github.com:growcss/image.git'
    'packages/core/spinner:git@github.com:growcss/spinner.git'
    'packages/core/xy-grid:git@github.com:growcss/xy-grid.git'
)

for i in "${component_array[@]}"
do
    try
        if [[ ! -z "$TRAVIS_TAG" ]]; then
            OPTION="--tags=\"${TRAVIS_TAG}\"";
        else
            OPTION="--heads=\"master\" --no-tags";
        fi

        tfold ${i##*:} "git subsplit publish $i --update ${OPTION}";
    catch || {
        exit 1
    }
done

rm -rf .subsplit
