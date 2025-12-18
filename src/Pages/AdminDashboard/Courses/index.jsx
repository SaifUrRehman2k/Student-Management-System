import React from 'react'
import Card1x1 from '../../../Components/Cards'
import { ButtonGroup } from '../../../Components/Button'

const Courses = () => {
  return (
    <>
      <h1 className='text-gray-800 sm:text-[2em] text-[1.4em] font-[500] my-5'>Courses</h1>
      <div className='p-2 my-12 grid grid-cols-3 grid-rows-2 gap-6'>
        <Card1x1 title={'Web-Devlopment'} titleInfo={
          <div className='flex items-center justify-center gap-2 '>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" className='fill-gray-400'><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
            <p>22k</p>

          </div>
        }
          classFromParent={'hover:translate-y-[-8px] transition-all'}
        >

          <div className='flex  flex-row flex-nowrap items-center justify-between w-full px-4 py-8'>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>
            <span className="m-0 p-0 text-3xl font-[50] text-gray-400">|</span>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>
            <span className="m-0 p-0 text-3xl font-[50] text-gray-400">|</span>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>
          </div>

          <ButtonGroup btn1Class={'bg-blue-500 text-gray-100'} title2='Settings' title1='View' btn2Class={'border-[2px] border-blue-500 text-gray-200'} />

        </Card1x1>


        <Card1x1 title={'Web-Devlopment'} titleInfo={
          <div className='flex items-center justify-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" className='fill-gray-400'><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
            <p>22k</p>
          </div>
        }
          classFromParent={'hover:translate-y-[-8px] transition-all'}
        >

          <div className='flex flex-row flex-nowrap items-center justify-between w-full px-4 py-8'>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>
            <span className="m-0 p-0 text-3xl font-[50] text-gray-400">|</span>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>
            <span className="m-0 p-0 text-3xl font-[50] text-gray-400">|</span>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>

          </div>

          <ButtonGroup btn1Class={'bg-blue-500 text-gray-100'} title2='Settings' title1='View' btn2Class={'border-[2px] border-blue-500 text-gray-200'} />
        </Card1x1>

        <Card1x1 title={'Web-Devlopment'} titleInfo={
          <div className='flex items-center justify-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" className='fill-gray-400'><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" /></svg>
            <p>22k</p>
          </div>
        }
          classFromParent={'hover:translate-y-[-8px] transition-all'}
        >

          <div className='flex flex-row flex-nowrap items-center justify-between w-full px-4 py-8'>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>
            <span className="m-0 p-0 text-3xl font-[50] text-gray-400">|</span>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>
            <span className="m-0 p-0 text-3xl font-[50] text-gray-400">|</span>
            <div className='flex flex-col flex-wrap items-center gap-2'>
              <h1 className='text-[1.4em] font-[600]'>Users</h1>
              <p className='text-[0.9em] font-[400]'>1</p>
            </div>

          </div>
          <ButtonGroup btn1Class={'bg-blue-500 text-gray-100'} title2='Settings' title1='View' btn2Class={'border-[2px] border-blue-500 text-gray-200'} />

        </Card1x1>

      </div>
    </>
  )
}

export default Courses