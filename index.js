import config from 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.port || 3333

app.get("/", async (req, res) => {
    res.send("hi honey :)")
})

app.get("/guild/:guild_id", async (req, res) => {
    res.send({
        "path": `${req.path}`,
        "guild_id": `${req.params.guild_id}`,
        "token": `${req.query.token}`
    })
})

app.get("/guild/:guild_id/channel/:channel_id", async (req, res) => {
    res.send({
        "path": `${req.path}`,
        "guild_id": `${req.params.guild_id}`,
        "channel_id": `${req.params.channel_id}`
    })
})

app.get("/guild/:guild_id/channel/:channel_id/message/:message_id", async (req, res) => {
    res.send({
        "path": `${req.path}`,
        "guild_id": `${req.params.guild_id}`,
        "channel_id": `${req.params.channel_id}`,
        "message_id": `${req.params.message_id}`,
        "createdAt": `${req.query.created}`,
        "neutral_score": `${req.query.neutral_score}`,
        "abuse_score": `${req.query.abuse_score}`,
        "hate_score": `${req.query.hate_score}`,
    })
})

app.listen(port, () => {
    console.log(`this service run at port ${port}`);
})