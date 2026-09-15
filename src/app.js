// src/app.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// author and version from our package.json file
// TODO: make sure you have updated your name in the `author` section
const { author, version } = require('../package.json');

const logger = require('./logger');
const pino = require('pino-http')({
  // Use our default logger instance, which is already configured
  logger,
});

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express();

// Use pino logging middleware
app.use(pino);

// Use helmet security middleware
app.use(helmet());

// Use CORS middleware so we can make requests across origins
app.use(cors());

// Define a simple health check route. If the server is running
// we'll respond with a 200 OK. If not, the server isn't healthy.
app.get('/', (req, res) => {
  // Clients shouldn't cache this response
  res.setHeader('Cache-Control', 'no-cache');

  // Send a 200 'OK' response with info about our repo
  res.status(200).json({
    status: 'ok',
    description: 'fragments service running',
    author,
    githubUrl: 'https://github.com/jhonath1010/fragments',
    version,
    timestamp: new Date().toISOString(),
  });
});

// Add 404 middleware
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: {
      message: 'not found',
      code: 404,
    },
  });
});

// Add error-handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'unable to process request';

  if (status > 499) {
    logger.error({ err }, `Error processing request`);
  }

  res.status(status).json({
    status: 'error',
    error: {
      message,
      code: status,
    },
  });
});

module.exports = app;