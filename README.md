# AegisAPI
a simple API that we intentionally make to
* Provide a generic interface between our Supabase instance API
* Not dealing with hiding tokens
* Help with the lack of support for Kotlin and Python as the only fully supported language as of the writing of this docs is Javascript.

NOTICE: As of now, AegisAPI consists of 2 services, `api` and `tokenizer`, please refer to each directory to find out the detailed docs for each components.

### How-to-use-this

-----

#### 1. Docker Deployment

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

Copy that file into `/api` directory/
```bash
cp .env /api/.env
```

You may start it up now.

```bash
docker-compose up -d
```

When it's finished, it'll be accessible at the `PORT` you've previously defined above.

### License
This project is licensed under GNU General Public License v2.0 only. Please head over to the `COPYING` file for more details.
