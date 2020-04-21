#!/bin/bash

PS3='git command to run for all templates: '
options=("pull" "push" "add" "commit" "checkout")

select opt in "${options[@]}"
do
    case $opt in
        "pull")
            find ./templates -mindepth 1 -maxdepth 1 -type d -print -exec git -C {} pull \;
            ;;
        "push")
            find ./templates -mindepth 1 -maxdepth 1 -type d -print -exec git -C {} push \;
            ;;
        "add")
            echo What do you want to add?
            read files_to_add
            find ./templates -mindepth 1 -maxdepth 1 -type d -print -exec git -C {} add $files_to_add \;
            ;;
        "commit")
            echo What is the commit message?
            read commit_msg

            find ./templates -mindepth 1 -maxdepth 1 -type d -print -exec git -C {} commit -m "$commit_msg" \;
            ;;
        "checkout")
            echo What branch do you want to checkout to?
            read branch_name
            find ./templates -mindepth 1 -maxdepth 1 -type d -print -exec git -C {} checkout $branch_name \;
            ;;
        *) echo "invalid option $REPLY";;
    esac
done