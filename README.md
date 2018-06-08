# MIOFramework

The MIO Framework!

Do you ever wished to share code between platforms? Do you like the Apple frameworks but you want/need to develop in other platforms? We are making that possible.

We are porting the Apple frameworks like Foundation, UIKit and CoreData to other platform or enviroments, like the web, backned servers and hadware development!

So you can share most of the loginc with the same language and the same API yopu arelady know!

For that we had to port the libs, create a compiler/trasnpiler for the other platforms/enviroments. 

This is currently under heavly devlopment, but we came from the exprience that we start 2 years ago to port al these frameworks for the web. Now we are taking an step forward to just no use in another platform the same logic, use the same code, making you more efficent and fast to develop

MIOLabs team!

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
