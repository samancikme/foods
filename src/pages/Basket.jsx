import { BiChevronUp } from "react-icons/bi"
import { BiChevronDown } from "react-icons/bi"
import React, { useContext, useState, useEffect, useRef } from "react"
import { MainContext } from "../store/context"

const Basket = () => {


  const { state, dispatch } = useContext(MainContext)
  const [loading, setLoading] = useState(true)
  const [basketItems, setBasketItems] = useState(() => {
    const storedBasket = localStorage.getItem("basket")
    return storedBasket
      ? JSON.parse(storedBasket)
      : state.basketFood?.map((item) => ({
        ...item,
        price: 5.5,
        quantity: 1,
        total: 5.5,
      })) || []
  })

  const [checkAct, setCheckAct] = useState(false)

  const calculateSubtotal = (items) => {
    return items.reduce((acc, item) => acc + item.total, 0)
  }

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basketItems))
    const subtotal = calculateSubtotal(basketItems)

    dispatch({ type: "SET_AMOUNT", payload: subtotal })
  }, [basketItems, dispatch])

  const updateItemQuantity = (itemId, operation) => {
    setBasketItems((prevItems) =>
      prevItems
        ?.map((item) => {
          if (item?.idMeal === itemId) {
            let newQuantity =
              operation === "increase" ? item.quantity + 1 : item.quantity - 1

            if (newQuantity < 1) {
              removeBasket(item)
              return null
            }

            return {
              ...item,
              quantity: newQuantity,
              total: item.price * newQuantity,
            }
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeBasket = (item) => {
    const basket = JSON.parse(localStorage.getItem("basket")) || []
    const basketData = basket.filter((food) => food.idMeal !== item.idMeal)
    setBasketItems(basketData)
  }


  return (
    <div >
      <div className="text-[30px] font-bold text-orange-400  text-center border-b-2 border-orange-200  mb-10 ">
        Basket
      </div>
      <div>
        {basketItems?.length <= 0 ? (
          <div className="flex justify-center items-start min-h-[calc(100vh-250px)] sm:text-[26px] text-[20px] dark:text-white font-semibold">
            <div>Basket is empty</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-[150px]">
            {basketItems?.map((item) => (
              <div
                key={item?.idMeal}
                className="relative border-[1px] border-[#fffff0] rounded-xl dark:bg-transparent bg-[#dfdfdf43] sm:flex-row flex-col p-3 flex justify-between gap-3"
              >
                <div className="flex justify-between items-center sm:flex-row flex-col gap-3">
                  <div className=" relative">
                    {loading ?
                      <div className="flex justify-center dark:text-white items-center w-[150px] h-[150px]">
                        Loading...
                      </div>
                      :
                      <img
                        className="w-[150px] h-[150px] object-contain rounded-xl border-[1px] border-gray-400 shadow-md"
                        src={item?.strMealThumb}
                        alt={item?.strMeal}
                        onLoad={() => setLoading(false)}
                      />
                    }
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
                    <div className="w-5">{item.total?.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-4">
                      <button
                        onClick={() =>
                          updateItemQuantity(item.idMeal, "decrease")
                        }
                        className="w-[25px] h-[25px] text-[22px] dark:text-white flex justify-center items-center rounded-md dark:bg-gray-500 bg-gray-300"
                      >
                        -
                      </button>
                      <div className="text-[16px] dark:text-white font-semibold w-5">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.idMeal, "increase")
                        }
                        className="w-[25px] h-[25px] text-[22px] dark:text-white flex justify-center items-center rounded-md dark:bg-gray-500 bg-gray-300"
                      >
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
      <div className={`${checkAct ? " translate-y-0" : " sm:translate-y-[205px] translate-y-[195px]"} duration-500 fixed left-0 right-0 sm:bottom-0 bottom-10 w-full sm:px-20 px-5 dark:bg-slate-800 bg-[#faf9f6] shadow-sm sm:pb-6 pb-10`}>
        <div className="flex flex-col gap-4 relative">
          <div className="text-[30px] font-bold text-orange-400 text-center border-b-2 border-orange-200 mb-5">
            Checkout
          </div>
          <div
            onClick={() => setCheckAct(!checkAct)}
            className=" absolute top-2 right-[-10px] dark:text-white text-[24px] duration-500 hover:border-opacity-100 border-opacity-0 dark:border-gray-300 active:scale-95  border-2 cursor-pointer rounded-full ">
            {checkAct ? <BiChevronDown /> : <BiChevronUp />}
          </div>
          <div className="flex justify-center items-start gap-2 flex-col">
            <div className="text-[16px]  w-full justify-between pr-10 dark:text-white font-semibold flex gap-2">
              Subtotal:
              <span className="flex-grow border-dotted border-b-2 border-gray-500 mx-1 relative top-[-6px]"></span>
              <div className="w-5 gap-2 flex">
                {state.amount !== null ? state.amount.toFixed(2) : "0.00"}
                <span className="text-orange-300"> $ </span>
              </div>
            </div>
            <div className="text-[16px] w-full justify-between pr-10 dark:text-white font-semibold flex gap-2 ">
              Delivery:
              <span className="flex-grow border-dotted border-b-2 border-gray-500 mx-1 relative top-[-6px]"></span>
              <div className="w-5 flex gap-2">
                5.00 <span className="text-orange-300"> $ </span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col gap-3">
              <div className="dark:text-white flex justify-between text-[20px] font-bold gap-3">
                <span>Total: </span>
                {!basketItems?.length <= 0 ?
                  <div className="">
                    {state.amount !== null
                      ? (parseFloat(state.amount.toFixed(2)) + 5.00).toFixed(2)
                      : "5.00"}
                  </div> : "0.00"}
                <span className="text-orange-300"> $ </span>
              </div>
              <button className="text-[14px] font-bold px-5 min-w-[120px] hover:bg-blue-300 active:scale-95 duration-300 py-2 rounded-xl bg-blue-200">
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Basket
