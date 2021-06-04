# AegisAPI
a simple API that we intentionally make to
* Provide a generic interface between our Supabase instance API
* Not dealing with hiding tokens
* Help with the lack of support for Kotlin and Python as the only fully supported language as of the writing of this docs is Javascript.

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

### How-to-use-this

-----

#### 1. Classic Node Deployment

First, clone this repo somewhere into your deployment machine

```bash
git clone https://github.com/xatryx/es-backend-AegisAPI.git
```

Then open `es-backend-AegisAPI` folder and create a `.env` file
```bash
cd es-backend-AegisAPI
touch .env
```

Open the `.env` file with any text editors and here, define this below with your own Supabase URL, and Supabase Service Token.
```bash
PORT=Your_Preferred_Port
SUPABASE_URL=Your_URL_String
SUPABASE_KEY=Your_KEY_String
```

Now, fly with the wind !!!
```bash
npm run start
```

-----

#### 2. Docker Deployment

First, clone this repo somewhere into your deployment machine

```bash
git clone https://github.com/xatryx/es-backend-AegisAPI.git
```

Then open `es-backend-AegisAPI` folder and create a `.env` file
```bash
cd es-backend-AegisAPI
touch .env
```

Open the `.env` file with any text editors and here, define this below with your own Supabase URL, and Supabase Service Token.
```bash
PORT=Your_Preferred_Port
SUPABASE_URL=Your_URL_String
SUPABASE_KEY=Your_KEY_String
```

Now, instead of directly executing the code, we will containerize the entire source and initialize it inside as a production ready container. Run this line of code below, take note of the dot at the end of the line (it matters, really). Also, makes sure to give `PORT` argument the same value as `PORT` in your `.env` file.

```bash
docker build --build-arg PORT=Your_Preferred_Port -t backend-aegisapi .
```

You may start it up now.

```bash
docker-compose up -d
```

When it's finished, it'll be accessible at the `PORT` you've previously defined above.

### License
This project is licensed under GNU General Public License v2.0 only. Please head over to the `COPYING` file for more details.
