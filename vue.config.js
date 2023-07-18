const { defineConfig } = require('@vue/cli-service')




module.exports = defineConfig({
  


  devServer: {
    client: {
      overlay: false,
    },
    
    
    //跨域
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://api-driver.marsview.cc/api/mall/',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  //webpack打包时不生成map文件（未加密文件）
  productionSourceMap:false,

  // 删除页面预加载，实现真正按需加载
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  }
  
})
