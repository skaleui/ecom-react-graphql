FROM tarampampam/node:13-alpine
ENV NODE_ENV=development

CMD git clone -b master --single-branch https://github.com/skalesafe/ecom-react-graphql.git

EXPOSE 27017
EXPOSE 1337
EXPOSE 3000

CMD cd ecom-react-graphql && npm run start
