# MIOFramework

The MIO Framework!

Have you ever wished to share code between platforms? Do you like the Apple frameworks but you want/need to develop in other platforms? Code sharing and Apple frameworks on different platforms; we are making that possible.

MioLabs is porting the Apple frameworks like Foundation, UIKit and CoreData to other platforms such as the web, backend servers and hardware microcontrollers!

We choose Swift as our main language programming and now you can share both the programming logic and language and use the same API you already know and love!  We have ported the libraries and created a compiler/transpiler, all based around Apple frameworks and Swift language, for the other platforms/environments. 

This is currently under heavy development, but we have come a long way from where we were two years ago when we started to port these frameworks to the web.  Now we are taking another step forward implementing Swift code into all platforms making code sharing possible and making you into a faster, more efficient developer. 

The MIOLabs team!

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
