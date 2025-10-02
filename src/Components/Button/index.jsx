import React from 'react'

const Button = (props) => {
    return (
        <>
            <button type='button' className='w-[100%] py-1 bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-300 hover:text-gray-800' onClick={props.btnFucntiion}>{props.title}</button>
        </>
    )
}

export const Submit = (props) => {
    return (
        <>
            <button type='Submit' className='w-[100%] py-1 bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-300 hover:text-gray-800'>{props.title}</button>
        </>
    )
}

export default Button
