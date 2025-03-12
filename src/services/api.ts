import axios from 'axios';
import { EnrichedPhoto } from '../api/types';

const API_BASE_URL = 'http://localhost:3001/externalapi';

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