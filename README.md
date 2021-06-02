# AegisAPI
a simple API that we intentionally make to
* Provide a generic interface between our Supabase instance API
* Not dealing with hiding tokens
* Help with the lack of support for Kotlin and Python as the only fully supported language as of the writing of this docs is Javascript.

### Endpoints
| path | params | queries | description | return |
|-|-|-|-|-|
| `/` | x | x | greetings | a simple message <3 |
| `/guild/:guild_id` | `:guild_id` | `token` | updates `guild_admin_token` of an existing `guild_id` | a `guild` object, if `token` is not supplied then it won't |
| `/guild/:guild_id/channel` | `:guild_id` | x | list of `channel`s to a specific `guild_id` | an array of `channel`s |
| `/guild/:guild_id/channel/:channel_id` | `:guild_id`, `:channel_id` | x | Yet to be decided | a `channel` object |
| `/channel/:channel_id/message` | `:channel_id` | x | list of `message`s to a specific `channel_id` | an array of `messages` |
| `/message/:message_id` | `:message_id` | `message_neutral_score`, `message_abusive_score`, `message_hate_score` | updates the scores of a specific `message_id` | a `message` object |

### Examples

#### 1. Updating `guild_admin_token` of a `guild_id`

**POST**
```
curl hostname:port/guild/1234567890?token=myguildtoken
```

**RESPONSE**
```json
{
    "path": "/guild/1234567890",
    "guild_id": "1234567890",
    "token": "myguildtoken"
}
```

#### 2. List channels from a specific `guild_id`

**POST**
```
curl hostname:port/guild/1234567890/channel
```

**RESPONSE**
```json
[
    {
        "channel_id": "123456789"
    },
    {
        "channel_id": "12345678"
    },
    {
        "channel_id": "1234567"
    }
]
```

#### 3. List channels from a specific `guild_id`

**POST**
```
curl hostname:port/channel/1234567/message
```

**RESPONSE**
```json
[
    {
        "message_id": "0987654321"
    },
    {
        "channel_id": "987654321"
    },
    {
        "channel_id": "87654321"
    }
]
```

#### 4. List channels from a specific `guild_id`

**POST**
```
curl hostname:port/message/87654321?message_neutral_score=35.0&message_abusive_score=5.0&message_hate_score=60.0
```

**RESPONSE**
```json
{
    "path":"/message/87654321",
    "message_id":"87654321",
    "message_neutral_score":"35.0",
    "message_abusive_score":"5.0",
    "message_hate_score":"60.0"
}
```

### License
This project is licensed under GNU General Public License v2.0 only. Please head over to the `COPYING` file for more details.
