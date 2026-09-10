/**
 * index.js
 * -----------------------------------------------------------------------
 * Zero-dependency production server for the SHADOW - ARMY ! website.
 *
 * Uses ONLY Node.js built-in modules (http, fs, path). No Express, no
 * npm packages, no "npm install" required — just:
 *
 *   node index.js
 *
 * Routing mirrors how the site is deployed on Vercel/Netlify, so the
 * same URLs work identically in local dev and in production:
 *
 *   /                -> src/index.html
 *   /style.css       -> src/style.css
 *   /settings.js     -> src/settings.js
 *   /shadow.png      -> src/shadow.png
 *   /information.js  -> information.js   (project root, single source
 *                                          of truth for clan data)
 * -----------------------------------------------------------------------
 */

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, "src");
const PORT = process.env.PORT || 3000;

/** Explicit route -> absolute file path map. Kept small and explicit
 *  on purpose: the project has a fixed, known file list, so there is
 *  no need for a general-purpose static file walker (or its security
 *  surface, e.g. path traversal). */
const ROUTES = {
  "/": path.join(SRC_DIR, "index.html"),
  "/index.html": path.join(SRC_DIR, "index.html"),
  "/style.css": path.join(SRC_DIR, "style.css"),
  "/settings.js": path.join(SRC_DIR, "settings.js"),
  "/shadow.png": path.join(SRC_DIR, "shadow.png"),
  "/information.js": path.join(ROOT_DIR, "information.js")
};

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml"
};

function send(res, status, body, headers) {
  res.writeHead(status, headers || {});
  res.end(body);
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        send(res, 404, "404 — Not Found", { "Content-Type": "text/plain; charset=utf-8" });
      } else {
        send(res, 500, "500 — Internal Server Error", { "Content-Type": "text/plain; charset=utf-8" });
      }
      return;
    }

    send(res, 200, data, {
      "Content-Type": contentType,
      "Cache-Control": filePath.endsWith("index.html")
        ? "no-cache"
        : "public, max-age=3600"
    });
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "405 — Method Not Allowed", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  } catch (err) {
    send(res, 400, "400 — Bad Request", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  const filePath = ROUTES[pathname];

  if (!filePath) {
    send(res, 404, "404 — Not Found", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  serveFile(res, filePath);
});

server.listen(PORT, () => {
  console.log(`SHADOW - ARMY ! website running at http://localhost:${PORT}`);
});
