#!/bin/bash

branches=`git branch --list`

while read -r line; do
    echo "$line"
    description=`git config branch.$line.description`
done <<< "$branches"

