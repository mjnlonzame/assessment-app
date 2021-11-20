module.exports = {

  devServer: {
    proxy: {
      '^/api': {
        target: 'https://munti-assessment-service.herokuapp.com', // heroku
        // target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '/api/v1',
        },

      },
    },
  },

};
