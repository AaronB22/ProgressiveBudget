const config = {
    entry:{
        app: './src/public/index.js',
    },
    output: {
        path:__dirname + '/dist'
    },
    mode: 'development',
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        ],
      },
      plugins: [
        new WebpackPwaManifest({
          fingerprints: false,
          name: 'Newsy app',
          short_name: 'Newsy',
          description: 'An application that allows you to view different news articles and save your favorites.',
          background_color: '#01579b',
          theme_color: '#ffffff',
          'theme-color': '#ffffff',
          start_url: '/',
          icons: [
            {
              src: path.resolve('src/public/icons/icon-192x192.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('assets', 'icons'),
            },
          ],
        }),
      ],
}

module.exports= config