Eu Revendedor
===============

Projeto desenvolvido com NestJS + MongoDB + Mongo Express + Docker.

----------
### Initialize the project:

To start, clone the repository, cd to it and run the command below.

```bash
docker-compose up -d --build
```

----------
### Description of container ports:

- **3000** Used for the **NestJs** server.
- **9229** Used for the **NestJs** debug.
- **27017** Used for **MongoDB**.
- **8081** Used by **Mongo Express**.

----------
### How to access **NestJS** API:

After initializing the containers, access http://localhost:3000/api to access the documentation.
