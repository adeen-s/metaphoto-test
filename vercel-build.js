// This script is used to prepare the project for Vercel deployment
import fs from 'fs';
import path from 'path';

// Create a simple package.json for the API
const apiPackageJson = {
  "name": "relish-test-api",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "axios": "^1.6.7",
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
};

// Ensure the api directory has a package.json
fs.writeFileSync('api/package.json', JSON.stringify(apiPackageJson, null, 2));

console.log('Vercel build preparation completed successfully!'); 