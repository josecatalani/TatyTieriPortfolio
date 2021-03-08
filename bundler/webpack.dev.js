const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            host: '0.0.0.0',
            contentBase: './dist',
            open: true,
            https: false,
            useLocalIp: true
        }
    }
)
