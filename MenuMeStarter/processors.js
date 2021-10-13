const fs = require("fs").promises;
const path = require("path");
const { static } = require("./constants");

const fileProcessor = (request, response) => {
  let filePath = request.url;
  if (filePath == "/") {
    filePath = "/index.html";
  }

  let extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
  };

  let contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(path.join(static, filePath))
    .then((content) => {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    })
    .catch((error) => {
      if (error.code == "ENOENT") {
        fs.readFile(path.join(static, "404.html")).then((content) => {
          response.writeHead(404, { "Content-Type": "text/html" });
          response.end(content, "utf-8");
        });
      } else {
        response.writeHead(500);
        response.end(
          `Sorry, check with the site admin for error: ${error.code}\n`
        );
      }
    });
};

module.exports = { fileProcessor };
