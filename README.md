## Heroku Docker Example

This project uses [Alpine-Node](https://github.com/mhart/alpine-node) as the base image instead of Heroku's [Cedar base image](https://github.com/heroku/stack-images).

### Why use [Alpine Linux](http://www.alpinelinux.org/) / Alpine-Node as the base image?
Heroku's Cedar base image is based upon Ubuntu, which was not developed with the idea of being run inside a container, incidentally making the image size rather large. Heroku's Cedar also [installs a lot of packages](https://devcenter.heroku.com/articles/cedar-ubuntu-packages) to cover the needs of most Heroku developers' applications.

[Alpine Linux](http://www.alpinelinux.org/) is built around musl libc and busybox. This makes it smaller and more resource efficient than traditional GNU/Linux distributions. An Alpine Linux image requires no more than 8 MB.

A smaller base image with fewer dependencies gives benefits such as a faster build/deploy time, smaller artifacts created for each build, and a smaller surface area to check for security vulnerabilities.

### Differences from other Docker prodivers
Heroku has a set of contraints for applications running inside [Dynos](https://devcenter.heroku.com/articles/dynos). These constraints do not change when running a Docker container inside a Dyno.

- The web process must listen for HTTP traffic on $PORT (EXPOSE in Dockerfile is not respected, and only HTTP requests are supported)
- The image must have a valid working directory. Either:
  Heroku’s default /app directory must exist (via MKDIR or COPY, not VOLUME),
  or the working directory must be set using WORKDIR
- The filesystem is ephemeral
- No volume mounting or network linking of dynos is supported

### Development

#### Requirements
- Docker
- Docker Compose

If running Windows or OS X it is recommended to install the [Docker Toolbox](https://www.docker.com/products/docker-toolbox).

If running Linux, install using the package manager of your choice.

#### Steps to follow
- Clone the repository -- `git clone git@github.com:Financial-Times/heroku-docker-node-alpine-example.git`
- Change into the project's directory -- `cd heroku-docker-node-alpine-example`
- Create a local container using Docker Compose to mount the project's app folder from your machine to the container -- `docker-compose up`

### Deployment

#### Requirements
- Heroku CLI
- Docker

If running Windows or OS X it is recommended to install the [Docker Toolbox](https://www.docker.com/products/docker-toolbox).

If running Linux, install using the package manager of your choice.

#### Steps to follow

- Sign into the Heroku CLI -- `heroku login`
- Sign into the Docker CLI, pointing at Heroku's registry -- ` docker login --email=_ --username=_ --password=$(heroku auth:token) registry.heroku.com`
- Build and tag the Docker image, the tag of the image corresponds to "${Heroku's registry}/${Application name}/{$Heroku process type}" -- `docker build -t registry.heroku.com/ftlabs-docker-node-alpine/web .`
- Push the image to Heroku's Docker registry to deploy the application - `docker push registry.heroku.com/ftlabs-docker-node-alpine/web`

