var path = require('path');

module.exports = {
    entry: [
        './component/navbar.jsx'
    ],
    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'bundle.js',
    },
    externals: {
        "socket.io": "io"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js$|\.jsx$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: __dirname
        }]
    },
};

