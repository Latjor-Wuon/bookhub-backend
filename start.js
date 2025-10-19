#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting BookHub Backend...');

// Check if dist/index.js exists
if (!fs.existsSync('dist/index.js')) {
  console.log('📦 dist/index.js not found, building...');
  
  try {
    // Clean and build
    if (fs.existsSync('dist')) {
      execSync('rm -rf dist', { stdio: 'inherit' });
    }
    
    execSync('npx tsc --project ./tsconfig.json', { stdio: 'inherit' });
    
    if (fs.existsSync('dist/index.js')) {
      console.log('✅ Build completed successfully');
    } else {
      console.error('❌ Build failed - dist/index.js not found');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ dist/index.js found, starting server...');
}

// Start the server
console.log('🎯 Starting server...');
require('./dist/index.js');
