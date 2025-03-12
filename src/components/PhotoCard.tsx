import { EnrichedPhoto } from '../types';

interface PhotoCardProps {
  photo: EnrichedPhoto;
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="card group hover:transform hover:-translate-y-1 transition-all duration-200">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={photo.thumbnailUrl} 
          alt={photo.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 truncate" title={photo.title}>
          {photo.title}
        </h3>
        <div className="mt-3 space-y-1 text-sm">
          <p className="flex items-center text-gray-600">
            <span className="font-semibold mr-1">Album:</span>
            <span className="truncate" title={photo.album.title}>{photo.album.title}</span>
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-semibold mr-1">User:</span>
            <span>{photo.album.user.name}</span>
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-semibold mr-1">Email:</span>
            <span className="text-primary-600 truncate">{photo.album.user.email}</span>
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <a 
            href={photo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
          >
            View Full Size
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 