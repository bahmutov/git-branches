#!/bin/bash

branches=`git branch --list`

while read -r branch; do
  # git marks current branch with "* ", remove it
  clean_branch_name=${branch//\*/}
  clean_branch_name=${clean_branch_name//\ /}
  description=`git config branch.$clean_branch_name.description`
  echo "$branch $description"
done <<< "$branches"

