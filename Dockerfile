FROM mhart/alpine-node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install -g typescript
# A wild card is used to ensure both package.json AND package-lock.json are copied
# whee available (npm@5+)
COPY package*.json ./
RUN npm ci --prod

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "run", "prod"]