import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { getEnrichedPhoto, getEnrichedPhotos } from './service.js';
import { QueryParams } from './types.js';

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Get a single photo with enriched data
app.get('/externalapi/photos/:id', async (req: Request, res: Response) => {
  try {
    const photoId = parseInt(req.params.id);
    if (isNaN(photoId)) {
      return res.status(400).json({ error: 'Invalid photo ID' });
    }

    const enrichedPhoto = await getEnrichedPhoto(photoId);
    res.json(enrichedPhoto);
  } catch (error) {
    console.error('Error fetching photo:', error);
    res.status(500).json({ error: 'Failed to fetch photo data' });
  }
});

// Get photos with filtering and pagination
app.get('/externalapi/photos', async (req: Request, res: Response) => {
  try {
    const queryParams: QueryParams = {
      title: req.query.title as string | undefined,
      'album.title': req.query['album.title'] as string | undefined,
      'album.user.email': req.query['album.user.email'] as string | undefined,
      limit: req.query.limit as string | undefined,
      offset: req.query.offset as string | undefined
    };

    const enrichedPhotos = await getEnrichedPhotos(queryParams);
    res.json(enrichedPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Failed to fetch photos data' });
  }
});

// Health check endpoint
app.get('/externalapi/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Export the Express API as the default function
export default function handler(req: VercelRequest, res: VercelResponse) {
  // This is necessary because Vercel's serverless functions don't support
  // the standard Express app.listen() pattern
  return app(req, res);
} 