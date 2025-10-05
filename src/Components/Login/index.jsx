import React, { useState } from 'react'
import Input from '../Input'
import Button, { Submit } from '../Button'
import { Link } from 'react-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const Login = () => {

    const [emailValue, setEmailValue] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    // const pass = 'admin'

    const updateEmailValue = (e) => {
        setEmailValue(e.target.value)
    }
    const updatePasswordValue = (e) => {
        setPassword(e.target.value)
    }

    const validateLogin = (e, email, password) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials)=>{
                const user = userCredentials.user;
                console.log('Login successful')  
                console.log(user)  
                setMessage('Login successful')
            })
            .catch((error)=> {
                console.log(error);
                setMessage('Login failed')
                
            })
    }


    return (
        <>
            <form className='w-[15em] h-full flex flex-col flex-wrap items-start justify-center gap-5 ' onSubmit={(e)=> validateLogin(e,emailValue, password)}>
                {message}

                <p className='text-[16px] font-[600]'>Sign in to continue. </p>

                <div className='w-full flex flex-col flex-wrap items-start gap-3'>
                    {/* <Input type='text' placeHolder='Name' inputID='NAME' inputName='Name' /> */}
                    <Input type='email' placeHolder='jondoe23@gmailcom' inputName='E-mail' updatedVal={updateEmailValue} />
                    <Input type='password' placeHolder='Password' inputName='Password' updatedVal={updatePasswordValue} />
                    <a href="#" className='text-[12px] text-gray-700 hover:underline'>Forget password</a>
                </div>
                <Submit title='Login' btnClass='login' />
                <p className='text-[12px] font-[400] text-gray-900'>Don't have an account? <Link to={'/sign-up'} className='underline text-blue-800'>Sign up</Link></p>

            </form>

        </>
    )
}

export default Login
