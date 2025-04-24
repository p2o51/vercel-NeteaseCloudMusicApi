// This file is used by Vercel for deployment
const fs = require('fs');
const path = require('path');
const express = require('express');
const { serveNcmApi } = require('./server');

// For Vercel, we need to export a function that returns an Express app
module.exports = async (req, res) => {
  // Create a temporary anonymous_token file if it doesn't exist
  const tmpPath = require('os').tmpdir();
  if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
    fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8');
  }

  // Initialize the API server
  const app = await serveNcmApi({
    checkVersion: false,
  });

  // Handle the request
  return app(req, res);
};
