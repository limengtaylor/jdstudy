const path = require("path");
const uglify = require('uglifyjs-webpack-plugin'); //引入js压缩插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html打包插件
const extractTextPlugin = require("extract-text-webpack-plugin"); //css分离
var website ={
    publicPath:"http://localhost:8888/"
}
module.exports={
    mode:'development',
    //入口文件配置项
    entry:{
        main:'./src/jd.js',
        main2:'./src/com.js'
    },
    //出口文件配置项
    output:{
        //打包的路径
        path:path.resolve(__dirname,'../dist'),
        //打包的文件名称
        filename:'[name].js', //这里[]是告诉我们入口进入的文件是什么名字，打包出来也同样是
        publicPath:website.publicPath //publicPath主要作用就是处理静态文件路径的
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules:[
            //css loader
            {
                test:/\.css$/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{loader:"css-loader"},
/*                     {
                        loader:"postcss-loader",
                    }, */]
                })
/*                 use:[
                    {loader:"style-loader"},
                    {loader:"css-loader"}
                ] */
            },
            //图片loader
            {
                test:/\.(png|jpg|gif|jpeg)/, //匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        limit:500, //把小于500的文件打成Base64格式，写入js
                        outputPath:'images/', //打包后的图片放到images文件夹下
                    }
                }]
            },
            //处理HTML中图片
            {
                test:/\.(htm|html)$/i,
                use:['html-withimg-loader']
            },
            //less loader
            {
                test:/\.less$/,
                use:extractTextPlugin.extract({
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"less-loader"
                    }],
                    // use style-loader in development
                    fallback:"style-loader"
                })
/*                 use:[{
                    loader:"style-loader" // create style nodes from JS strings
                },{
                    loader:"css-loader" // translates CSS into CommonJS
                },{
                    loader:"less-loader" //compiles Less to CSS
                }] */
            },
            //scss loader
            {
                test:/\.scss$/,
                use:extractTextPlugin.extract({
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"sass-loader"
                    }],
                    fallback:"style-loader"
                })
/*                 use:[{
                    loader:"style-loader"
                },{
                    loader:"css-loader"
                },{
                    loader:"sass-loader"
                }] */
            }
        ]
    },
    //插件，用于生产模板和各项功能
    plugins:[
        new uglify(), //js压缩插件
        new HtmlWebpackPlugin({
            minify:{ //是对html文件进行压缩
                removeAttributeQuotes:true
            },
            hash:true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存js.
            template:'./src/jd3index.html' //是要打包的html模板路径和文件名称
        }),
        new extractTextPlugin("css/jd2.css")  //这里的/css/index.css是分离后的路径
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'../dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:8888
    }
}