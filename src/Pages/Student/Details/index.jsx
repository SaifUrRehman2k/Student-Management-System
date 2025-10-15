import React from 'react'
import Card1x1, { Card1x2, Card2x1, MiniCard } from '../../../Components/Cards'
import { useSelector } from 'react-redux'
import Input from '../../../Components/Input/index'

const Details = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  console.log(user);


  return (
    <>
      <section className='container mx-auto my-12 px-4 h-[95em] md:h-[45em] grid grid-cols-3 md:grid-rows-4 grid-rows-9 gap-6 '>
        <Card1x2 title={'Basic Info'} titleInfo={'This week'} classFromParent='md:row-start-1 md:row-end-3 md:col-start-1 md:col-end-3 row-start-1 row-end-3 col-start-1 col-end-4 '>
          <MiniCard classFromParent={'w-full flex flex-row justify-between px-4 '}>
            <p className='text-[16px]'>Name</p>
            <b className='text-[18px]'>{user.first_name + ' ' + user.last_name}</b>
          </MiniCard>
          <MiniCard classFromParent={'w-full flex flex-row justify-between px-4 '}>
            <p className='text-[16px]'>Email</p>
            <b className='text-[18px]'>{user.email}</b>
          </MiniCard>
          <MiniCard classFromParent={'w-full flex flex-row justify-between px-4 '}>
            <p className='text-[16px]'>Password</p>
            <b className='text-[18px]'>{user.password}</b>
          </MiniCard>
        </Card1x2>

        {/* <Card1x1 title={'Assignments'} titleInfo={'This week'} classFromParent={' md:row-start-1  md:row-end-3 md:col-start-2 md:col-end-3 row-start-3 row-end-5 col-start-1 col-end-4 col-span-full row-span-full'}>
          <MiniCard />
          <MiniCard />
          <MiniCard />

        </Card1x1> */}
        <Card1x2 title={'Update Info'} titleInfo={'this month'} classFromParent={'md:row-start-1 md:row-end-5 md:col-start-3 md:col-end-6 row-start-5 row-end-7 col-start-1 col-end-4 col-span-full row-span-full'}>
            <div className='flex flex-col flex-wrap items-center justify-start py-8 gap-4 h-[90%] w-full'>
              <label className='p-0 m-0 text-[12px] self-start'>Name</label>
              <input type="text" placeholder={user.first_name } className='w-full bg-gray-300 text-gray-800 p-2 rounded-2xl' disabled/>
              <input type="text" placeholder={user.last_name} className='w-full bg-gray-300 text-gray-800 p-2 rounded-2xl' disabled/>
              <br />
              <label className='p-0 m-0 text-[12px] self-start'>Email/Passeord</label>
              <input type="email" placeholder={user.email} className='w-full bg-gray-300 text-gray-800 p-2 rounded-2xl' disabled/>
              <input type="password" placeholder={user.password} className='w-full bg-gray-300 text-gray-800 p-2 rounded-2xl' disabled/>

            </div>
        </Card1x2>

        <Card1x2 title={'Score'} titleInfo={'this month'} classFromParent={'md:row-start-3 md:row-end-5 md:col-start-1 md:col-end-3 row-start-7 row-end-10 col-start-1 col-end-4 col-span-full row-span-full'}>
          <MiniCard classFromParent={'w-full flex flex-row justify-between px-4 '}>
            <p className='text-[16px]'>Attendance</p>
            <b className='text-[18px]'>{user.analytics.attendance}</b>
          </MiniCard>
          <MiniCard classFromParent={'w-full flex flex-row justify-between px-4 '}>
            <p className='text-[16px]'>Assignments</p>
            <b className='text-[18px]'>{user.analytics.score.assignment}</b>
          </MiniCard>
          <MiniCard classFromParent={'w-full flex flex-row justify-between px-4 '}>
            <p className='text-[16px]'>Grade</p>
            <b className='text-[18px]'>{(user.analytics.score.grade).toUpperCase()}</b>
          </MiniCard>
        </Card1x2>
      </section>
    </>
  )
}

export default Details
