FROM mhart/alpine-node:latest

# The working directory must be set using WORKDIR
WORKDIR /app

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

ADD app/package.json .

# If don't you need npm, use a base tag
RUN npm install --production

ADD app/ .

# Heroku ignores this command and will use their designated port set as an environment variable
EXPOSE 3000

CMD ["npm", "start"]