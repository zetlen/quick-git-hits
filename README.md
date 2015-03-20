# quick-git-hits

Very small utilites for some common Git activities that you might want to automate during a Node workflow. Utterly without rhyme or reason in terms of what is included. Work in progress. Don't use. Don't even continue reading. What are you doing here? You definitely want [nodegit](https://github.com/nodegit/nodegit) and not this. It's big and featureful and who doesn't want that.

## Requires
 - Node 0.10 (works in io.js i'm sure)
 - Git 1.5 or later if you want more metadata than "git is not installed"

## Usage

```js
var quickGitHits = require('quick-git-hits');
```

This object has some static methods on it.

### `quickGitHits.detectDirectory(dir, cb)`

Get some metadata about the passed directory, including:
 - Whether Git is installed on the system (in the PATH that is)
 - Whether the current directory is inside a Git repository
 - The canonical remote URL for that repository

```js
var detectGit = require('detect-git');

quickGitHits.detectDirectory( process.cwd(), function(err, metadata) {
    if (err) throw err;
    if (metadata.gitInstalled) {
        console.log('Git is installed! Good job.')
    }
    if (metadata.inGitRepo) {
        console.log('The current directory is inside a Git working tree. Go crazy!')
    }
    if (metadata.repositoryUrl) {
        console.log('The canonical remote for this repository is ' + metadata.repositoryUrl);
    }
});
```

#### Arguments
 - `dir` *(string)* A directory, often just `process.cwd()`.
 - `cb` *(function)* A callback. The callback will be called Node-style, with any errors as the first argument, and  with a plain object with up to three properties as the second:

 - `gitInstalled` true if Git was found in the path
 - `inGitRepo` true if the current directory is in a Git repo (does not determine whether the current dir is in the index, though)
 - `repositoryUrl` Commonly a repo has one and only one remote. This will be the URL. Under other circumstances it'll just be the URL of the first remote to be added.


### `quickGitHits.createRepoInDirectory(dir, opts, cb)`

Create a repository in the passed directory. If `opts.repositoryUrl` is specified, add the specified URL as the remote `origin`.

```js
var detectGit = require('detect-git');

quickGitHits.createRepoInDirectory( process.cwd(), { repositoryUrl: 'zetlen/quick-git-hits' }, function(err) {
    if (err) throw err;
    console.log('Repo created. Enjoy!');
});
```

#### Arguments
 - `dir` *(string)* A directory, often just `process.cwd()`.
 - `options` *(object)* An object of options. The following properties work:
    - `repositoryUrl` *(string)* The URL to a remote repository that the new local repo should set as a remote.
 - `cb` *(function)* A callback. The callback will be called Node-style, with any errors as the first argument. If the first argument is null, you win.

## License

ISC, which you'll have to look up. Beats the heck out of me.