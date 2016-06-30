'use strict';

const exeq = require('exeq');
const child_process = require('child_process');
const expect = require('expect.js');

describe('git-br', () => {
  before(done => {
    exeq([
      'git checkout -b test-with-description',
      'git checkout -b test-without-description',
      'git config branch.test-with-description.description "description text"',
      'git checkout -b test-delete-branch',
    ]).then(() => done());
  });

  after(done => {
    exeq([
      'git checkout master',
      'git branch -D test-with-description',
      'git branch -D test-without-description',
      'git branch -D test-delete-branch',
    ]).then(() => done());
  });

  it('list branches with description', done => {
    child_process.exec('./branches.sh --no-color', function(err, stdout) {
      expect(err).to.eql(null);
      expect(stdout).to.contain('  test-with-description description text\n');
      expect(stdout).to.contain('  test-without-description \n');
      done();
    });
  });

  it('delete branches', done => {
    child_process.exec('./branches.sh -D test-delete-branch', function(err, stdout) {
      expect(err).to.eql(null);
      expect(stdout).to.not.contain('* test-delete-branch \n');
      expect(stdout).to.not.contain('  test-delete-branch \n');
      done();
    });
  });

});
