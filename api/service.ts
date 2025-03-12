import axios from 'axios';
import { User, Album, Photo, EnrichedPhoto, QueryParams } from './types.js';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Helper function to replace placeholder URLs with dummyimage URLs
function replacePlaceholderWithDummyImage(url: string): string {
  if (url.includes('via.placeholder.com')) {
    // Extract dimensions and color from placeholder URL
    // Example: https://via.placeholder.com/600/92c952 -> https://dummyimage.com/600x600/92c952/ffffff
    const parts = url.split('/');
    const dimensions = parts[parts.length - 2];
    const color = parts[parts.length - 1];
    
    // For thumbnails, we'll keep the same dimensions
    // For full images, we'll make them square based on the first dimension
    const isSquare = !dimensions.includes('x');
    const size = isSquare ? `${dimensions}x${dimensions}` : dimensions;
    
    // Return the dummyimage URL with the extracted dimensions and color
    return `https://dummyimage.com/${size}/${color}/ffffff`;
  }
  return url;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
  return response.data;
}

export async function fetchUser(id: number): Promise<User> {
  const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
  return response.data;
}

export async function fetchAlbums(): Promise<Album[]> {
  const response = await axios.get<Album[]>(`${API_BASE_URL}/albums`);
  return response.data;
}

export async function fetchAlbum(id: number): Promise<Album> {
  const response = await axios.get<Album>(`${API_BASE_URL}/albums/${id}`);
  return response.data;
}

export async function fetchPhotos(): Promise<Photo[]> {
  const response = await axios.get<Photo[]>(`${API_BASE_URL}/photos`);
  // Replace placeholder URLs with dummyimage URLs
  return response.data.map(photo => ({
    ...photo,
    url: replacePlaceholderWithDummyImage(photo.url),
    thumbnailUrl: replacePlaceholderWithDummyImage(photo.thumbnailUrl)
  }));
}

export async function fetchPhoto(id: number): Promise<Photo> {
  const response = await axios.get<Photo>(`${API_BASE_URL}/photos/${id}`);
  const photo = response.data;
  // Replace placeholder URLs with dummyimage URLs
  return {
    ...photo,
    url: replacePlaceholderWithDummyImage(photo.url),
    thumbnailUrl: replacePlaceholderWithDummyImage(photo.thumbnailUrl)
  };
}

export async function getEnrichedPhoto(photoId: number): Promise<EnrichedPhoto> {
  const photo = await fetchPhoto(photoId);
  const album = await fetchAlbum(photo.albumId);
  const user = await fetchUser(album.userId);

  return {
    id: photo.id,
    title: photo.title,
    url: photo.url, // Already replaced in fetchPhoto
    thumbnailUrl: photo.thumbnailUrl, // Already replaced in fetchPhoto
    album: {
      id: album.id,
      title: album.title,
      user
    }
  };
}

export async function getEnrichedPhotos(queryParams: QueryParams): Promise<EnrichedPhoto[]> {
  // Fetch all data
  const [photos, albums, users] = await Promise.all([
    fetchPhotos(), // URLs already replaced in fetchPhotos
    fetchAlbums(),
    fetchUsers()
  ]);

  // Create a map for faster lookups
  const albumMap = new Map(albums.map(album => [album.id, album]));
  const userMap = new Map(users.map(user => [user.id, user]));

  // Enrich photos with album and user data
  let enrichedPhotos = photos.map(photo => {
    const album = albumMap.get(photo.albumId)!;
    const user = userMap.get(album.userId)!;

    return {
      id: photo.id,
      title: photo.title,
      url: photo.url, // Already replaced in fetchPhotos
      thumbnailUrl: photo.thumbnailUrl, // Already replaced in fetchPhotos
      album: {
        id: album.id,
        title: album.title,
        user
      }
    };
  });

  // Apply filters
  if (queryParams.title) {
    enrichedPhotos = enrichedPhotos.filter(photo => 
      photo.title.includes(queryParams.title!)
    );
  }

  if (queryParams['album.title']) {
    enrichedPhotos = enrichedPhotos.filter(photo => 
      photo.album.title.includes(queryParams['album.title']!)
    );
  }

  if (queryParams['album.user.email']) {
    enrichedPhotos = enrichedPhotos.filter(photo => 
      photo.album.user.email === queryParams['album.user.email']
    );
  }

  // Apply pagination
  const limit = queryParams.limit ? parseInt(queryParams.limit) : 25;
  const offset = queryParams.offset ? parseInt(queryParams.offset) : 0;

  return enrichedPhotos.slice(offset, offset + limit);
} 