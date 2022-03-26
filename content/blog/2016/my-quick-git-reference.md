---
title: My Quick Git Reference
date: 2016-10-04T00:00:00-05:00
tags:
  - git
---

I have started using git and here are some of my frequently used
commands.
```
git clone http://path/to/repo.git  # Retrieve a repo for work (auto checkout master branch into WorkingDir)
git init                           # Create new repository for work (auto checkout master branch into WorkingDir)
git init --bare                    # Create new repository without WorkingDir  - bare repo for server share only

git status             # Print current status of the repo
git branch -a          # List of all branches (including remote branches)
git tag                # List of all tags
git log -3                                      # Show last 3 commits
git log -30 --oneline                           # Show last 30 commits one per line
git log --decorate --graph --format='%h %an %s' # Show all log messages one per line in a graph
git log --reverse |head                         # Show first commit message
git show --stat <sha1> # Show what files changed on a commit
git diff               # Show diff all files between Index and WorkingDir
git diff readme.md     # Show diff of a file against Index
git diff master..topic # Show diff between two branches

git checkout -b topic               # Create a new topic branch and set as current branch
                                      (New branch starts from previous checkout branch)
git checkout -b topic origin/topic  # Create a new topic branch and set as current branch
                                      (New branch starts from origin/topic "remote" branch)
git branch --move topicA topicB     # Rename a branch
git branch -d topic                 # Delete a branch (use -D to force it)
git checkout master                 # Switch to master branch and set as current branch
git merge topic                     # Merge changes from topic branch onto current branch

git add .                        # Add files to Index
git add readme.md                # Add one file to Index
git add -A                       # Add everything to Index
git commit -m 'topic: my change' # Commit Index changes

git mv oldfile.md newfile.md     # Rename a file
git rm outdated.md               # Remove a file from Index and WorkingDir
git rm --cached outdated.md      # Remove a file from Index only (leave it in WorkingDir)

git remote add origin http://path/to/repo.git     # Setup remote repository
git remote set-url origin http://path/to/repo.git # Update remote repository
git remote -v                                     # List remote repositories

git push --set-upstream origin topic              # Push branch to remote first time
git push                                          # Push branch to remote second time
git push --all                                    # Push all the branches to remote!
git push origin :topic                            # Push and DELETE the remote branch!

git pull   # Fetch and merge the "auto tracked remote" branch onto current branch
git fetch  # Fetch only the "auto tracked remote" branch onto current branch

git checkout              # Restore WorkingDir from Index (will not override local modified files!)
git checkout -- readme.md # Restore a single WorkingDir file from Index

git reset          # Reset the HEAD and Index (same as --mixed)
git reset --soft   # Reset the HEAD only
git reset --hard   # Reset the HEAD, Index and WorkingDir!

git reflog         # Inpect any recent transactions and can be use to recover lost (unnamed) commits

git stash          # Put away all pending changes
git stash pop      # Bring back all pending changes
git stash list     # List all stashes
```
