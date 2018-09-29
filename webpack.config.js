var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path:path.resolve(__dirname, 'public/build'),
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    mode: 'development',
    module: {
        rules:[
            {
                loader:'babel-loader',
                exclude:/(node_modules)/,
                query:{
                    presets:['react','es2015']
                }
            }
        ]

    }
}