FROM tarampampam/node:13-alpine
ENV NODE_ENV=development

#RUN rmdir /usr/project
RUN mkdir /usr/project 
RUN cd /usr/project 
EXPOSE 443

RUN cd /usr/project && git clone -b master --single-branch https://github.com/skalesafe/ecom-react-graphql.git

WORKDIR /usr/project/ecom-react-graphql

EXPOSE 27017
EXPOSE 1337
EXPOSE 3000

CMD cd server && npm install && npm run build && npm run start
