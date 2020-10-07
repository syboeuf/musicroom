FROM node:12
########################################
# Maintained by abnaceur@student.42.fr #
########################################
RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN npm i -g expo-cli
RUN npm install  
EXPOSE 19006
CMD [ "npm run web" ]