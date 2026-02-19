import React from 'react'

const notfound = () => {
  return (
   <div className="flex flex-col items-center justify-center h-screen bg-black text-center">
      <h1 className="text-7xl font-bold text-yellow-700">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg"
      >
        Go Back Home
      </a>
    </div>
  )
}

export default notfound 