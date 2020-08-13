@echo off
ECHO *** SETTING UP GIT CREDENTIALS
git config --global user.email "jdanks@bowdark.com"
git config --global user.name "Jacob Danks"
ECHO *** SOURCE BRANCH IS %BUILD_SOURCEBRANCH%
IF %BUILD_SOURCEBRANCH% == refs/heads/master (
   ECHO Building master branch so no merge is needed.
   EXIT
)
SET sourceBranch=origin/%BUILD_SOURCEBRANCH:refs/heads/=%
ECHO *** GIT CHECKOUT MASTER
git checkout master
ECHO *** GIT STATUS
git status
ECHO *** GIT MERGE %sourceBranch% INTO master
git merge %sourceBranch% -m "Merge to master"
ECHO *** GIT STATUS
git status
ECHO *** GIT PUSH
git push origin
ECHO *** GIT STATUS
git status
