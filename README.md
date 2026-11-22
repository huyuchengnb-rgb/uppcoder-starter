# uppcoder-starter

A minimal Express starter that runs on an **Uppcoder Spark Free** stack and is
managed through this GitHub repository, so Muse and Claude can take it over
directly.

## What it does

| Route | Result |
| --- | --- |
| `GET /` | Small HTML page confirming the app is running |
| `GET /health` | JSON health check: status, uptime, start time |
| `GET /api/hello?name=Sakiko` | Example JSON API |

## Run locally

```bash
npm install
npm start
# listens on 127.0.0.1:APP_PORT (default 8000; PORT also honoured locally)
```

## Layout

- `index.js` — the whole app (Express, no build step)
- `package.json` — start script is `node index.js`; Node >= 20

## Deployment

The app runs on the Uppcoder stack that is connected to this repository.
Pushing to `main` is the source of truth for the code; see `TAKEOVER.md` for
the stack details, the live URL and the verification record.
