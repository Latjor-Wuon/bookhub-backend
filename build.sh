#!/bin/bash

echo "🔨 Starting build process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build TypeScript
echo "🔧 Building TypeScript..."
npx tsc --project ./tsconfig.json

# Verify build
echo "✅ Verifying build..."
if [ -f "dist/index.js" ]; then
    echo "✅ dist/index.js created successfully"
    ls -la dist/
else
    echo "❌ dist/index.js not found!"
    exit 1
fi

echo "🎉 Build completed successfully!"
