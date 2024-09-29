import { CgSearch } from "react-icons/cg";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import { BiSearchAlt } from "react-icons/bi";
import { useContext, useRef } from 'react'
import Container from './Container';
import { MainContext } from "../store/context";
import { Link, useLocation } from "react-router-dom";
import { btns } from "../store/consts";
import logo from '../images/logo.png'

const Header = () => {

  const modalAlert = useRef()

  const searchForm = () => {
    if (modalAlert.current.classList.contains('modal')) {
      dispatch({ type: 'TOGGLE_MODAL_ALERT' })
    }
  }

  const { pathname } = useLocation()
  const { state, dispatch } = useContext(MainContext)


  return (
    <div className="dark:bg-[#171923] bg-[#faf9f6] py-3 duration-500 z-10 sm:relative w-full fixed bottom-0">
      <Container>
        <div className="flex justify-between items-center gap-3 sm:flex-row flex-col">
          <Link className="sm:flex hidden w-[100%] ss:w-[30%] mm:justify-start  justify-center items-center" to={'/'}>
            <img
              className="w-[120px] h-[60px] object-contain"
              src={logo}
              alt="logo" />
          </Link>
          <div
            className=" flex justify-between sm:w-[60%] lg:w-[40%] ss:flex-1 w-[100%]  items-center">
            {/* <button
              onClick={() => {
                dispatch({ type: 'TOGGLE_MODAL_ALERT' })
              }}
              className="hidden flex-col justify-center items-center sm:flex">
              <div className="text-[24px] text-black dark:text-white"><CgSearch /></div>
              <div className="text-[14px] font-medium text-black dark:text-white">Search</div>
            </button> */}
            {btns.map(btn => {
              const actBtn = pathname === btn.path ? true : false
              const Icon = btn.icon
              return (
                <Link key={btn.id} to={btn.path} className="flex  flex-col justify-center items-center">
                  <div className={`${actBtn ? "text-black dark:text-white " : "dark:text-gray-400 text-gray-600"} text-[24px] relative`}>
                    <Icon />
                    <div className={`${btn.title === "Favourites" ? "flex" : "hidden"} w-[25px] h-[25px] bg-[#d7d7d7] dark:bg-[#a9a9a9b6] felx justify-center items-center rounded-full absolute top-[-10px] duration-500 right-[-30px] text-[16px] font-bold text-black  dark:text-white`}>
                      {state.favFood ? state.favFood.length : "0"}
                    </div>
                  </div>
                  <div className={`text-[14px] font-medium ${actBtn ? "dark:text-white text-black" : " dark:text-gray-600 text-gray-600"}`}>
                    {btn.title}
                  </div>
                </Link>
              )
            })}
            <div
              onClick={() => {
                dispatch({ type: 'TOGGLE_MODE' })
              }}
              className="flex flex-col justify-center items-center">
              <div className={` ${state.mode ? "text-blue-400" : "text-yellow-200 "} text-[24px] justify-center items-center flex  rounded-md `}>
                {!state.mode ? <BiSun /> : <BiMoon />}
              </div>
              <div className="dark:text-white cursor-pointer text-[14px] font-medium">Mode </div>
            </div>
          </div>
        </div>
      </Container>
      <div
        onClick={() => searchForm()}
        ref={modalAlert}
        className={`${state.modalAlert ? 'modal fixed inset-0 bg-[#00000057] backdrop-blur-2xl flex justify-center items-center' : "hidden"} `}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative z-10 w-[500px] h-max bg-white dark:bg-[#333] rounded-2xl px-4 py-3 transition-all duration-500 ease-in-out 
            ${state.modalAlert ? 'translate-y-0 opacity-100' : 'translate-y-[-200px] opacity-0'}`}>
          <form className="relative w-full" onClick={(e) => e.stopPropagation()}>
            <label htmlFor="input">
              <input
                placeholder="Enter the meal name..."
                className="text-[16px] px-6 py-2 border-2 dark:bg-[#3333334d] dark:text-white border-gray-400 rounded-xl w-full"
                type="text"
                id="input"
              />
              <button
                className="absolute top-0 bottom-0 right-3 dark:text-white text-[24px]"
                type="submit"
              >
                <BiSearchAlt />
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Header;
