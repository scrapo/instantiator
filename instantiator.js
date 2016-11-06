const functionCommentsRegExp = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const functionArgumentsRegExp = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
const functionArgumentDelimiterRegExp = /,/;
const functionArgumentRegExp = /^\s*(_?)(.+?)\1\s*$/;

function getFunctionArguments(fn) {
	var args = [];
	fn.toString().replace(functionCommentsRegExp, '').match(functionArgumentsRegExp)[1].split(functionArgumentDelimiterRegExp).forEach(function (argument) {
		argument.replace(functionArgumentRegExp, function (all, underscore, name) {
			args.push(name);
		});
	});
	return args;
}

function orderArrayByKeys(array, keys) {
	var result = [];
	keys.forEach(function (key) {
		result.push(array[key]);
	});
	return result;
}

module.exports.run = function (fn, args) {
	return fn.apply(null, orderArrayByKeys(args, getFunctionArguments(fn)));
};

module.exports.instantiate = function (fn, args) {
	return new (function () {
		fn.apply(this, orderArrayByKeys(args, getFunctionArguments(fn)));
	});
};