import test from 'ava';
import loader from '../index.js';

const json = JSON.stringify({
	version: '1.2.3',
	background: {
		scripts: ['background.js']
	},
	nil: null
});

function runLoader(data, query) {
	const context = {
		query: typeof query === 'undefined' ? '' : `?${query}`
	};
	return loader.call(context, data);
}

test('calls cacheable', t => {
	t.plan(1);
	const context = {
		cacheable: () => t.pass()
	};
	loader.call(context, '{}');
});

test('no query', t => {
	t.is(loader(json), 'module.exports = {"version":"1.2.3","background":{"scripts":["background.js"]},"nil":null};');
});

test('single property query', t => {
	t.is(runLoader(json, 'version'), 'module.exports = "1.2.3";');
});

test('deep query', t => {
	t.is(runLoader(json, 'background.scripts'), 'module.exports = ["background.js"];');
});

test('null-valued property', t => {
	t.is(runLoader(json, 'nil'), 'module.exports = null;');
});

test('fails on invalid json', t => {
	t.throws(() => loader('{'), 'Unexpected end of input');
});

test('fails on empty query', t => {
	t.throws(() => runLoader(json, ''), 'Property "" not found');
});

test('fails on non-existent property', t => {
	t.throws(() => runLoader(json, 'notARealProperty'), 'Property "notARealProperty" not found');
});

test('fails on non-existent deep property', t => {
	t.throws(() => runLoader(json, 'background.foobar'), 'Property "background.foobar" not found');
});

test('passing a js object', t => {
	const result = runLoader({ a: { b: { c: { d: ['e'] } } } }, 'a.b.c');
	t.is(result, 'module.exports = {"d":["e"]};');
});

test('null, no query', t => {
	t.is(runLoader(null), 'module.exports = null;');
});

test('fails on null with query', t => {
	t.throws(() => runLoader(null, 'prop'), "Cannot use 'in' operator to search for 'prop' in null");
});
