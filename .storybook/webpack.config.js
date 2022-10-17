const path = require("path");

module.exports = async ({ config, mode }) => {
  
  config.module.rules.push(
    {
      test: /\.s(a|c)ss$/,
      include: path.resolve(__dirname, '../'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
        'sass-loader'
      ],
    },
  );


  return {
    ...config,
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, "../src"), ...config.resolve.modules]
    }
  };
};
