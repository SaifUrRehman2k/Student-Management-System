import React, { useState } from 'react'

const Input = (props) => {
  return (
    <>
      <div className='flex flex-col flex-wrap items-start w-full self-center'>
        <label htmlFor={props.inputName} className='text-[12px] w-full  text-gray-700 font-[300] '>{props.inputName}</label>
        <input type={props.inputType} className='w-full shadow-gray-400 shadow-sm  bg-gray-300 rounded-[0.2em] px-2 py-1 outline-gray-400' placeholder={props.placeHolder} id={props.inputName} onChange={props.updatedVal} required />
      </div>
    </>
  )
}

export default Input

export const Radio = (props) => {
  const handleClick = () => {
    props.updatedVal({ target: { value: props.radioValue } })
  }


  return (
    <>
      <div 
        className={`flex flex-row flex-wrap items-baseline gap-1 w-[30%] h-[4em]  rounded-[0.7em] box-border p-2 shadow-gray-400 justify-between hover:cursor-pointer  ${props.radioValue === props.selectedVal ? 'bg-gray-600 shadow-lg text-gray-200': 'bg-gray-300 shadow-md text-gray-950'} `}
        onClick={handleClick}>
        <input 
          type='radio'
          checked={props.selectedVal == props.radioValue}
          value={props.radioValue}
          name={props.radioGroup}
          className='w-max  bg-gray-200 outline-gray-800 rounded-[0.2em] px-2 py-[1px]'
          id={props.inputTitle}
          onChange={props.updatedVal}
          required />
        <img src={props.icon} className='w-[18px]' />

        <label
          htmlFor={props.inputTitle} 
          className='text-[16px]/5 w-full font-[400] ' >
            {props.inputTitle}
        </label>

      </div>
    </>
  )
}