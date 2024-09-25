import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate';
import {auth} from '../utils/Firebase'
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVTAR } from '../utils/constants';
import { BG_URL } from '../utils/constants';

function Login() {
     
    const[isSignInForm, setSignInForm]=useState(true);
    const[errorMessage,setErrorMessage]=useState(null);
    const dispatch=useDispatch();



    const email= useRef(null)
    const password=useRef(null)
    const name=useRef(null)
    const Phno= useRef(null)

     const handleButtonClick=()=>{
        // validate the form
        // console.log(email.current.value);
        // console.log(password.current.value);
        // console.log(name.current.value);
        
        const message= checkValidData(email.current.value,password.current.value)
        setErrorMessage(message);
        //  console.log(message);
        if(message) 
          {
            return;
          }
            
            if(!isSignInForm){
                  // sign-Up logic
                  createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
                  .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
              //  console.log(user);
           
          updateProfile(user, {
            displayName: name.current.value,
           photoURL: USER_AVTAR
            }).then(() => {
           // Profile updated!
           const{uid,email,displayName,photoURL}=auth.currentUser;
            dispatch(addUser({
             uid:uid,
           email:email,
           displayName:displayName,
           photoURL:photoURL,
          })
          );

  
      
    })
    .catch((error) => {
      // An error occurred
      setErrorMessage(error.message);
    });
  
      })
     .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
    
  });
}
 else{
      // sign in logic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });

 }     
};
       
    const toggleSignInForm=()=>{
        setSignInForm(!isSignInForm);
       };
  return (
    
    <>
       <Header/>
      <div className='absolute'>
       <img src={BG_URL} alt="logo-login" />
       </div>
    <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 absolute my-36  mx-auto right-0 left-0 bg-black p-12 text-white rounded-lg bg-opacity-80'>
    <h1 className='font-bold text-3xl py-4'>{isSignInForm?"Sign In" : "Sign Up"}</h1>
       {!isSignInForm && (<input  ref={name} type="text" placeholder='Full Name' className='p-2 my-4 w-full bg-gray-700' />)} 
       {!isSignInForm && (<input ref={Phno} type="number" placeholder='Enter Phone Number' className='p-2 my-4 w-full bg-gray-700' />)}
        <input ref={email} type="text" placeholder='Email Address' className='p-2 my-4 w-full bg-gray-700' />
        <input ref={password} type="password" placeholder='Password' className='p-2 my-4 w-full bg-gray-700' />
        <p className='m-2 text-red-600'>{errorMessage}</p>
        <button className='p-2 my-6  w-full bg-red-600 rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className=' py-4 cursor-pointer' onClick={toggleSignInForm}>{ isSignInForm ? "New to Netflix? Sign Up Now" :"Already Registered Sign In Now"}</p>
    </form>
    
    
    
    </>
       
     )
    }


  export default Login
