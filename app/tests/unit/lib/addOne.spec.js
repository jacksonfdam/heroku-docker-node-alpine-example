'use strict'; //eslint-disable-line strict

/* global describe, it, before, beforeEach, afterEach, after */

const assert = require('assert');

const addOne = require('../../../lib/addOne.js');

describe('addOne', function () {

	it('adds 1 to the given parameter', function () {
		assert.strictEqual(addOne(1), 2);
		assert.strictEqual(addOne(0), 1);
        assert.strictEqual(addOne(10), 11);
	});
});