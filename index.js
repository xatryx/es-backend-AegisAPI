import config from 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.port || 3333

app.get("/", async (req, res) => {
    res.send("hi honey :)")
})

app.listen(port, () => {
    console.log(`this service run at port ${port}`);
})