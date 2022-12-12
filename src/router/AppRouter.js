import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import App from '../App'
import Nav from '../components/Nav'
import {HomeView} from '../views/HomeView'
import LoginPage from '../views/LoginPage'
import SignUp from '../views/SignUp'
import SingleMovieView from '../views/SingleMovieView'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route index element={<HomeView/>}/>  
        <Route path="/:movieId" element={<SingleMovieView/>}/>          
        <Route path="/auth" element={<LoginPage/>}/>   
        <Route path="/signup" element={<SignUp/>}/> 
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
