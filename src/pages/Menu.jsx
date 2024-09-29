import React, { useContext } from 'react'
import { MainContext } from '../store/context'
import FoodCard from '../components/FoodCard'
import Loader from '../components/Loader'

const Menu = () => {

  
  const { state} = useContext(MainContext)


  return (
    <div className='flex flex-col'>
      <div className="text-[30px] font-bold text-orange-400 text-center border-b-2 border-orange-200 mb-5 ">
        Menu
      </div>
      <div className=''>
        {state.loading ? <Loader />
          :
          <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3'>
            {state.foodData?.map(item => {
              return (
                <FoodCard key={item.idMeal} item={item} />
              )
            })}
          </div>}
      </div>
    </div>
  )
}

export default Menu
