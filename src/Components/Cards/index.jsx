import React from 'react'

const Card1x1 = ({ children, title, titleInfo, classFromParent }) => {
  return (
    <div className={`flex flex-col flex-nowrap items-center gap-4 dark:bg-slate-800 dark:text-gray-200 py-2 px-4 rounded-[1em] shadow-[3px_2px_12px] shadow-gray-300 dark:shadow-gray-700 bg-gray-50 ${classFromParent}`}>
      <div className='w-full flex flex-row flex-nowrap items-center justify-between'>
        <b className='text-[16px] font-[500] text-gray-800 dark:text-gray-200'>{title}</b>
        <small className='text-[12px] font-[400] text-gray-600 dark:text-gray-400'>{titleInfo}</small>
      </div>
      <div className='w-full h-[90%] flex flex-col flex-nowrap gap-2'>
        {children}
      </div>
    </div>
  )
}

export const Card1x2 = ({ children, title, titleInfo, classFromParent }) => {
  return (
    <div className={`flex flex-col flex-nowrap items-center gap-4 dark:bg-slate-800 dark:text-gray-200  py-2 px-4 rounded-[1em] shadow-[3px_2px_12px] shadow-gray-300 dark:shadow-gray-700 bg-gray-50 ${classFromParent}`}>
      <div className='w-full flex flex-row flex-nowrap items-center justify-between'>
        <b className='text-[16px] font-[500] text-gray-800 dark:text-gray-200'>{title}</b>
        <small className='text-[12px] font-[400] text-gray-600 dark:text-gray-400'>{titleInfo}</small>
      </div>
      <div className='w-full h-[90%]'>
        {children}
      </div>
    </div>
  )
}

export const Card2x1 = ({ children, title, titleInfo, classFromParent }) => {
  return (
    <div className={`flex flex-col flex-nowrap items-center gap-4 dark:bg-slate-800 dark:text-gray-200  py-2 px-4 rounded-[1em] shadow-[3px_2px_12px] shadow-gray-300 dark:shadow-gray-700 bg-gray-50 ${classFromParent}`}>
      <div className='w-full flex flex-row flex-nowrap items-center justify-between'>
        <b className='text-[16px] font-[500] text-gray-800 dark:text-gray-200'>{title}</b>
        <small className='text-[12px] font-[400] text-gray-600 dark:text-gray-400'>{titleInfo}</small>
      </div>
      <div className='w-full h-[90%]'>
        {children}
      </div>
    </div>
  )
}


export const MiniCard = ({children, classFromParent }) => {
  return (

    <div className={`flex flex-row items-center justify-start gap-6 h-[5em] px-2 py-1 inset-shadow-[1px_2px_3px] inset-shadow-gray-300 dark:inset-shadow-gray-700 rounded-[0.8em] ${classFromParent}`}>
      {children}
    </div>

  )
}



export default Card1x1
