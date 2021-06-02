import config from 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()
const port = process.env.port || 3333
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const guildTokenUpdate = async (guild_id, token) => {
    const { data, error } = await supabase
        .from('guilds')
        .update([{ guild_admin_token: `${token}`}])
        .eq('guild_id', `${guild_id}`)
}

const guildChannelsRead = async (guild_id) => {
    const { data, error } = await supabase
        .from('channels')
        .select('channel_id')
        .eq('guild_id', `${guild_id}`)

    return data
}

const channelMessagesRead = async (channel_id) => {
    const { data, error } = await supabase
        .from('messages')
        .select('message_id, created, message_neutral_score, message_abusive_score, message_hate_score')
        .eq('channel_id', `${channel_id}`)

    return data
}

const messageScoreUpdate = async (message_id, queries) => {
    const { data, error } = await supabase
        .from('messages')
        .update([{ message_neutral_score: `${queries.message_neutral_score}`, message_abusive_score: `${queries.message_abusive_score}`, message_hate_score: `${queries.message_hate_score}` }])
        .eq('message_id', `${message_id}`)
}

app.get("/", async (req, res) => {
    res.send("hi honey :)")
})

app.get("/guild/:guild_id", async (req, res) => {
    if (req.query.token != null) {
        guildTokenUpdate(req.params.guild_id, req.query.token)
        res.send({
            "path": `${req.path}`,
            "guild_id": `${req.params.guild_id}`,
            "token": `${req.query.token}`
        })
    } else {
        res.send({
            "path": `${req.path}`,
            "guild_id": `${req.params.guild_id}`
        })
    }
})

app.get("/guild/:guild_id/channel", async (req, res) => {

    const channels = await guildChannelsRead(req.params.guild_id)

    res.send(channels)
})

app.get("/guild/:guild_id/channel/:channel_id", async (req, res) => {
    res.send({
        "path": `${req.path}`,
        "guild_id": `${req.params.guild_id}`,
        "channel_id": `${req.params.channel_id}`
    })
})

app.get("/channel/:channel_id/message", async (req, res) => {

    const messages = await channelMessagesRead(req.params.channel_id)

    res.send(messages)
})

app.get("/message/:message_id", async (req, res) => {
    if (req.query != null) {
        messageScoreUpdate(req.params.message_id, req.query)
        res.send({
            "path": `${req.path}`,
            "message_id": `${req.params.message_id}`,
            "neutral_score": `${req.query.message_neutral_score}`,
            "abuse_score": `${req.query.message_abusive_score}`,
            "hate_score": `${req.query.message_hate_score}`,
        })
    } else {
        res.send({
            "path": `${req.path}`,
            "message_id": `${req.params.message_id}`,
        })
    }
})

app.listen(port, () => {
    console.log(`this service run at port ${port}`);
})