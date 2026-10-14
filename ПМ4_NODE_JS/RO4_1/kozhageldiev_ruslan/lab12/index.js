const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
};

const sendText = (res, statusCode, text) => {
  res.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  } catch (err) {
    sendText(res, 400, "400: Некорректный адрес");
    return;
  }

  const fileName = pathname === "/" ? "index.html" : pathname;
  const filePath = path.join(PUBLIC_DIR, fileName);

  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
    sendText(res, 403, "403: Доступ запрещен");
    return;
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      sendText(res, 404, "404: Файл не найден");
      return;
    }

    let stats;
    try {
      stats = fs.statSync(filePath);
    } catch (statErr) {
      sendText(res, 404, "404: Файл не найден");
      return;
    }

    if (!stats.isFile()) {
      sendText(res, 404, "404: Файл не найден");
      return;
    }

    console.log(`[FILE]: ${filePath} | ${stats.size} байт`);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
    });

    const stream = fs.createReadStream(filePath);

    stream.on("error", () => {
      res.destroy();
    });

    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Медиа-галерея запущена на http://localhost:${PORT}`);
});
