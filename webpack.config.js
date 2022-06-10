// 引入一个包
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
  // 指定入口文件
  entry:"./src/index.ts",
  // 指定打包文件所在目录
  output:{
    path:path.resolve(__dirname,'dist'),
    // 打包文件后的文件
    filename:'bundle.js',
    // 告诉webpack不使用箭头函数和const
    environment:{
      arrowFunction:false,
      const:false
    }
  },
  // 指定webpack打包时要使用模块
  module:{
    // 指定要加载的规则
    rules:[
      // 处理ts文件的规则
      {
        test:/\.ts$/,
        // 要使用的loader
        use:[
          // 配置babel
          {
            // 指定加载器
            loader:'babel-loader',
            // 设置babel
            options:{
              // 设置预定义的环境
              presets:[
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets:{
                      // 要兼容的目标浏览器
                      "chrome":"58",
                      "ie":"11"
                    },
                    // 指定corejs的版本
                    "corejs":"3",
                    // 使用corejs的方法"usage"，表示按需加载
                    "useBuiltIns":"usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件夹
        exclude:/node-modules/
      },
      // 处理less文件的规则
      {
        test:/\.less$/,
        // 要使用的loader
        use:[
          'style-loader',
          'css-loader',
          // 引入postcss
          {
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[
                  [
                    // 浏览器兼容插件
                    'postcss-preset-env',
                    {
                      // 浏览器最新两个版本
                      browsers:'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  // 配置webpack插件
  plugins:[
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title:'这是一个自定义的title'
      template:'./src/index.html'
    })
  ],
  mode:'production',
  // 用来设置引用模块
  resolve:{
    extensions:['.ts','.js']
  }
}