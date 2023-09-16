const Compiler = require('./Compiler');
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin');

const webpack = (options, callback) => {
  const compiler = new Compiler(options);
  compiler.options = options;
  new NodeEnvironmentPlugin().apply(compiler);
  if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				plugin.call(compiler, compiler);
			} else if (plugin) {
				plugin.apply(compiler);
			}
		}
	}

	return compiler;
}

exports = module.exports = webpack; 