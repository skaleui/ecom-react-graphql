FROM tarampampam/node:13-alpine
ENV NODE_ENV=development

EXPOSE 443

RUN cd /usr/project && git clone -b master --single-branch https://github.com/skaleui/ecom-react-graphql.git

WORKDIR /usr/project/ecom-react-graphql

EXPOSE 27017
EXPOSE 1337
EXPOSE 3000

RUN npm run server
RUN npm run client
CMD npm run start
