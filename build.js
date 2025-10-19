#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔨 Starting Render build process...');

try {
  // Clean previous build
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('dist')) {
    execSync('rm -rf dist', { stdio: 'inherit' });
  }

  // Build TypeScript
  console.log('🔧 Building TypeScript...');
  execSync('npx tsc --project ./tsconfig.json', { stdio: 'inherit' });

  // Verify build
  console.log('✅ Verifying build...');
  if (fs.existsSync('dist/index.js')) {
    console.log('✅ dist/index.js created successfully');
    const files = fs.readdirSync('dist');
    console.log('📁 Build files:', files);
  } else {
    console.error('❌ dist/index.js not found!');
    process.exit(1);
  }

  console.log('🎉 Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
