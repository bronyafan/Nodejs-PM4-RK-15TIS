require("dotenv").config();
const http = require("http");
 
const PORT = process.env.PORT || 3000
 
const devices = [{ id: 1, name: "Монитор", status: "work" }]
 
const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" })
  res.end(JSON.stringify(data))
};
 
const server = http.createServer()
 
server.on("request", (req, res) => {
  const fullUrl = new URL(req.url, `http://${req.headers.host}`)
  const pathname = fullUrl.pathname
 
  if (pathname === "/devices" && req.method === "GET") {
    try {
      const status = fullUrl.searchParams.get("status")
      const result = status ? devices.filter((d) => d.status === status) : devices;
      sendJson(res, 200, result)
    } catch (err) {
      sendJson(res, 500, { error: "Внутренняя ошибка сервера" });
    }
  } else if (pathname === "/devices" && req.method === "POST") {
    let body = ""
 
    req.on("data", (chunk) => {
      body += chunk.toString()
    })

    req.on("end", () => {
      try {
        const data = JSON.parse(body)
 
        if (!data || !data.name) {
          return sendJson(res, 400, { error: "Поле name обязательно" })
        }
 
        const newDevice = {
          id: devices.length + 1,
          name: data.name,
          status: data.status || "work",
        }
 
        devices.push(newDevice)
        console.log(`[ADD]: Добавлено устройство ${newDevice.name}`)
        sendJson(res, 201, newDevice)
      } catch (err) {
        sendJson(res, 400, { error: "Некорректный JSON" })
      }
    });
  } else {
    sendJson(res, 404, { message: "Маршрут не найден" })
  }
})
 
server.listen(PORT, () => {
  console.log(`API запущен на порту ${PORT}`)
})
