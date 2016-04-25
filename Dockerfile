FROM mhart/alpine-node:5.7.1

# The working directory must be set using WORKDIR
WORKDIR app
ENV HOME="/app"

# Set the application to be in production mode by default
ENV NODE_ENV production

# Install additional dependencies required to build modules
# You need these to build native dependencies (mostly node-sass)
# RUN apk add --no-cache --update g++ gcc git make python && rm -rf /var/cache/apk/*

ADD app/package.json ./

# Install dependencies and remove the cache that NPM creates
RUN npm install --production && npm cache clean

# Add application code
ADD app/ .

# Heroku ignores this command and will use their designated port set as an environment variable
EXPOSE 3000

CMD ["npm", "start"]
