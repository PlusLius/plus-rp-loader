> 编写一个自己的loader

1.实现功能:一个简单的模版替换功能

2.将中间的plus字段替换成我们要插入的html
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <header>我是头部</header>
    {{plus}}
    <footer>我是底部</footer>
</body>

</html>
```

>需要用到的包

1."html-loader"用于编译我们的插入html文件

2."html-webpack-plugin" 用于将我们的模版文件打包到dist目录

3."webpack"
我们的loader是基于webpack编写的

4."loader-utils"
用来拿到我们的config中的配置参数

>首先配置我们的webpack.config文件
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry:{
        app:'./plus.js'
    },
    output:{
        filename:'[name].js',
        output:path.resolve(__dirname,'dist')
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
```

>开始我们loader的编写

1.在我们的node__modules下面新建一个文件夹plus-rp-loader

2.阅读webpack-loader编写文档,详细说明:https://doc.webpack-china.org/development/how-to-write-a-loader/

```
const loaderUtils = require('loader-utils');
const fs = require('fs');

module.exports = function(source){
    //拿到我们的options参数
    const config = loaderUtils.getOptions(this)
    //读取我们要插入的文件
    const insertHtml = fs.readFileSync(config.insert, 'utf-8')
    //将我们的源文件中的模版替换成我们要插入的文件,并返回给下个Loader处理
    return source.replace('{{plus}}', insertHtml)
}
```
>运行我们的webpack就可以成功替换了
```
$ webpack 
```
>参考文章
```
1.https://doc.webpack-china.org/development/how-to-write-a-loader/
2.https://juejin.im/post/59df06e6f265da430d5701d0
```
