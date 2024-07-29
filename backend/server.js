import app from "./app.js";

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("server jalan ni bree")
})

app.listen(PORT, () => {
    console.log(`server jalan di port ${PORT}`)
})