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