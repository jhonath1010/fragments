// src/routes/index.js

const express = require('express');

const { version, author } = require('../../package.json');
const { authenticate } = require('../auth');
const { createSuccessResponse } = require('../response');

const router = express.Router();

// Mount our API routes under /v1
router.use('/v1', authenticate(), require('./api'));

// Define a health check route
router.get('/', (req, res) => {
  // Prevent clients and proxies from caching this response
  res.setHeader('Cache-Control', 'no-cache');

  // Return information about the running service
  res.status(200).json(
    createSuccessResponse({
      description: 'fragments service running',
      author,
      githubUrl: 'https://github.com/jhonath1010/fragments',
      version,
      timestamp: new Date().toISOString(),
    })
  );
});

module.exports = router;