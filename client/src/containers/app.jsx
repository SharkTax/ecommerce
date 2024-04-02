import React, {Suspense, useCallback, useEffect} from 'react'
import {Routes, Route} from "react-router-dom"
import { AdminHome, Authentication, Home, UserProfile } from '../pages'
import { Layout, AdminLayout, AuthLayout } from '../layouts'
import { auth } from '../config/firebase.config'


const App = () => {

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((userCred)=>{
      if(userCred){
        userCred.getIdToken().then((token)=>{
          console.log(token);
        })
      }
    })

    return ()=> unsubscribe()
  },[auth])

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {/* this route have an child, and at the layout componnet has an OUTLET
             component that renders the child, which you have to indicate the path,
            in this case : path="./"*/}
            <Route element={<Layout/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/profile/:uid' element={<UserProfile/>} />
            </Route>


        {/* admin Layout */}
            <Route path='/admin/*' element={<AdminLayout/>}>
              <Route index element={<AdminHome/>}/>
            </Route>

            <Route path='/auth/*' element={<AuthLayout/>}>
              <Route index element={<Authentication/>}/>
            </Route>

        </Routes>

    </Suspense>
  )
}
//2:04:00
export default App