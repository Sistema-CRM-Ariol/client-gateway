<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


### Install project

1. Install dependencies
```bash
npm install
```

2. Install docker images
```bash
docker compose up -d
```

3. Rename ```.env.template``` file for ```.env``` and replace values

4. Run migrations
```bash
npx prisma push
```

### Run project
1. Run client microservice project

2. Run command
```bash
npm run start:dev
```

### Nats
```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```