deploy
======
- Install [Docker][docker-install] & [Docker-compose][docker-compose-install]

[docker-install]:https://www.docker.com/products/docker
[docker-compose-install]:https://docs.docker.com/compose/

- Run
```bash
$ git submodule update --init
$ docker-compose up -d
```

- Stop
```bash
$ docker-compose stop
```

- Cleanup
```bash
$ docker-compose down
```

- Rebuild webapp
```bash
$ docker-compose build webapp
```
