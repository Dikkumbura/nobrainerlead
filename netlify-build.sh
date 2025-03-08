#!/bin/bash

# Print commands and their arguments as they are executed
set -x

# Copy the Netlify-specific package.json over the main one temporarily
cp netlify-package.json package.json

# Install dependencies with clean cache
echo "Installing dependencies..."
npm cache clean --force
npm install

# Build the project
echo "Building project..."
npm run build

# Restore the original package.json
git checkout -- package.json

echo "Build completed successfully!" 