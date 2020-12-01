# Big Commerce  app

## Requirement
- Ruby `2.7.1`
- Rails `6.0.3`
- Postgresql
- Node.js
- React

## Software
- [RVM](https://rvm.io/)
- [Postgres App](https://postgresapp.com/)
- [ngrok](https://ngrok.com/)

## Install Dependencies (First time only)
- Install ruby v2.7.1 using: `rvm install 2.5.1` (Ruby version missed only)
- Install rails dependencies: `bundle install`
- Install node dep: `yarn`

## Issues while installation:
- Error: `An error occurred while installing pg (0.21.0), and Bundler cannot continue.`
- Solution: Install using: `gem install pg -v '0.21.0' -- --with-pg-config=/Applications/Postgres.app/Contents/Versions/12/bin/pg_config`

## Database creation & initialization
- `rake db:create`
- `rake db:migrate`

## ENV variables
- Create file `config/application.yml`
```.env

APP_NAME: "Big Commerce App"
APP_API: "API"
BC_CLIENT_SECRET: "SECRET"
BC_CLIENT_ID: ‘BC_CLIENT_ID’
APP_URL: "NGROK_FORWARDED_URL"
```

## ENV variables
- Create file `config/application.yml`
```.env

APP_NAME: "Big Commerce App"
APP_API: "API"
BC_CLIENT_SECRET: "SECRET"
BC_CLIENT_ID: ‘BC_CLIENT_ID’
APP_URL: "NGROK_FORWARDED_URL"
```

## Development Instructions
- Install [Foreman](https://mattstauffer.com/blog/using-a-procfile-to-streamline-your-local-development/) one time only - `gem install foreman`
- Open Postgres App, Redis App
- Open a new tab and run ngrok: `ngrok http 3000`
- Edit `APP_URL` in `config/application.yml` value to forwarded ngrok url
- Config forwarded ngrok url in Shopify app dashboard.
- Open forwarded ngrok url and login a development store