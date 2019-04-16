FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install -g typescript
# A wild card is used to ensure both package.json AND package-lock.json are copied
# whee available (npm@5+)
COPY package*.json ./
RUN npm install
RUN npm ci

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "run", "prod"]