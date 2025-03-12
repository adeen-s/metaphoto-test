import { useState, FormEvent } from 'react';
import { PhotosQueryParams } from '../services/api';

interface FilterFormProps {
  onFilter: (filters: PhotosQueryParams) => void;
  initialFilters: PhotosQueryParams;
}

export function FilterForm({ onFilter, initialFilters }: FilterFormProps) {
  const [title, setTitle] = useState(initialFilters.title || '');
  const [albumTitle, setAlbumTitle] = useState(initialFilters['album.title'] || '');
  const [userEmail, setUserEmail] = useState(initialFilters['album.user.email'] || '');
  const [limit, setLimit] = useState(initialFilters.limit || 25);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const filters: PhotosQueryParams = {
      limit
    };

    if (title) filters.title = title;
    if (albumTitle) filters['album.title'] = albumTitle;
    if (userEmail) filters['album.user.email'] = userEmail;

    onFilter(filters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Photos</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label htmlFor="title" className="form-label">
            Photo Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Filter by photo title"
            className="form-input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="albumTitle" className="form-label">
            Album Title
          </label>
          <input
            type="text"
            id="albumTitle"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            placeholder="Filter by album title"
            className="form-input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="userEmail" className="form-label">
            User Email
          </label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Filter by user email"
            className="form-input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="limit" className="form-label">
            Items per page
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="form-select"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-wrap gap-3 mt-4">
          <button type="submit" className="btn btn-primary">
            Apply Filters
          </button>
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={() => {
              setTitle('');
              setAlbumTitle('');
              setUserEmail('');
              setLimit(25);
              onFilter({ limit: 25 });
            }}
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
} 