import React, { useEffect, useReducer } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Basket from './pages/Basket'
import Menu from './pages/Menu'
import Favourites from './pages/Favourites'
import { initialState, reducer } from './store/store'
import { MainContext } from './store/context'
import Home from './pages/Home'
import { getAllData } from './api/request'
import NotFound from './pages/NotFound'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const url = 'https://foods-database.onrender.com/meals'

  useEffect(() => {
    getAllData(url, dispatch)
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route path='/' element={<Home />} />
        <Route path='/basket' element={<Basket />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/*' element={<NotFound />} />
      </Route>
    )
  )

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </MainContext.Provider>
  )
}

export default App
