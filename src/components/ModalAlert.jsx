import React from 'react'

const ModalAlert = ({children , className}) => {
  return (
    <div className={`${className} flex justify-center items-center w-full h-[100vh] absolute top-0 left-0 right-0 bottom-0`}>
      {children}
    </div>
  )
}

export default ModalAlert
