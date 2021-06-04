# API Docs
This `api` subfolder contains code that responsible to provide API's.

### Endpoints
| path | params | queries | description | return |
|-|-|-|-|-|
| `/` | x | x | greetings | a simple message <3 |
| `/guild/:guild_id` | `:guild_id` | `token` | returns `guild` details of an existing `guild_id` with a matching `token` | a `guild` object, if `token` is not supplied nor found zero matching then it won't |
| `/guild/:guild_id/admin` | `:guild_id` | `oldtoken`, `newtoken` | updates `guild_admin_token` of an existing `guild_id` with a matching `oldtoken` to a `newtoken` | a `guild` object, if `token` is not supplied nor found zero matching then it won't |
| `/guild/:guild_id/channel` | `:guild_id` | x | list of `channel`s to a specific `guild_id` | an array of `channel`s |
| `/channel/:channel_id` | `:channel_id` | x | returns `channel` details of an existing `channel_id` | a `channel` object |
| `/channel/:channel_id/message` | `:channel_id` | x | list of `message`s to a specific `channel_id` | an array of `messages` |
| `/message/:message_id` | `:message_id` | x | returns `message` details of an existing `message_id` | a `message` object |
| `/message/:message_id/update` | `:message_id` | `message_neutral_score`, `message_abusive_score`, `message_hate_score` | updates the scores of a specific `message_id` | x |

### Examples

#### 1. Updating `guild_admin_token` of a `guild_id`

**POST**
```
curl hostname:port/guild/1234567890/admin?oldtoken=myoldguildtoken&newtoken=mynewguildtoken
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

#### 3. List messages from a specific `channel_id`

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
        "message_id": "987654321"
    },
    {
        "message_id": "87654321"
    }
]
```

#### 4.Updates scores of a specific `message_id`

**POST**
```
curl hostname:port/message/87654321/update?message_neutral_score=35.0&message_abusive_score=5.0&message_hate_score=60.0
```

**RESPONSE**
```json
{
    
}
```
