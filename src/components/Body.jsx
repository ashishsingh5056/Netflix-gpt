import React from 'react'
import Login from './Login'
import Browse from './Browse'
import Error from './Error'
import { BrowserRouter,Routes,Route} from 'react-router-dom'

const Body = () => {

  
  
  
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='*' element={<Error/>}></Route>
    </Routes>
    </BrowserRouter>   
    </>
  )
}

export default Body
