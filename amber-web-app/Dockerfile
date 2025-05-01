# Base image for development
FROM node:20-alpine AS development-env

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your application uses (adjust as needed)
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev", "--", "--host"]