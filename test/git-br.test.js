'use strict';

const exeq = require('exeq');
const child_process = require('child_process');
const expect = require('expect.js');

describe('git-br', () => {
  beforeEach(done => {
    console.log('switching to master branch');
    exeq(['git checkout master']).then(() => done()).catch(console.error);
  });

  before(done => {
    exeq([
      'git checkout -b test-with-description',
      'git checkout -b test-without-description',
      'git config branch.test-with-description.description "description text"',
      'git checkout -b test-delete-branch',
      'git checkout master', // Switch to master branch for test delete branch.
    ]).then(() => done());
  });

  after(done => {
    exeq([
      'git branch -D test-with-description',
      'git branch -D test-without-description',
    ]).then(() => done());
  });

  it.only('list branches with description', done => {
    child_process.exec('./branches.sh --no-color', function(err, stdout) {
      expect(err).to.eql(null);
      expect(stdout).to.contain('* master ');
      expect(stdout).to.contain('  test-with-description description text\n');
      expect(stdout).to.contain('  test-without-description \n');
      done();
    });
  });

  it('delete branches', done => {
    child_process.exec('./branches.sh -D test-delete-branch', (err, out) => {
      expect(err).to.eql(null);
      expect(out).to.contain('Deleted branch test-delete-branch ');

      child_process.exec('./branches.sh --no-color', function(er, stdout) {
        expect(er).to.eql(null);
        expect(stdout).to.contain('* master ');
        expect(stdout).to.contain('  test-with-description description text\n');
        expect(stdout).to.contain('  test-without-description \n');
        expect(stdout).to.not.contain('  test-delete-branch \n');
        done();
      });

    });
  });

});
