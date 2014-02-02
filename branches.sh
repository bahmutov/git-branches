#!/bin/bash

branch=""
branches=`git branch --list`

while read -r branch; do
  # git marks current branch with "* ", remove it
  clean_branch_name=${branch//\*\ /}
  description=`git config branch.$clean_branch_name.description`
  printf "%-10s %s\n" "$branch" "$description"
done <<< "$branches"

