// This file is used by Vercel for deployment
const fs = require('fs');
const path = require('path');
const express = require('express');
const { serveNcmApi } = require('./server');

// For Vercel, we need to export a function that returns an Express app
module.exports = async (req, res) => {
  // Try to create a temporary anonymous_token file if it doesn't exist
  // But don't fail if we can't write to the file system (which is likely in serverless environments)
  try {
    const tmpPath = require('os').tmpdir();
    if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
      fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8');
    }
  } catch (e) {
    console.log('Warning: Could not create anonymous_token file, continuing without it');
  }

  // Initialize the API server
  const app = await serveNcmApi({
    checkVersion: false,
  });

  // Handle the request
  return app(req, res);
};
