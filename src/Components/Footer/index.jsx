import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-slate-900 text-white  box-border w-[100%] h-40em md:h-[18em] mt-20 py-8 px-12'>
      
      <div className='flex flex-col flex-wrap justify-between w-[100%] md:w-[40%] h-[50%] md:h-[100%]'>
        <div className='w-[100%] h-[60%]'>
            <h1 className='text-[1.8em] font-[600]'>Weather</h1>
            <p className='text-[0.9em]/5 text-gray-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ipsa doloremque nulla! Illo repellat tempora, blanditiis soluta quas minima alias libero ut distinctio quidem temporibus. Eveniet quaerat aliquid esse debitis.</p>
        </div>
        <small>
            &copy;2025 Weather inc, All rights reserved.
        </small>
      </div>

      <div className='flex flex-col flex-wrap justify-between w-[100%] md:w-[60%] h-[50%] md:h-[100%]'>
        <ul className='list-none flex flex-row items-center justify-end gap-3'>
            <li>
                <Link>Home</Link>
            </li>
            <li>
                <Link>About</Link>
            </li>
            <li>
                <Link>Contact</Link>
            </li>
            <li>
                <Link>Blog</Link>
            </li>
            <li>
                <Link>Features</Link>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer