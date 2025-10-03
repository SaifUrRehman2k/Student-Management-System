import React, { use, useState } from 'react'
import Input, { Radio } from '../Input'
import Button, { Submit } from '../Button'
import { auth, db } from '../../firebase'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import teacherSvg from '../../assets/icons/teacher.svg'
import adminSvg from '../../assets/icons/admin.svg'
import studentSvg from '../../assets/icons/student.svg'
import firebase from 'firebase/compat/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router'


const SignUp = () => {
    const [emailValue, setEmailValue] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [message, setmessage] = useState('')

    const navigate = useNavigate()


    // const pass = 'admin'
    const updateEmailValue = (e) => {
        setEmailValue(e.target.value)
    }
    const updatePasswordValue = (e) => {
        setPassword(e.target.value)
    }
    const updateNameValue = (e) => {
        setName(e.target.value)
    }
    const updateRoleValue = (e) => {
        setSelectedRole(e.target.value)
    }

    const signupUser = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential.user);
        
        return userCredential.user;
    }
    const saveUserData = async (uid, name, role, password)=> {
        return await setDoc(doc(db, 'users', uid), {
            name: name,
            role: role,
            password: password,
            email: auth.currentUser.email
        })
    }

    const handleSubmit = async (e, email, password, name, role) => {
        e.preventDefault();

        try {
            const user = await signupUser(email, password);
            await saveUserData(user.uid, name, role, password)
            navigate('/')
            console.log('user saved successfully');
            

        } catch (error) {
            console.log(error);
            
        }

        

    }





    return (
        <>
            <form className='w-[15em] h-full flex flex-col flex-wrap items-start justify-center gap-10 ' onSubmit={(e)=>handleSubmit(e,emailValue, password, name, selectedRole)}>

                <p className='text-[16px] font-[600]'>Create Account.</p>

                <div className='w-full flex flex-col flex-wrap items-start gap-1'>
                    {/* <Input type='text' placeHolder='Name' inputID='NAME' inputName='Name' /> */}
                    <p className='text-[12px] text-gray-600'> Choose role:</p>

                    <div className='flex flex-row flex-nowrap w-full justify-between mb-6' >
                        <Radio 
                        inputTitle='Admin' 
                        radioValue='admin' 
                        radioGroup='radioGroup1' 
                        updatedVal={updateRoleValue} 
                        selectedVal={selectedRole } 
                        icon={adminSvg}
                        />
                        
                        <Radio 
                        inputTitle='Teacher' 
                        radioValue='teacher' 
                        radioGroup='radioGroup1' 
                        updatedVal={updateRoleValue} 
                        selectedVal={selectedRole } 
                        icon={teacherSvg}
                        />
                        
                        <Radio 
                        inputTitle='Student' 
                        radioValue='student' 
                        radioGroup='radioGroup1' 
                        updatedVal={updateRoleValue} 
                        selectedVal={selectedRole } 
                        icon={studentSvg}
                        />

                    </div>

                    <Input inputType='text' placeHolder='Name' inputName='Name' updatedVal={updateNameValue} />
                    <Input inputType='email' placeHolder='jondoe23@gmailcom' inputName='E-mail' updatedVal={updateEmailValue} />
                    <Input inputType='password' placeHolder='Password' inputName='Password' updatedVal={updatePasswordValue} />
                </div>

                <Submit title='Create Account' />
            </form>
        </>
    )
}

export default SignUp

