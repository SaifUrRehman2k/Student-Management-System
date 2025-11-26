import React from 'react'

const Button = (props) => {
    return (
        <>
            <button type='button' className={`py-1 hover:cursor-pointer rounded-[0.5em] ${props.classFromParent}`} onClick={props.btnFucntiion}>{props.title}</button>
        </>
    )
}

export const ButtonGroup = (props) => {
    return (
        <>
            <div className="w-full flex flex-row flex-nowrap justify-between">
                <button type='button' className={`py-1 hover:cursor-pointer rounded-[0.5em] w-[48%] ${props.btn1Class}`} onClick={props.btn1Fucntiion}>{props.title1}</button>
                <button type='button' className={`py-1 hover:cursor-pointer rounded-[0.5em] w-[48%]  ${props.btn2Class}`} onClick={props.btn2Fucntiion}>{props.title2}</button>
            </div>
        </>
    )
}

export const Submit = (props) => {
    return (
        <>
            <button disabled={props.isDisabled} type='Submit' className='w-[100%] disabled:bg-gray-400 disabled:cursor-default disabled:text-gray-800 py-1 bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-300 hover:text-gray-800'>{props.title}</button>
        </>
    )
}

export default Button
