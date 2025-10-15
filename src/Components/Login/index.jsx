import React, { useState } from 'react'
import Input from '../Input'
import Button, { Submit } from '../Button'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { Link, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { getUser } from '../../redux/userSlice'
import Toast from '../Toast'
import { createToast } from '../../redux/toastSlice'

const LoginForm = () => {

    const [emailValue, setEmailValue] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const pass = 'admin'

    const updateEmailValue = (e) => {
        setEmailValue(e.target.value)
    }
    const updatePasswordValue = (e) => {
        setPassword(e.target.value)
    }


    const navigateUser = (userData) => {
        userData
        if (userData) {
            switch (userData.role) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'teacher':
                    navigate('/teacher');
                    break;
                case 'student':
                    navigate('/student');
                    break;
            }
            // navigate('/admin')
        } else {
            navigate('/')
        }
    }
    const validateLogin = async (e, email, password) => {
        e.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user;
            const userDocRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userDocRef)


            if (docSnap.exists()) {
                dispatch(getUser(docSnap.data()))
                console.log('Login successful')
                dispatch(createToast('Login successful'))
                navigateUser(docSnap.data())
            } else {
                dispatch(createToast('>No user profile found'))
            }

        } catch (error) {
            console.log(error);
            dispatch(createToast('Login failed'))
        }
    }


    return (
        <>
            {/* <Toast>
                Hello from toast
            </Toast> */}
            <form className='w-[15em] h-full flex flex-col flex-wrap items-start justify-center gap-8 text-gray-800' onSubmit={(e) => validateLogin(e, emailValue, password)}>
                {message}

                <p className='text-[16px] font-[600]'>Sign in to continue. </p>

                <div className='w-full flex flex-col flex-wrap items-start gap-3 text-black'>
                    {/* <Input type='text' placeHolder='Name' inputID='NAME' inputName='Name' /> */}
                    <Input type='email' placeHolder='jondoe23@gmailcom' inputName='E-mail' updatedVal={updateEmailValue} />
                    <Input type='password' placeHolder='Password' inputName='Password' updatedVal={updatePasswordValue} />
                    <a href="#" className='text-[12px] text-gray-700 hover:underline'>Forget password</a>
                </div>
                <Submit title='Login' btnClass='login' />
                <p className='text-[12px] font-[400] text-gray-900'>Don't have an account? <Link to={'signup'} className='underline text-blue-800'>Sign up</Link></p>

            </form>

        </>
    )
}

export default LoginForm
