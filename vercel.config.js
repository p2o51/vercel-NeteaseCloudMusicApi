// This file is used by Vercel for deployment configuration
module.exports = {
  // Specify the version of Node.js to use
  version: 2,
  // Specify the build command
  build: {
    env: {
      NODE_ENV: 'production'
    }
  },
  // Specify the routes
  routes: [
    { src: '/(.*)', dest: '/' }
  ]
};
