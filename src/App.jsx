import useFetchPhotos from "./hooks/useFetchPhotos"
import { useState,useEffect } from "react"



function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const filteredPhotos = photos.filter((photo) =>
    photo.author.toLowerCase().includes(debouncedSearch.toLowerCase())
  )


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
      <div className="flex justify-center mb-6">
        <input
         type="text"
         placeholder="Search by author..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         className="w-full max-w-md p-2 border rounded-lg"
         />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
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