// Simple build script to ensure the API is built correctly
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Ensure the dist/api directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}
if (!fs.existsSync('dist/api')) {
  fs.mkdirSync('dist/api');
}

// Build the API
try {
  console.log('Building API...');
  execSync('tsc -p api/tsconfig.json', { stdio: 'inherit' });
  console.log('API built successfully!');
} catch (error) {
  console.error('Error building API:', error);
  process.exit(1);
}

// Copy the package.json to the dist/api directory
console.log('Copying package.json to dist/api...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const apiPackageJson = {
  name: packageJson.name + '-api',
  version: packageJson.version,
  type: 'module',
  dependencies: {
    axios: packageJson.dependencies.axios,
    cors: packageJson.dependencies.cors,
    express: packageJson.dependencies.express
  }
};
fs.writeFileSync('dist/api/package.json', JSON.stringify(apiPackageJson, null, 2));

console.log('Build completed successfully!'); 