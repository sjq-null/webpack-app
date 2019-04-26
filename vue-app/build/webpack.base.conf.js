const path = require('path');

// 路径处理函数
const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    app: './src/main.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 引入 js vue json 文件时可以不用写后缀名
    alias: {
      '@': resolve('src'), // 配置 @ 指向 src
    },
  },
  module: {
    /**
    * 我们在 vue 项目中需要 loader 来处理的有
    * vue 文件、js 文件、css/stylus 文件、图片/字体
    * 所以 rules 的编写就是如下所示
    */
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
        },
        include: [resolve('src')],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl(us)?$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 102400,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
      },
    ],
  },
};
