import config from 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()
const port = process.env.port || 3333
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const guildTokenUpdate = async (guild_id, oldtoken, newtoken) => {
    const { data, error } = await supabase
        .from('guilds')
        .update([{ guild_admin_token: `${newtoken}`}])
        .eq('guild_id', `${guild_id}`)
        .eq('guild_admin_token',`${oldtoken}`)

    return data
}

const guildDetailsRead = async (guild_id, token) => {
    const { data, error } = await supabase
        .from('guilds')
        .select('*')
        .eq('guild_id', `${guild_id}`)
        .eq('guild_admin_token',`${token}`)

    return data
}

const guildChannelsRead = async (guild_id) => {
    const { data, error } = await supabase
        .from('channels')
        .select('channel_id')
        .eq('guild_id', `${guild_id}`)

    return data
}

const channelDetailsRead = async (channel_id) => {
    const { data, error } = await supabase
        .from('channels')
        .select('*')
        .eq('channel_id', `${channel_id}`)

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
        .update([{ message_neutral_score: queries.message_neutral_score, message_abusive_score: queries.message_abusive_score, message_hate_score: queries.message_hate_score }])
        .eq('message_id', `${message_id}`)

    return data
}

const messageDetailsRead = async (message_id) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('message_id', `${message_id}`)
}

app.get("/", async (req, res) => {
    res.send("hi honey :)")
})

app.get("/guild/:guild_id", async (req, res) => {
    
    const guild = await guildDetailsRead(req.params.guild_id, req.query.token)

    res.send(guild)
})

app.get("/guild/:guild_id/admin", async (req, res) => {
    if (req.query.oldtoken != null && req.query.newtoken != null) {
        const guild = await guildTokenUpdate(req.params.guild_id, req.query.oldtoken, req.query.newtoken)

        if (guild != null) {
            res.send(guild)
        } else {
            res.send({
                "status": "FAIL"
            })
        }
    } else {
        res.send({
            "status": "MISS"
        })
    }
})

app.get("/guild/:guild_id/channel", async (req, res) => {

    const channels = await guildChannelsRead(req.params.guild_id)

    res.send(channels)
})

app.get("/channel/:channel_id", async (req, res) => {
    const channel = await channelDetailsRead(req.params.channel_id)
    res.send(channel)
})

app.get("/channel/:channel_id/message", async (req, res) => {

    const messages = await channelMessagesRead(req.params.channel_id)

    res.send(messages)
})

app.get("/message/:message_id", async (req, res) => {
    const message = messageDetailsRead(req.params.message_id)
    res.send(message)
})

app.get("/message/:message_id/update", async (req, res) => {

    let counter = 0

    if (req.query.message_neutral_score != null) {
        counter++
    }

    if (req.query.message_abusive_score != null) {
        counter++
    }

    if (req.query.message_hate_score != null) {
        counter++
    }

    if (counter == 3) {
        const message = messageScoreUpdate(req.params.message_id, req.query)
        res.send(message)
    }
})

app.listen(port, () => {
    console.log(`this service run at port ${port}`);
})