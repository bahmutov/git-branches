'use strict';

const exeq = require('exeq');
const child_process = require('child_process');
const expect = require('expect.js');

describe('git-br', () => {

  let currentBranch;

  beforeEach(done => {
    exeq([`git checkout ${currentBranch}`]).then(() => done()).catch(console.error);
  });

  before(done => {
    child_process.exec('git symbolic-ref --short HEAD', (err, stdout) => {

      currentBranch = stdout.trim();
      if (!currentBranch) {
        currentBranch = 'test-ci';
        // travis-ci just checkout FETCH_HEAD without branch.
        child_process.execSync(`git checkout -b ${currentBranch}`);
      }

      exeq([
        'git checkout -b test-with-description',
        'git checkout -b test-without-description',
        'git config branch.test-with-description.description "description text"',
        'git checkout -b test-delete-branch',
        'git symbolic-ref refs/heads/test-symbolic-ref-with-description refs/heads/test-with-description',
        'git symbolic-ref refs/heads/test-symbolic-ref-without-description refs/heads/test-without-description',
        `git checkout ${currentBranch}`, // Switch to current branch for test delete branch.
      ]).then(() => done()).catch(console.error);
    });
  });

  after(done => {
    exeq([
      `git checkout ${currentBranch}`,
      'git branch -D test-with-description',
      'git branch -D test-without-description',
      'git symbolic-ref -d refs/heads/test-symbolic-ref-with-description',
      'git symbolic-ref -d refs/heads/test-symbolic-ref-without-description',
    ]).then(() => done()).catch(console.error);
  });

  it('list branches with description', done => {
    child_process.exec('./branches.sh --no-color', function(err, stdout) {
      expect(err).to.eql(null);
      expect(stdout).to.contain(`* ${currentBranch} `);
      expect(stdout).to.contain('  test-with-description description text\n');
      expect(stdout).to.contain('  test-without-description \n');
      expect(stdout).to.contain('  test-symbolic-ref-with-description -> test-with-description description text\n');
      expect(stdout).to.contain('  test-symbolic-ref-without-description -> test-without-description \n');
      done();
    });
  });

  it('delete branches', done => {
    child_process.exec('./branches.sh -D test-delete-branch', (err, out) => {
      expect(err).to.eql(null);
      expect(out).to.contain('Deleted branch test-delete-branch ');

      child_process.exec('./branches.sh --no-color', function(er, stdout) {
        expect(er).to.eql(null);
        expect(stdout).to.contain(`* ${currentBranch} `);
        expect(stdout).to.contain('  test-with-description description text\n');
        expect(stdout).to.contain('  test-without-description \n');
        expect(stdout).to.contain('  test-symbolic-ref-with-description -> test-with-description description text\n');
        expect(stdout).to.contain('  test-symbolic-ref-without-description -> test-without-description \n');
        expect(stdout).to.not.contain('  test-delete-branch \n');
        done();
      });

    });
  });

});
