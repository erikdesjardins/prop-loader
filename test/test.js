import test from 'ava';
import loader from '../index.js';

const json = JSON.stringify({
	version: '1.2.3',
	background: {
		scripts: ['background.js']
	},
	nil: null
});

test('no query', t => {
	t.is(loader.call({}, json), 'module.exports = {"version":"1.2.3","background":{"scripts":["background.js"]},"nil":null};');
});

test('single property query', t => {
	t.is(loader.call({ query: '?version' }, json), 'module.exports = "1.2.3";');
});

test('deep query', t => {
	t.is(loader.call({ query: '?background.scripts' }, json), 'module.exports = ["background.js"];');
});

test('null-valued property', t => {
	t.is(loader.call({ query: '?nil' }, json), 'module.exports = null;');
});

test('fails on invalid json', t => {
	t.throws(() => loader.call({}, '{'), 'Unexpected end of JSON input');
});

test('fails on empty query', t => {
	t.throws(() => loader.call({ query: '?' }, json), 'Property "" not found');
});

test('fails on non-existent property', t => {
	t.throws(() => loader.call({ query: '?notARealProperty' }, json), 'Property "notARealProperty" not found');
});

test('fails on non-existent deep property', t => {
	t.throws(() => loader.call({ query: '?background.foobar' }, json), 'Property "background.foobar" not found');
});

test('passing a js object', t => {
	const result = loader.call({ query: '?a.b.c' }, { a: { b: { c: { d: ['e'] } } } });
	t.is(result, 'module.exports = {"d":["e"]};');
});

test('null, no query', t => {
	t.is(loader.call({}, null), 'module.exports = null;');
});

test('fails on null with query', t => {
	t.throws(() => loader.call({ query: '?prop' }, null), "Cannot use 'in' operator to search for 'prop' in null");
});
