# Git 常用命令速查表

> 创建版本库

``` bash

git clone <url>   # 克隆远程版本库
git init       # 初始化本地版本库

```

> 修改和提交

``` bash
git status              # 查看状态
git diff                    # 查看变更内容
git add .                   # 跟踪所有改动过的内容,提交到缓存区
git add <file>              # 跟踪指定文件，提交到缓存区
git mv <oldfile> <newfile>  # 文件名修改
git rm <file>               # 删除暂存区或分支上的文件, 同时工作区也不需要这个文件了
git rm --cached <file>      # 需要删除暂存区或分支上的文件, 但本地又需要使用, 只是不希望这个文件被版本控制
git commit -m "commit message" # 提交所有更新过的文件
git commit --amend          # 修改最后一次提交

```

> 查看提交历史

``` bash

git log              # 查看提交历史
git log --oneline    # 查看提交历史(精简模式)
git reflog           # 查看所有提交历史
git log -p <file>    # 查看指定文件的提交历史
git blame <file>     # 以列表的方式查看指定文件的提交历史
```

> 撤销

``` bash
git reset --hard 版本号    # 撤销工作目录中所有未提交文件的修改内容
git checkout HEAD <file> # 撤销指定的未提交文件的修改内容
git revert <commit>      # 撤销指定的提交
git stash                # 清空本地未提交的代码

```

> 分支和标签

``` bash
git branch                   # 查看当前 Git 仓库中所有的分支列表
git branch 分支名称           # 创建分支
git checkout 分支名或标签    # 切换到指定的分支或标签
git checkout -b 分支名称       # 创建新分支并切换到新分支
git branch <new-branch>      # 基于当前分支，创建一个新的分支
git branch -d 分支名称         # 删除本地分支
git tag                      # 列出所有本地标签
git tag <tagname>            # 基于最新提交创建标签
git tag -d <tagname>         # 删除指定标签

```

> 合并

``` bash
git merge 分支名称            # 合并指定分支到当前分支
git rebase <branch>          # 衍合指定分支到当前分支

```

> 合并冲突

如果在两个不同的分支中，对同一个文件进行了不同的修改，Git 就没法干净的合并它们。 此时，我们需要打开 这些包含冲突的文件然后手动解决冲突

> 远程操作

``` bash
git remote -v                         # 查看远程版本库信息
git remote show <remote>              # 查看指定远程版本库信息
git remote add <remote> <url>         # 添加远程版本库
git fetch <remote>                    # 拉取远程库代码
git pull <remote> <branch>            # 下载远程库代码及快速合并
git push <remote> <branch>            # 上传代码及快速合并
git push <remote> :<branch/tag-name>  # 删除远程分支或者标签
git push --tags                       # 上传所有标签

```

> 默认设置

``` bash
master  # 默认开发分支
origin  # 默认远程版本库
HEAD    # 默认开发分会
HEAD^   # HEAD的父提交

```

> 文件忽略

``` bash
# 创建一个名为 .gitignore 的配置文件
1. 以 # 开头的是注释 
2. 以 / 结尾的是目录 
3. 以 / 开头防止递归 
4. 以 ! 开头表示取反 
5. 可以使用 glob 模式进行文件和文件夹的匹配（glob 指简化了的正则表达式）


# glob 模式
# 所谓的 glob 模式是指简化了的正则表达式： 
1. 星号 * 匹配零个或多个任意字符 
2. [abc] 匹配任何一个列在方括号中的字符 （此案例匹配一个 a 或匹配一个 b 或匹配一个 c） 
3. 问号 ? 只匹配一个任意字符 
4. 在方括号中使用短划线分隔两个字符， 表示所有在这两个字符范围内的都可以匹配（比如 [0-9] 表示匹配 所有 0 到 9 的数字） 
5. 两个星号 ** 表示匹配任意中间目录（比如 a/**/z 可以匹配 a/z 、 a/b/z 或 a/b/c/z 等）

```
