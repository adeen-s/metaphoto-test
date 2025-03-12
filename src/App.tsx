import { useEffect, useState } from 'react'
import { PhotosPage } from './components/PhotosPage'

function App() {
  const [apiRunning, setApiRunning] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    // Check if the API is running
    const checkApi = async () => {
      try {
        const response = await fetch('http://localhost:3001/externalapi/photos?limit=1');
        if (response.ok) {
          setApiRunning(true);
        } else {
          setApiError(true);
        }
      } catch {
        setApiError(true);
      }
    };

    checkApi();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {apiError ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">API Not Running</h2>
            <p className="text-gray-700 mb-4">The API server is not running. Please start the API server with:</p>
            <pre className="bg-gray-100 p-3 rounded-md text-sm font-mono">npm run start-api</pre>
          </div>
        </div>
      ) : !apiRunning ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-primary-600 mb-4">Connecting to API...</h2>
            <p className="text-gray-700">Waiting for the API server to respond...</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </div>
      ) : (
        <PhotosPage />
      )}
    </div>
  )
}

export default App
