import React, { useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [userdata, setUserData] = React.useState([])
  const [index, setIndex] = React.useState(1)
  const [loading, setLoading] = React.useState(true)

  const getdata = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=5`
      )
      setUserData(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(function () {
    getdata()
  }, [index])

  let printUserdata = <p className="text-gray-400">No user available</p>
  if (userdata.length > 0) {
    printUserdata = userdata.map(function (elem, idx) {
      return (
        <div key={idx}>
          <a href={elem.download_url} target="_blank" rel="noopener noreferrer">
            <div className="h-44 w-60 overflow-hidden bg-white rounded-xl">
              <img
                className="h-full w-full object-cover"
                src={`https://picsum.photos/id/${elem.id}/480/352`}
                alt={elem.author}
              />
            </div>
            <h2 className="font-bold text-white text-lg mt-2">{elem.author}</h2>
            <p className="text-gray-400 text-sm">ID: {elem.id}</p>
          </a>
        </div>
      )
    })
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-6">
      <div className="min-h-[600px] flex items-center justify-center">
        {loading ? (
          <h1 className="text-white text-2xl font-semibold animate-pulse">
            Loading...
          </h1>
        ) : (
          <div className="text-white flex flex-wrap gap-6 justify-center max-w-[540px]">
            {printUserdata}
          </div>
        )}
      </div>

      <h2 className="text-white mt-4">Page: {index}</h2>

      <div className="flex justify-center gap-4 mt-2">
        <button
          className="bg-blue-500 text-white active:scale-95 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => {
            if (index > 1) {
              setIndex(index - 1)
            }
          }}
        >
          Previous
        </button>

        <button
          className="bg-blue-500 text-white active:scale-95 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => {
            setIndex(index + 1)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App