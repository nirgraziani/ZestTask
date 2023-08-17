# Use the official Node.js image as a parent image
FROM node:14

# Set the working directory in the Docker container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container at /app
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application into the container at /app
COPY . .

# Make port 3000 available outside of the Docker container
EXPOSE 3000

# Run the command to start your application when the container launches
CMD ["npm", "start"]
