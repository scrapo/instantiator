const assert = require('assert');
const instantiator = require('../instantiator');

suite('instantiator', function () {
	suite('run', function () {
		test('with function and arguments returns result', function () {
			assert.deepStrictEqual(instantiator.run(function (a, b, c) { return [a, b, c]; }, {b: 42}), [undefined, 42, undefined]);
		});
		test('with function and arguments returns result', function () {
			assert.deepStrictEqual(instantiator.run(function (a, b, c) { return [a, b, c]; }, {b: 2, a: 1, c: 3}), [1, 2, 3]);
		});
	});
	suite('instantiate', function () {
		test('with class and arguments returns result', function () {
			const classFunction = function (a, b, c) { this.get = function () { return [a, b, c]; }; };
			assert.deepStrictEqual(instantiator.instantiate(classFunction, {b: 42}).get(), [undefined, 42, undefined]);
		});
		test('with class and arguments returns result', function () {
			const classFunction = function (a, b, c) { this.get = function () { return [a, b, c]; }; };
			assert.deepStrictEqual(instantiator.instantiate(classFunction, {b: 2, a: 1, c: 3}).get(), [1, 2, 3]);
		});
	});
});