import React from 'react'

const Input = (props) => {
  return (
    <>
      <div className='flex flex-col flex-wrap items-start gap-1 w-full self-center'>
        <label htmlFor={props.inputName} className='text-[12px] w-full  text-gray-700 font-[300] '>{props.inputName}</label>
        <input type={props.inputType} className='outline-[1px] w-full  bg-gray-200 outline-gray-800 rounded-[0.2em] px-2 py-[1px]' placeholder={props.placeHolder} id={props.inputName} onChange={props.updatedVal} />
      </div>
    </>
  )
}

export default Input
