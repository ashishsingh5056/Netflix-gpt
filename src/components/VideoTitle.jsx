import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <>
      <div className='w-screen aspect-video pt-[35%] px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-6  text-lg'>{overview}</p>
     
      <div className='my-4 md:m-0'>
        <button className='bg-red-600 py-1 md:py-4 md:px-10  px-3 rounded-lg text-black text-xl bg-opacity-80 hover:bg-opacity-50'>▶️ Play</button>
        <button className='bg-gray-400 hidden md:inline-block ml-2 py-1 md:py-4 md:px-10  px-3   rounded-lg text-black text-xl hover:bg-opacity-45'>ℹ️More Info</button>
      </div>
      </div>
    </>
  )
}

export default VideoTitle
