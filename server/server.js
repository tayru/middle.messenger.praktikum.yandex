const express = require("express")
const path = require('path');

const PORT = 3000

const app = express()


app.use("/", express.static(path.join("dist")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту: ${PORT}`)
})
