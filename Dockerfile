FROM mhart/alpine-node:latest

# The working directory must be set using WORKDIR
WORKDIR /app

# If you have native dependencies, you'll need extra tools. Also remove any cached files from the installs
# RUN apk add --no-cache make gcc g++ python  && rm -rf /var/cache/apk/*

ADD app/package.json .

# If don't you need npm, use a base tag
RUN npm install --production

# Remove the cache folder that NPM creates
RUN rm -rf ~/.npm

# Add application code to
ADD app/ .

# Heroku ignores this command and will use their designated port set as an environment variable
EXPOSE 3000

CMD ["npm", "start"]