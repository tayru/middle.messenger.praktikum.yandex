const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist'));
app.use("/", express.static(path.join("dist")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
