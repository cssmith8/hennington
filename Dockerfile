FROM node:18-alpine
RUN apk update && apk add python3 make g++


# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm i

# Bundle app source
COPY . .

# Build app
RUN npm run build
RUN npm run build-styles

# Expose port
EXPOSE 3000

# Start app
CMD [ "npm", "run", "serve" ]

