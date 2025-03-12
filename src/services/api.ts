import axios from 'axios';
import { EnrichedPhoto } from '../types';

// Determine the API base URL based on the environment
const API_BASE_URL = import.meta.env.PROD 
  ? '/externalapi' // In production, use relative path for Vercel
  : 'http://localhost:3001/externalapi'; // In development, use localhost

export interface PhotosQueryParams {
  title?: string;
  'album.title'?: string;
  'album.user.email'?: string;
  limit?: number;
  offset?: number;
}

export async function getPhoto(id: number): Promise<EnrichedPhoto> {
  const response = await axios.get<EnrichedPhoto>(`${API_BASE_URL}/photos/${id}`);
  return response.data;
}

export async function getPhotos(params: PhotosQueryParams = {}): Promise<EnrichedPhoto[]> {
  const response = await axios.get<EnrichedPhoto[]>(`${API_BASE_URL}/photos`, { params });
  return response.data;
} 