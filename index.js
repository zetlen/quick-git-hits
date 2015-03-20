var buffspawn = require('buffered-spawn');

module.exports = function(cb) {
  var detected = {};
  buffspawn('git', ['rev-parse', '--is-inside-work-tree'], function(err, stdout, stderr) {
    if (!err) {
      detected.gitInstalled = detected.inGitRepo = true;
    } else if (err.status === -128 || stderr.indexOf('Not a git repository') !== -1) {
      detected.gitInstalled = true;
      detected.inGitRepo = false;
    } else {
      detected.gitInstalled = detected.inGitRepo = false;
    }

    
    if (detected.inGitRepo) {
      buffspawn('git', ['ls-remote', '--get-url'], function(err, stdout, stderr) {
        if (!err && stdout) {
          detected.repositoryUrl = stdout;
        }
        cb(detected);
      });
    } else {
      cb(detected)
    }

  });
};