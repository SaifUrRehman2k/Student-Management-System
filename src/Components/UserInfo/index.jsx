import React from 'react'
import { Link, useParams } from 'react-router-dom'

const UserInfo = () => {
    const { uid } = useParams()
    console.log('hello');

    return (
        <div>
            <Link to={'/admin/students'}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className='fill-gray-800'><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
            </Link>
            <h1 className='text-black text-[2em]'>Id: {uid}</h1>
        </div>
    )
}

export default UserInfo
