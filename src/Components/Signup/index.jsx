import React, { use, useState } from 'react'
import Input, { Radio, DoubleInput } from '../Input'
import Button, { Submit } from '../Button'
import { auth, db } from '../../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import teacherSvg from '../../assets/icons/teacher.svg'
import adminSvg from '../../assets/icons/admin.svg'
import studentSvg from '../../assets/icons/student.svg'
import firebase from 'firebase/compat/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { createToast } from '../../redux/toastSlice.js'


const SignUp = () => {
    const [emailValue, setEmailValue] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [message, setmessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    // const pass = 'admin'
    const updateEmailValue = (e) => {
        setEmailValue(e.target.value)
    }
    const updatePasswordValue = (e) => {
        setPassword(e.target.value)
    }
    const updatedLastName = (e) => {
        setLastName(e.target.value)
    }
    const updatedFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const updateRoleValue = (e) => {
        setSelectedRole(e.target.value)
    }

    const signupUser = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential.user);

        return userCredential.user;
    }

    const studentAnalytics = {
        attendance: 0,
        score: {
            quiz: 0,
            assignment: 0,
            grade: 'f'
        }
    }

    const teacherAnalytics = {
        subject: 'webdevlopment',
        positive_feedback: 0,
        negative_feedback: 0,
        experience: 0
    }

    const saveUserData = async (uid, firstname, lastname, role, password) => {
        // if (role == 'admin') {
        //     return await setDoc(doc(db, role, uid), {
        //         first_name: firstname,
        //         last_name: lastname,
        //         role: role,
        //         password: password,
        //         email: auth.currentUser.email,
        //         uid: uid
        //     })
        // } else if (role == 'student') {
        //     return await setDoc(doc(db, role, uid), {
        //         first_name: firstname,
        //         last_name: lastname,
        //         password: password,
        //         role: role,
        //         email: auth.currentUser.email,
        //         analytics: studentAnalytics,
        //         uid: uid
        //     })
        // } else {
        //     return await setDoc(doc(db, role, uid), {
        //         first_name: firstname,
        //         last_name: lastname,
        //         password: password,
        //         role: role,
        //         email: auth.currentUser.email,
        //         uid: uid

        //     })
        // }

        return await setDoc(doc(db, 'users', uid), {
            first_name: firstname,
            last_name: lastname,
            role: role,
            password: password,
            email: auth.currentUser.email,
            uid: uid
        })

    }

    const handleSubmit = async (e, email, password, firstname, lastname, role) => {
        e.preventDefault();

        try {
            const user = await signupUser(email, password);
            const uid = user.uid;

            try {
                await saveUserData(uid, firstname, lastname, role, password);
                dispatch(createToast('Account Created successfully'));
                console.log('User saved successfully');
                navigate('/');
            } catch (dbError) {
                await user.delete();
                console.error('Firestore error, user deleted:', dbError);
                dispatch(createToast('Error creating account'));
            }

        } catch (error) {
            console.log(error);
        }



    }





    return (
        <>
            <form className='w-[15em] h-full flex flex-col flex-wrap items-start justify-center gap-10 ' onSubmit={(e) => handleSubmit(e, emailValue, password, firstName, lastName, selectedRole)}>

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
                            selectedVal={selectedRole}
                            icon={adminSvg}
                        />

                        <Radio
                            inputTitle='Teacher'
                            radioValue='teacher'
                            radioGroup='radioGroup1'
                            updatedVal={updateRoleValue}
                            selectedVal={selectedRole}
                            icon={teacherSvg}
                        />

                        <Radio
                            inputTitle='Student'
                            radioValue='student'
                            radioGroup='radioGroup1'
                            updatedVal={updateRoleValue}
                            selectedVal={selectedRole}
                            icon={studentSvg}
                        />

                    </div>
                    <DoubleInput inputType='text' placeHolder1='John' placeHolder2='Doe' inputName1='First-name' inputName2='Last-name' updatedFirstName={updatedFirstName} updatedLastName={updatedLastName} />
                    <Input inputType='email' placeHolder='jondoe23@gmailcom' inputName='E-mail' updatedVal={updateEmailValue} />
                    <Input inputType='password' placeHolder='Password' inputName='Password' updatedVal={updatePasswordValue} />
                </div>

                <Submit title='Create Account' />
            </form>
        </>
    )
}

export default SignUp

