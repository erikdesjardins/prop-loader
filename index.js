/**
 * @author Tobias Koppers @sokra
 * @author Erik Desjardins
 * See LICENSE file in root directory for full license.
 */

module.exports = function(source) {
	this.cacheable && this.cacheable();
	var value = typeof source === 'string' ? JSON.parse(source) : source;
	var path = this.query ? this.query.slice(1).split('.') : [];
	var prop = path.reduce(function(obj, key) { return obj[key] }, value);
	return 'module.exports = ' + JSON.stringify(prop, undefined, '\t') + ';';
};
