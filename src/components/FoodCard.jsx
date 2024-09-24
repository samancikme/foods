import { AiFillHeart } from "react-icons/ai"
import { AiOutlineHeart } from "react-icons/ai"
import React, { useContext, useState } from 'react'
import { MainContext } from "../store/context"
import { Navigate, useNavigate } from "react-router-dom"

const FoodCard = ({ item, path }) => {
  const { state, dispatch } = useContext(MainContext)

  const [loading, setLoading] = useState(true)

  const addBasket = (item) => {
    const basket = JSON.parse(localStorage.getItem('basket')) || []
    const newBasketItem = state.foodData.meals?.find(
      (food) => food.idMeal === item.idMeal
    )
    if (!basket.find((food) => food?.idMeal === item?.idMeal)) {
      const basketData = [...basket, newBasketItem]
      localStorage.setItem('basket', JSON.stringify(basketData))
      dispatch({ type: 'REMOVE_BASKET' })
    }
  }


  const navigate = useNavigate()
  const handleBasketClick = (item) => {
    if (
      state.basketFood?.find((food) => food?.idMeal === item?.idMeal)
    ) {
      navigate("/basket")
    } else {
      addBasket(item)
    }
  }

  const addFavourite = (item) => {
    const favourite = JSON.parse(localStorage.getItem('favourite')) || []
    const newfavItem = state.foodData.meals?.find(
      (food) => food.idMeal === item.idMeal
    )
    if (!favourite.find((food) => food.idMeal === item.idMeal)) {
      const favData = [...favourite, newfavItem]
      localStorage.setItem('favourite', JSON.stringify(favData))
      dispatch({ type: 'REMOVE_FAVORITE' })
    } else {
      const updatedFavourite = favourite.filter(
        (food) => food.idMeal !== item.idMeal
      )
      localStorage.setItem('favourite', JSON.stringify(updatedFavourite))
      dispatch({ type: 'REMOVE_FAVORITE' })
    }
  }

  return (
    <div className="relative border-[1px] rounded-xl shadow-2xl p-3 flex flex-col gap-3">
      <div className="flex justify-center flex-col gap-3 flex-1">
        <div className="">
          {loading && (
            <div className="flex justify-center items-center h-[200px]">
              Loading...
            </div>
          )}
          <img
            className={`max-w-[100%] rounded-xl border-[1px] border-gray-400 shadow-md ${loading ? 'hidden' : 'block'}`}
            src={item.strMealThumb}
            alt={item.strMeal}
            onLoad={() => setLoading(false)}
          />
        </div>
        <div className="flex justify-start items-start border-t-[1px] border-gray-400">
          <h2 className="text-[16px] dark:text-white font-bold h-[60px] py-2">
            {item.strMeal}
          </h2>
        </div>
      </div>
      <div className="flex justify-between items-center px-2 flex-1">
        <div className="flex justify-between items-center gap-2 flex-[2]">
          <button
            onClick={() => {
              handleBasketClick(item)
            }}
            className="px-1 py-2 rounded-lg bg-blue-300 flex-[5] hover:bg-blue-400 active:scale-95 duration-300 text-[14px] font-semibold"
          >
            {state.basketFood?.find((food) => food?.idMeal === item?.idMeal)
              ? 'Go to the basket'
              : 'Add to the basket'}
          </button>
          <button
            onClick={() => addFavourite(item)}
            className="text-[28px] rounded-full font-semibold flex-1 duration-500 w-[40px] h-[40px] text-red-500 flex justify-center items-center"
          >
            {state.favFood?.find((food) => food.idMeal === item.idMeal) ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart />
            )}
          </button>
        </div>
        <div className="text-[16px] flex justify-center items-start dark:text-white flex-1 font-medium">
          5.5 $
        </div>
      </div>
    </div>
  )
}

export default FoodCard