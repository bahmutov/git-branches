#!/bin/bash

if [[ "$@" =~ "--no-color" ]]
then
  branches=`git branch --list --no-color`
else
  branches=`git branch --list --color`
fi

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
  # replace colors
  clean_branch_name=`echo $clean_branch_name | tr -d '[:cntrl:]' | sed -E "s/\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]//g"`
  description=`git config branch.$clean_branch_name.description`
	if [ "${branch::1}" == "*" ]; then
		printf "$branch $description\n"
	else
		printf "  $branch $description\n"
	fi
done <<< "$branches"

# example output
# $ ./branches.sh
# * master        this is master branch
# one             this is simple branch for testing
