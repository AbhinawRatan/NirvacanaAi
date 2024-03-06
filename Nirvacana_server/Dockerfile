# Use Node.js 20 as the base image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Install TypeScript globally in the container
RUN npm install -g typescript

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8080 for the application
EXPOSE 8080

# Build the application
RUN npm run build

# Start the application
ENTRYPOINT [ "node" ]
CMD [ "./build/index.js" ]