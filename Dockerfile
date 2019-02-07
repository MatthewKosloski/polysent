FROM node:latest

# Add project contents to the destination folder on the image
ADD . /usr/src/app

# Change working directory so we can run commands in the image
WORKDIR /usr/src/app

# Install dependencies
RUN npm install 

ENV PORT=80

EXPOSE 80

CMD ["npm", "start"]