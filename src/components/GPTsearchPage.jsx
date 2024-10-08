import React from 'react'
import GPTmovieSuggestions from './GPTmovieSuggestions'
import GPTsearchBar from './GPTsearchBar'
import { BG_URL } from '../utils/constants'



const GPTsearchPage = () => {
  return (
    <>
    <div className='absolute  -z-10'>
      <img className='h-screen object-cover md:w-screen ' src={BG_URL} alt="logo-login" />
    </div>
    <div>
        <GPTsearchBar />
        <GPTmovieSuggestions />
      </div>
      </>
  )
}

export default GPTsearchPage
