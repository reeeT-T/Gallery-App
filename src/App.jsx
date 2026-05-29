import useFetchPhotos from "./hooks/useFetchPhotos"

function App() {
  const { photos, loading, error } = useFetchPhotos()

  if (loading) {
    return (
      <div className="text-center p-10 text-xl">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-red-500 text-5xl">
        TEST
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg overflow-hidden shadow">
            <img
              src={`https://picsum.photos/id/${photo.id}/400/300`}
              alt={photo.author}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 text-sm">
              {photo.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App