import { BsArrowRight } from "react-icons/bs";
import React, { useContext } from 'react'
import { MainContext } from '../store/context'
import FoodCard from '../components/FoodCard'
import { Link } from "react-router-dom";
import img from '../images/home.png'
import Loader from "../components/Loader";

const Home = () => {

  const { state } = useContext(MainContext)

  return (
    <div>
      <div className="flex justify-between items-center md:flex-row flex-col  py-[50px] gap-4" >
        <div className=" flex flex-col text-center md:text-start gap-3 md:flex-1 w-full" >
          <h1 className="dark:text-white lg:text-[64px] sm:text-[40px] text-[36px] font-bold">
            The Fastest Delivery In
            <span className="text-orange-300">Your City</span>
          </h1>
          <p className="dark:text-white text-[16px] font-medium">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo, sed proin amet a vestibulum enim volutpat lacus. Volutpat arcu sit sed tortor etiam volutpat ipsum.</p>
          <div className="">
            <button className='px-5 mt-5 py-3 bg-teal-300 rounded-xl font-medium hover:bg-teal-400 active:scale-95 duration-500'>
              Order now
            </button>
          </div>
        </div>
        <div className="md:flex-1 w-full flex md:justify-end justify-center">
          <img className=' translate-x-[-15px]' src={img} alt="" />
        </div>
      </div>
      <div className=" flex flex-col gap-5">
        <div className="text-[30px] text-center text-orange-500 font-semibold border-b-2 border-orange-300 ">
          Menu
        </div>
        <div className="">
          {state.loading ?
            <Loader />
            :
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
              {state.foodData.meals?.slice(0, 8).map(element => {
                return (
                  <FoodCard key={element.idMeal} item={element} />
                )
              })}
            </div>}

        </div>
        <div className=" flex justify-center items-center">
          <Link to={'/menu'}>
            <button className="bg-orange-300 hover:bg-orange-400 active:scale-95 duration-300 flex justify-between items-center gap-2 px-4 py-2 rounded-xl ">
              <span className="text-[16px] font-semibold">Show more meals</span>
              <span className="text-[20px]">
                <BsArrowRight />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
