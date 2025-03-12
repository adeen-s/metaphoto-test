export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Album {
  id: number;
  userId: number;
  title: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface EnrichedAlbum extends Omit<Album, 'userId'> {
  user: User;
}

export interface EnrichedPhoto extends Omit<Photo, 'albumId'> {
  album: EnrichedAlbum;
}

export interface QueryParams {
  title?: string;
  'album.title'?: string;
  'album.user.email'?: string;
  limit?: string;
  offset?: string;
} 