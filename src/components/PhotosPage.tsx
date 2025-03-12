import { useState, useEffect } from 'react';
import { getPhotos, PhotosQueryParams } from '../services/api';
import { EnrichedPhoto } from '../api/types';
import { FilterForm } from './FilterForm';
import { PhotoGrid } from './PhotoGrid';
import { Pagination } from './Pagination';

export function PhotosPage() {
  const [photos, setPhotos] = useState<EnrichedPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState<PhotosQueryParams>({
    limit: 25,
    offset: 0
  });

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const data = await getPhotos(filters);
        setPhotos(data);
        if (!filters.title && !filters['album.title'] && !filters['album.user.email']) {
          setTotalItems(5000); // Temporarily added for demo purposes
        } else {
          setTotalItems(data.length * 10);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [filters]);

  const handleFilter = (newFilters: PhotosQueryParams) => {
    setCurrentPage(0);
    setFilters({
      ...newFilters,
      offset: 0
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setFilters({
      ...filters,
      offset: page * (filters.limit || 25)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-primary-800">
            MetaPhoto Gallery
          </h1>
        </header>
        
        <FilterForm onFilter={handleFilter} initialFilters={filters} />
        
        <PhotoGrid photos={photos} loading={loading} />
        
        {!loading && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={filters.limit || 25}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
} 