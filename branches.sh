#!/bin/bash

branch=""
branches=`git branch --list`

# requires git > v.1.7.9

# you can set branch's description using command
# git branch --edit-description
# this opens the configured text editor, enter message, save and exit
# if one editor does not work (for example Sublime does not work for me)
# try another one, like vi

# you can see branch's description using
# git config branch.<branch name>.description

while read -r branch; do
  # git marks current branch with "* ", remove it
  clean_branch_name=${branch//\*\ /}
  description=`git config branch.$clean_branch_name.description`
  printf "%-15s %s\n" "$branch" "$description"
done <<< "$branches"

