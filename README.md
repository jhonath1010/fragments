# Fragments

Fragments back-end API.

## Install

Install dependencies:

```bash
npm install
```

## Lint

Run ESLint:

```bash
npm run lint
```

## Start

Start the server:

```bash
npm start
```

The server runs at:

```text
http://localhost:8080
```

Use `Ctrl + C` to stop the server.

## Development

Start the server in development/watch mode:

```bash
npm run dev
```

The server automatically restarts when source files change.

Use `Ctrl + C` to stop the server.

## Debug

Start the server in debug mode:

```bash
npm run debug
```

You can also use the VSCode Run and Debug configuration:

```text
Debug via npm run debug
```

Set a breakpoint in `src/app.js` and send a request:

```bash
curl localhost:8080
```

## Testing the API

Open in a browser:

```text
http://localhost:8080
```

Or use curl with jq:

```bash
curl -s localhost:8080 | jq
```
