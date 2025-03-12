import express from 'express';
import cors from 'cors';
import { getEnrichedPhoto, getEnrichedPhotos } from './service';
import { QueryParams } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/externalapi/photos/:id', async function(req, res) {
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

app.get('/externalapi/photos', async function(req, res) {
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

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app; 