const express = require('express');

const app = express();
// Uppcoder runs the app behind nginx: it listens on 127.0.0.1:APP_PORT
// (APP_PORT defaults to 8000). PORT is honoured for local runs.
const PORT = process.env.APP_PORT || process.env.PORT || 8000;
const startedAt = new Date();

app.use(express.json());

// Home page: proves the app is up and shows the available routes.
app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>uppcoder-starter</title></head>
<body style="font-family: system-ui, sans-serif; margin: 2rem; line-height: 1.6;">
  <h1>uppcoder-starter is running</h1>
  <p>This Express app runs on an Uppcoder Spark Free stack and is deployed from GitHub.</p>
  <ul>
    <li><a href="/health">/health</a> &mdash; JSON health check</li>
    <li><a href="/api/hello?name=Sakiko">/api/hello?name=Sakiko</a> &mdash; example JSON API</li>
  </ul>
  <p>Started at: ${startedAt.toISOString()}</p>
</body>
</html>`);
});

// Health check: status, uptime and current time as JSON.
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'uppcoder-starter',
    uptime_seconds: Math.floor(process.uptime()),
    started_at: startedAt.toISOString(),
    time: new Date().toISOString()
  });
});

// Example API: /api/hello?name=Sakiko
app.get('/api/hello', (req, res) => {
  const name = (req.query.name || 'world').toString().slice(0, 50);
  res.json({ message: `Hello, ${name}!`, from: 'uppcoder-starter' });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`uppcoder-starter listening on 127.0.0.1:${PORT}`);
});
