"use strict";

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const defaultPort = Number(process.env.PORT || 3000);

const contentTypes = {
  ".css": "text/css; charset=UTF-8",
  ".html": "text/html; charset=UTF-8",
  ".js": "application/javascript; charset=UTF-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function sendFile(filePath, response) {
  const extname = path.extname(filePath).toLowerCase();
  const contentType = contentTypes[extname] || "application/octet-stream";

  response.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(response);
}

function createServer() {
  return http.createServer((request, response) => {
  const requestPath = decodeURIComponent(request.url.split("?")[0]);
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(buildDir, safePath);

  if (requestPath === "/") {
    filePath = path.join(buildDir, "index.html");
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!filePath.startsWith(buildDir) || !fs.existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8" });
    response.end("Not found");
    return;
  }

  sendFile(filePath, response);
  });
}

function listen(port) {
  const server = createServer();

  server.once("error", (error) => {
    if (error.code === "EADDRINUSE") {
      listen(port + 1);
      return;
    }

    throw error;
  });

  server.listen(port, () => {
    console.log("Serving build on http://localhost:" + port);
  });
}

listen(defaultPort);
