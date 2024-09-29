import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Container from './../components/Container';
import Header from '../components/Header';
import { MainContext } from './../store/context';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const MainLayout = () => {
  const location = useLocation();


  const { state, dispatch } = useContext(MainContext)


  if (localStorage.getItem("theme")?.length <= 0) {
    localStorage.setItem('theme', JSON.stringify(true))
  }



  useEffect(() => {
    if (state.mode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [state.mode]);
  




  return (
    // <TransitionGroup>
    //   <CSSTransition key={location.key} classNames="page" timeout={600} unmountOnExit>

    //   </CSSTransition>
    // </TransitionGroup>
    <div className='flex flex-col relative font-mont'>
      <div className=' sticky top-0 z-20 shadow-md' >
        <Header />
      </div>
      <div className='dark:bg-[#1a202c] bg-[#faf9f9] duration-500 sm:min-h-[calc(100vh-83px)] min-h-[calc(100vh-200px)] flex  max-h-max py-5 sm:pb-10 pb-[100px]'>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  )
}

export default MainLayout
