### Titin-Backend-Chat-Bot

## Manage repository 🤳 <a name="repository"></a>

-   Install dependencies

```sh
$ npm i
```

-   Check code by linter

```sh
$ npm run lint
```

-   Check and fix code by linter

```sh
$ npm run lint:fix
```

-   Check style code

```sh
$ npm run prettier
```

-   Check and fix style code

```sh
$ npm run prettier:fix
```

-   Get coverage test terminal

```sh
$ npm run coverage
```

## Naming ✍ <a name="naming"></a>

-   Folders _kebab-case_

-   JavaScript or Typescript files _kebab-case_

-   Endpoints _kebab-case_

-   Classes, interfaces and types _PascalCase_

-   Functions and variables _camelCase_

-   Constants _UPPER_CASE_

-   Components files _PascalCase_

-   Components _PascalCase_

-   Pages files _flatcase_

## Manage local environment 🕹 <a name="local"></a>

-   Create environment variables

```sh
$ cat .env.example > .env
```

-   Install dependencies

```sh
$ npm i
```

### Run project

-   Run in local environment

```sh
$ npm run dev
```

## Manage staging environment 🎰 <a name="staging"></a>

## Manage production environment 🎮 <a name="production"></a>

-   Define version image

```sh
$ ARTIFACT_ID=1.0
```

-   Build

```sh
$ docker build -f ./deploy/docker/Dockerfile -t titin-backend-chat-bot .
```

-   Run

```sh
$ docker run --rm --env-file .env --name titin-backend-chat-bot-container -v $(pwd):/usr/src/app titin-backend-chat-bot
```

-   Reset container

```sh
$ docker stack services titin-backend-chat-bot
$ docker service update --force vbg088j91bkt
$ docker service update --force  $(docker stack services --format '{{ .ID }}' titin-backend-chat-bot)
```

## Manual Deploy 🧤 <a name="deploy"></a>

-   Define version image

```sh
$ ARTIFACT_ID=1.0
```

-   Build

```sh
$ docker build -f ./deploy/docker/Dockerfile -t titin-backend-chat-bot:$ARTIFACT_ID .
```

-   Debugging in production

```sh
$ docker run --rm --name titin-backend-chat-bot-container -v $(pwd):/usr/src/app titin-backend-chat-bot:$ARTIFACT_ID
```

-   Deploy docker simple

```sh
$ docker run --rm -d --name titin-backend-chat-bot-container -v $(pwd):/usr/src/app titin-backend-chat-bot:$ARTIFACT_ID
```

-   Deploy docker compose

```sh
$ env TAG=$ARTIFACT_ID docker-compose -f ./server/docker-compose.yml up -d
```

-   Deploy with docker swarm

```sh
$ env TAG=$ARTIFACT_ID docker stack deploy -c ./server/stack.yml titin-backend-chat-bot
```
