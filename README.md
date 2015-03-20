# detect-git

Get some metadata about the current directory, including:
 - Whether Git is installed on the system (in the PATH that is)
 - Whether the current directory is inside a Git repository
 - The canonical remote URL for that repository

## Requires
 - Node 0.10 (works in io.js i'm sure)
 - Git 1.5 or later if you want more metadata than "git is not installed"

## Usage

``js
var detectGit = require('detect-git');

detectGit(function(metadata) {
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

The module is a function that takes one argument, a callback. The callback will be called with a plain object with up to three properties:

 - `gitInstalled` true if Git was found in the path
 - `inGitRepo` true if the current directory is in a Git repo (does not determine whether the current dir is in the index, though)
 - `repositoryUrl` Commonly a repo has one and only one remote. This will be the URL. Under other circumstances it'll just be the URL of the first remote to be added.


