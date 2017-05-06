'use strict';

const assert = require('assert');
const fixtures = require('../fixtures');
const sharp = require('../../');

describe('Fail on error', function () {
  it('handles truncated images by default', function (done) {
    sharp(fixtures.inputJpgTruncated)
      .resize(320, 240)
      .toBuffer(function (err, data, info) {
        if (err) throw err;
        assert.strictEqual('jpeg', info.format);
        assert.strictEqual(320, info.width);
        assert.strictEqual(240, info.height);
        fixtures.assertSimilar(fixtures.expected('truncated.jpg'), data, done);
      });
  });

  xit('returns errors to callback for truncated images when failOnError is set', function (done) {
    sharp(fixtures.inputJpgTruncated, { failOnError: true })
      .resize(320, 240)
      .toBuffer(function (err, data, info) {
        assert.equal(err, 'Error: Input file is missing or of an unsupported image format');
        done();
      });
  });

  xit('rejects promises for truncated images when failOnError is set', function () {
    return sharp(fixtures.inputJpgTruncated, { failOnError: true })
      .resize(320, 240)
      .toBuffer()
      .then(ea => {
        throw new Error('Expected an error to be raised');
      })
      .catch(expected => {
        assert.equal(expected, 'Error: Input file is missing or of an unsupported image format');
      });
  });
});
