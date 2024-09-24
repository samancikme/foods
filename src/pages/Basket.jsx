import React, { useContext, useState, useEffect } from "react"
import { MainContext } from "../store/context"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

const Basket = () => {
  const { state, dispatch } = useContext(MainContext)

  const [basketItems, setBasketItems] = useState(() =>
    state.basketFood?.map((item) => ({
      ...item,
      price: 5.5,
      quantity: 1,
    }))
  )


  const updateItemQuantity = (itemId, operation) => {
    setBasketItems((prevItems) =>
      prevItems?.map((item) => {
        if (item?.idMeal === itemId) {
          let newQuantity =
            operation === "increase"
              ? item.quantity + 1
              : item.quantity - 1

          if (newQuantity < 1) {
            return { ...item, toRemove: true }
          }

          return {
            ...item,
            quantity: newQuantity,
            price: 5.5 * newQuantity,
          }
        }
        return item
      })
    )
  }

  useEffect(() => {
    const itemsToRemove = basketItems?.filter((item) => item.toRemove)
    if (itemsToRemove?.length > 0) {
      itemsToRemove?.forEach((item) => removeBasket(item))
      setBasketItems((prevItems) =>
        prevItems.filter((item) => !item.toRemove)
      )
    }
  }, [basketItems])

  const removeBasket = (item) => {
    const basket = JSON.parse(localStorage.getItem("basket")) || []
    const basketData = basket.filter((food) => food?.idMeal !== item?.idMeal)
    localStorage.setItem("basket", JSON.stringify(basketData))
    dispatch({ type: "REMOVE_BASKET" })
  }

  return (
    <div>
      <div className="text-[30px] font-bold text-orange-400 text-center border-b-2 border-orange-200 mb-5 ">
        Basket
      </div>
      <div>
        {basketItems?.length <= 0 ? (
          <div className="flex justify-center items-center min-h-[calc(100vh-210px)] sm:text-[28px] text-[20px] dark:text-white font-semibold">
            <div>Basket is empty</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {basketItems?.map((item) => (
              <div
                key={item?.idMeal}
                className={`relative border-[1px] rounded-xl shadow-2xl sm:flex-row flex-col p-3 flex justify-between gap-3 `}>
                <div className="flex justify-between items-center sm:flex-row flex-col gap-3">
                  <div className="relative">
                    <img
                      className="w-[150px] h-[150px] object-contain rounded-xl border-[1px] border-gray-400 shadow-md"
                      src={item?.strMealThumb}
                      alt={item?.strMeal}
                    />
                    <div className="absolute top-[-10px] right-[-40px]">
                      <button
                        onClick={() => addFavourite(item)}
                        className="text-[28px] rounded-full font-semibold duration-500 w-[40px] h-[40px] text-red-500 flex justify-center items-center">
                        {state.favFood?.find(
                          (food) => food.idMeal === item.idMeal
                        ) ? (
                          <AiFillHeart />
                        ) : (
                          <AiOutlineHeart />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-start items-start">
                    <h2 className="text-[16px] dark:text-white font-bold py-2">
                      {item?.strMeal}
                    </h2>
                  </div>
                </div>
                <div className="flex justify-between items-center px-2 gap-[50px] duration-500">
                  <div className="flex justify-center items-center text-[16px] dark:text-white font-medium gap-1">
                    Total: <span className="text-orange-300"> $ </span>
                    <div className="w-5">{item.price.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-4">
                      <button
                        onClick={() =>
                          updateItemQuantity(item.idMeal, "decrease")
                        }
                        className="w-[25px] h-[25px] text-[22px] dark:text-white flex justify-center items-center rounded-md dark:bg-gray-500 bg-gray-300">
                        -
                      </button>
                      <div className="text-[16px] dark:text-white font-semibold w-5">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.idMeal, "increase")
                        }
                        className="w-[25px] h-[25px] text-[22px] dark:text-white flex justify-center items-center rounded-md dark:bg-gray-500 bg-gray-300">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Basket
