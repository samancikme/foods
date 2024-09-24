import React, { useContext } from 'react'
import { MainContext } from '../store/context'
import FoodCard from '../components/FoodCard'

const Favourites = () => {


  const { state, dispatch } = useContext(MainContext)

  // console.log(state.favFood? true : false)



  return (
    <div className=''>
      <div className="text-[30px] font-bold  text-orange-400 text-center border-b-2 border-orange-200 mb-5 ">
        Favourites
      </div>
      <div className=''>
        {state.favFood?.length <= 0 ?
          <div className='flex justify-center items-center min-h-[calc(100vh-210px)] sm:text-[28px] text-[20px] dark:text-white font-semibold'>
            <div className="">
              Favourutes is empty
            </div>
          </div >
          :
          <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3'>
            {state.favFood?.map(item => {
              return (
                <FoodCard key={item.idMeal} item={item} />
              )
            })}
          </div>}
      </div>
    </div>
  )
}

export default Favourites
