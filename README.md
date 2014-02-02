# git-branches

> List of local Git repository branches with their descriptions.

That's right: descriptions! This does not use anything custom, just
shows the information available in any git repo > v1.7.9

    git branch --edit-description
    # opens editor, write something, save and exit
    git config branch.master.description
    # shows description of branch master

Use the [braches.sh](branches.sh) script to show all branches
with their descriptions at once, for example, I have two branches

    $ ./branches.sh
    * master        this is master branch
    one             this is simple branch for testing

This is same information as `git branch`, with descriptions in the
second column.

### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/git-branches/issues) on Github
