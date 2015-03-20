var buffspawn = require('buffered-spawn');

module.exports = {
  detectDirectory: function(dir, cb) {
    var detected = {};
    buffspawn('git', ['rev-parse', '--is-inside-work-tree'], {
      cwd: dir
    }, function(err, stdout, stderr) {
      if (!err) {
        detected.gitInstalled = detected.inGitRepo = true;
      } else if (err.status === -128 || stderr.indexOf('Not a git repository') !== -1) {
        detected.gitInstalled = true;
        detected.inGitRepo = false;
      } else {
        detected.gitInstalled = detected.inGitRepo = false;
      }


      if (detected.inGitRepo) {
        buffspawn('git', ['ls-remote', '--get-url'], {
          cwd: dir
        }, function(err, stdout, stderr) {
          if (err) {
            cb(err);
          }
          if (stdout) {
            detected.repositoryUrl = stdout;
          }
          cb(null, detected);
        });
      } else {
        cb(null, detected)
      }

    });
  },
  createRepoInDirectory: function(dir, opts, cb) {
    buffspawn('git', ['init'], { cwd: dir }, function(err) {
      if (err) {
        cb(err);
      }
      if (opts && opts.repositoryUrl) {
        buffspawn('git', ['remote', 'add', 'origin', opts.repositoryUrl], cb);
      } else {
        cb(null);
      }
    });
  }
}