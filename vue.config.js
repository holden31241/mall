const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  devServer: {//跨域
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
  }
  
})
