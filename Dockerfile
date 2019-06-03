FROM node:8-alpine

WORKDIR /srv
COPY . /srv

# Install dependencues
RUN apk add --no-cache python3
RUN pip3 install awscli --upgrade --user
RUN npm i

# Build
RUN npm run build

# Deploy
CMD ["sh", "-c", "~/.local/bin/aws s3 cp /srv/dist/evrythng-pubsub.js s3://$BUCKET/js/evrythng-pubsub/$VERSION/evrythng-pubsub-$VERSION.js --acl public-read"]
