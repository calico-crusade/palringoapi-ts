var webpack = require('webpack');
var path = require('path');

function root(args) {
    var _root = path.resolve(__dirname);
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

module.exports = [
{
    entry: root('src', 'Palringo.ts'),
    output: {
        path: root(),
        filename: 'palringo-ts.min.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            'socket.io-client': root('node_modules', 'socket.io-client', 'dist', 'socket.io.min.js')
        }
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            include: [
                root('src')
            ],
            loader: 'ts-loader'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false, dead_code: true },
            mangle: true,
            sourceMap: false,
            beautify: false
        })
    ]
}];