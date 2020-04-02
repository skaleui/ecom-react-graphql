FROM tarampampam/node:13-alpine
ENV NODE_ENV=development

EXPOSE 443

RUN git clone -b hostname --single-branch https://github.com/skaleui/ecom-react-graphql.git

EXPOSE 27017
EXPOSE 1337
EXPOSE 3000

RUN cd ecom-react-graphql && echo $PWD
RUN npm run server
RUN npm run client
CMD npm run start
