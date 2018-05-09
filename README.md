# MIOFramework

The MIO Framework!

## Subtrees

In `package.json` we keep a list of push and pull commands for the added remotes.

All marked with a prefix (currently):

* `bt` - MIOBuildTool
* `l` - MIOLibs
* `st` - MIOSwiftTranspiler

You can use `pull`/`push` separately. I advice you to use only the pull from this repository for the remote subtrees.
> Because if you push a change from here, you have to pull it and squash it as well, that leads to 2 commits in this repository. 

To make your life easier `npm run pull` runs all subtree pulls one by one.

```bash
npm run pull
```

### If you need to add a new remote subtree

1. Add the subree to the repository.

  ```bash
  git subtree add --prefix MIOBuildTool https://github.com/miolabs/MIOBuildTool master
  ```

1. Add the appropriate commands to `package.json` by copying=modifying the existing lines properly.
1. Add the new `pull` command the the `pull` script in `package.json`.
