#!/bin/bash

branch=""
branches=`git branch --list`
#color codes
ESC_SEQ="\x1b["
COL_RESET=$ESC_SEQ"39;49;00m"
COL_RED=$ESC_SEQ"31;01m"

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
	if [ "${branch::1}" == "*" ]; then
		printf "$COL_RED$branch$COL_RESET $description \n"
	else
		printf "  $branch $description\n"
	fi  
done <<< "$branches"

# example output
# $ ./branches.sh
# * master        this is master branch
# one             this is simple branch for testing
