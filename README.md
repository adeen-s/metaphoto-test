# MetaPhoto

A simple photo gallery app built with React, TypeScript, and Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Run both API server and frontend
npm run start
```

Then open http://localhost:5173 in your browser.

## About This Project

MetaPhoto lets you browse photos from JSONPlaceholder API with filtering and pagination. I built this as a demo project.

**Note:** Since via.placeholder.com is no longer reliable, I've added a workaround that replaces all image URLs with dummyimage.com. This ensures you'll always see images in the gallery.

## Features

- Filter photos by title, album title, or user email
- Responsive design that works on all devices
- Pagination with customizable page size
- Modern UI with Tailwind CSS

## API Endpoints

The app includes a simple API server that enriches photo data with album and user information:

- `GET /externalapi/photos/:id` - Get a single photo with details
- `GET /externalapi/photos` - Get photos with filtering and pagination

## Tech Stack

- React + TypeScript
- Tailwind CSS for styling
- Express for the API server
- JSONPlaceholder as the data source
