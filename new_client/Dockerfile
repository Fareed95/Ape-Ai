FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g next

# Copy the rest of the project files
COPY . .

# Build arguments for secrets
ARG GITHUB_ID
ARG GITHUB_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_SECRET

# Set environment variables for build
ENV GITHUB_ID=$GITHUB_ID
ENV GITHUB_SECRET=$GITHUB_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
