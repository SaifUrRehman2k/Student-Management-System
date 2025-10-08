import React from 'react'
import Card1x1, { Card1x2, Card2x1, MiniCard } from '../../../Components/Cards'
import StepCountChart from '../../../Amcharts/StepCountChart'

const Analyctics = () => {
    return (
        <>

            <section className='container mx-auto my-12 px-4 h-[95em] md:h-[45em] grid grid-cols-3 md:grid-rows-4 grid-rows-9 gap-6 '>
                <Card1x1 title={'Task Progress'} titleInfo={'This week'} classFromParent='md:row-start-1 md:row-end-23md:col-start-1 md:col-end-2 row-start-1 row-end-3 col-start-1 col-end-4 '>
                    <StepCountChart />
                </Card1x1>
                <Card1x1 title={'Assignments'} titleInfo={'This week'} classFromParent={' md:row-start-1  md:row-end-3 md:col-start-2 md:col-end-3 row-start-3 row-end-5 col-start-1 col-end-4 col-span-full row-span-full'}>
                    <MiniCard classFromParent={'w-full'}>
                        <input type="checkbox" checked disabled />
                        <div className='flex flex-col flex-nowrap'>
                            <p className='text-[16px] text-gray-700 dark:text-gray-200'>Access</p>
                            <small className='text-[12px] text-gray-500 dark:text-gray-400'>12-oct-2025</small>
                        </div>
                    </MiniCard>
                    <MiniCard classFromParent={'w-full'}>
                        <input type="checkbox" checked disabled />
                        <div className='flex flex-col flex-nowrap'>
                            <p className='text-[16px] text-gray-700 dark:text-gray-200'>Access</p>
                            <small className='text-[12px] text-gray-500 dark:text-gray-400'>12-oct-2025</small>
                        </div>
                    </MiniCard>
                    <MiniCard classFromParent={'w-full'}>
                        <input type="checkbox" checked disabled />
                        <div className='flex flex-col flex-nowrap'>
                            <p className='text-[16px] text-gray-700 dark:text-gray-200'>Access</p>
                            <small className='text-[12px] text-gray-500 dark:text-gray-400'>12-oct-2025</small>
                        </div>
                    </MiniCard>

                </Card1x1>
                <Card1x2 title={'Calender'} titleInfo={'this month'} classFromParent={'md:row-start-1 md:row-end-5 md:col-start-3 md:col-end-6 row-start-5 row-end-7 col-start-1 col-end-4 col-span-full row-span-full'}>

                </Card1x2>

                <Card2x1 title={'Performance'} titleInfo={'this month'} classFromParent={'md:row-start-3 md:row-end-5 md:col-start-1 md:col-end-3 row-start-7 row-end-10 col-start-1 col-end-4 col-span-full row-span-full'}>
                    <MiniCard classFromParent={'w-[50%]'}>
                        <div className='flex flex-col flex-nowrap px-5'>
                            <p className='text-[16px] w-full gap-4 flex flex-nowrap justify-between text-gray-700 dark:text-gray-200'>Atendance <b className='text-[18px]'>75%</b></p>
                        </div>
                    </MiniCard>
                    <MiniCard classFromParent={'w-[50%]'}>
                        <div className='flex flex-col flex-nowrap px-5'>
                            <p className='text-[16px] w-full gap-4 flex flex-nowrap justify-between text-gray-700 dark:text-gray-200'>Atendance <b className='text-[18px]'>75%</b></p>
                        </div>
                    </MiniCard>
                    <MiniCard classFromParent={'w-[50%]'}>
                        <div className='flex flex-col flex-nowrap px-5'>
                            <p className='text-[16px] w-full gap-4 flex flex-nowrap justify-between text-gray-700 dark:text-gray-200'>Atendance <b className='text-[18px]'>75%</b></p>
                        </div>
                    </MiniCard>
                </Card2x1>
            </section>
        </>
    )
}

export default Analyctics
