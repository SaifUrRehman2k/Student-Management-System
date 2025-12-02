import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../firebase';

const UserInfo = () => {
    const [userData, setUserData] = useState(null)

    const { uid } = useParams()

    useEffect(() => {
        async function getUser() {
            try {
                const userRef = doc(db, 'users', uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    console.log('frrom if block:', userSnap.data());
                    setUserData(userSnap.data())
                } else {
                    console.log('user Does not exist');
                }
            } catch (error) {
                console.log('error fetching:', error);
            }
        }

        if (uid) {
            getUser();
        }
    }, [uid])


    console.log('outside the func', userData);


    // getUser(uid)


    return (
        <div className='my-5'>
            <Link to={'/admin/students'} className='flex items-center border-[1px] rounded-[50%] border-gray-800 w-max'>
                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" className='fill-gray-800'><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg>
            </Link>
            {/* <h1 className='text-black text-[2em]'>Id: {uid}</h1> */}
            <div className='flex flex-col flex-wrap items-center gap-4 w-full h-max text-black mt-5'>
                <div className='flex flex-row flex-nowrap items-center justify-between w-full h-2em py-4 border-b-[1px] border-b-gray-400 '>
                    <h3 className='text-gray-800 text-[2em]'>Name</h3>
                    <div className='flex gap-2'>
                        <input type="text" className='p-2 text-black bg-gray-300 rounded-[1em]' disabled placeholder={userData?.first_name} />
                        <input type="text" className='p-2 text-black bg-gray-300 rounded-[1em]' disabled placeholder={userData?.last_name} />
                    </div>

                </div>
                <div className='flex flex-row flex-nowrap items-center justify-between w-full h-2em py-4 border-b-[1px] border-b-gray-400 '>
                    <h3 className='text-gray-800 text-[2em]'>Email</h3>
                    <div className='flex gap-2'>
                        <input type="text" className='p-2 text-black bg-gray-300 rounded-[1em]' disabled placeholder={userData?.email} />
                    </div>
                </div>
                <div className='flex flex-row flex-nowrap items-center justify-between w-full h-2em py-4 border-b-[1px] border-b-gray-400 '>
                    <h3 className='text-gray-800 text-[2em]'>User ID</h3>
                    <div className='flex gap-2'>
                        <input type="text" className='p-2 text-black bg-gray-300 rounded-[1em]' disabled placeholder={userData?.uid} />
                    </div>
                </div>
                <div className='flex flex-row flex-nowrap items-center justify-between w-full h-2em py-4 border-b-[1px] border-b-gray-400 '>
                    <h3 className='text-gray-800 text-[2em]'>Verified</h3>
                    <div className='flex gap-2'>
                        <input type="text" className='p-2 text-black bg-gray-300 rounded-[1em]' disabled placeholder={userData?.verified.toString()} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserInfo
