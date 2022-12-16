import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import App from '../App'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import {HomeView} from '../views/HomeView'
import LoginPage from '../views/LoginPage'
import MoviesView from '../views/MoviesView'
import SeriesPage from '../views/SeriesPage'
import SignUp from '../views/SignUp'
import SingleMovieView from '../views/SingleMovieView'
import UserLists from '../views/UserLists'


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/"  element={<App/>}/>  
        <Route index element={<HomeView/>}/>  
        <Route path="movies" element={<MoviesView/>}/>  
        <Route path=":movieId" element={<SingleMovieView/>}/>  
        <Route path="series" element={<SeriesPage/>}/>  
        <Route path="mylists" element={<UserLists/>}/>    
        <Route path="auth" element={<LoginPage/>}/>   
        <Route path="signup" element={<SignUp/>}/> 
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default AppRouter
