import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'

const Login = () => {
    const users = [{
        email: 'john@gmail.com',
        password: 'admin123'
    }, {
        email: 'claud@gmail.com',
        password: 'wow25'
    }, {
        email: 'saif@gmail.com',
        password: 'secret55'
    }
    ]
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

    const validateLogin = (e) => {
        e.preventDefault();
        const userFound = users.find(user => user.email === emailValue && user.password === password)
        if (userFound) {
            setMessage(
                <div className='w-full p-3 box-border border-[1px] border-double border-cyan-900 bg-cyan-600 rounded-2xl'>
                    <p className='text-cyan-950'>Login Successful</p>
                </div>
            )
        } else {
            setMessage(
                <div className='w-full p-3 box-border border-[1px] border-double border-red-950 bg-red-400 rounded-2xl'>
                    <p className='text-red-950'>Login Failed</p>
                </div>
            )
        }
    }

    return (
        <>
            <div className='w-screen h-screen bg-[url(../../../src/assets/images/stats-bg.jpg)] bg-cover bg-no-repeat bg-left backdrop-blur-sm flex flex-row items-end justify-end'>
                <div className='w-[80%] md:w-[36%]  h-[100vh] flex items-center justify-center bg-[rgba(255,255,255,0.52)] backdrop-blur-lg shadow-lg shadow-gray-500'>
                    <div className='w-[15em] h-full flex flex-col flex-wrap items-start justify-center gap-5 '>
                        {message}
                        
                        <p className='text-[16px] font-[300]'>Sign in to continue. </p>

                        <div className='w-full flex flex-col flex-wrap items-start gap-3'>
                            {/* <Input type='text' placeHolder='Name' inputID='NAME' inputName='Name' /> */}
                            <Input type='email' placeHolder='jondoe23@gmailcom' inputName='E-mail' updatedVal={updateEmailValue} />
                            <Input type='password' placeHolder='Password' inputName='Password' updatedVal={updatePasswordValue} />
                            <a href="#" className='text-[12px] text-gray-700 hover:underline'>Forget password</a>
                        </div>
                        <Button title='Login' btnClass='login' btnFucntiion={validateLogin} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
