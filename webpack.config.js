const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry:{
        app:'./plus.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            {
                test:/\.html$/,
                loader:'plus-rp-loader',
                options:{
                    insert:'./insert.html'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html'
        })
    ]
}