module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    },
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{
            '/mi':{
                target:'http://mi.rzi2016.online/mi/',// 要访问的接口域名
                changeOrigin: true,//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite:{
                    '^/mi':''   //路径重写，
                }
            }
        }
    }
}