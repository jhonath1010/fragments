#!/usr/bin/env bash
set -e

if [ ! -f package.json ]; then
  echo "Run this from the root of your existing Lab 1 fragments repo."
  exit 1
fi

echo "Installing ONLY Lab 2 backend dependencies..."
npm install --save dotenv passport passport-http-bearer aws-jwt-verify

echo "Updating existing Lab 1 startup scripts to use src/index.js..."
node <<'NODE'
const fs = require('fs');
const p = JSON.parse(fs.readFileSync('package.json', 'utf8'));
p.scripts = p.scripts || {};
p.scripts.start = 'node src/index.js';
p.scripts.dev = 'FRAGMENTS_LOG_LEVEL=debug nodemon ./src/index.js --watch src';
p.scripts.debug = 'FRAGMENTS_LOG_LEVEL=debug nodemon --inspect=0.0.0.0:9229 ./src/index.js --watch src';
fs.writeFileSync('package.json', JSON.stringify(p, null, 2) + '\n');
NODE

if ! grep -qxF '.env' .gitignore 2>/dev/null; then
  printf '\n# Don\x27t include .env, which might have sensitive information\n.env\n' >> .gitignore
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example. Add your Cognito Pool ID and Client ID."
else
  echo ".env already exists; left it unchanged."
fi

echo "Lab 2 dependency/script setup complete."
echo "Next: edit .env and src/routes/index.js GitHub URL, then npm run dev."
