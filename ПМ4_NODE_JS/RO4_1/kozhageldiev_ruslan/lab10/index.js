require("dotenv").config()
const http = require("http")
const PORT = process.env.PORT || 3000
const server = http.createServer()


server.on("request", (req, res) => {
  const fullUrl = `http://${req.headers.host}${req.url}`;
  console.log(`${req.method} ${fullUrl} | User-Agent: ${req.headers["user-agent"]}`);
  // console.log(`${req.method} | User-Agent: ${req.headers["user-agent"]}`)

  if (req.url === "/admin") {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" })
    res.end("Доступ ограничен")
    return
  }

  if (req.url === "/html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    res.end("<h1>Инфо-панель</h1>")
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
  res.end("Server Alpha is active\nСистема готова к работе")
})

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}\nURL: http://localhost:${PORT}`)
})