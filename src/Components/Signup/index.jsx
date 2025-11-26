import React, { use, useEffect, useState } from 'react'
import Input, { Radio, DoubleInput } from '../Input'
import Button, { Submit } from '../Button'
import { auth, db } from '../../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore'
import teacherSvg from '../../assets/icons/teacher.svg'
import adminSvg from '../../assets/icons/admin.svg'
import studentSvg from '../../assets/icons/student.svg'
import firebase from 'firebase/compat/app'
import { createUserWithEmailAndPassword, validatePassword } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { createToast } from '../../redux/toastSlice.js'
import { startLoading, stopLoading } from '../../redux/loaderSlice.js'
import { FirebaseError } from 'firebase/app'


const SignUp = () => {
    const [emailValue, setEmailValue] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [isSubmitDisable, setIsSubmitDIsable] = useState(true)

    const [passwordValidation, setPasswordValidation] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [validationClass, setValidationClass] = useState('')

    const errorMessages = {
        containsLowercaseLetter: "Password must include at least one lowercase letter.",
        containsUppercaseLetter: "Password must include at least one uppercase letter.",
        containsNumericCharacter: "Password must include at least one number.",
        meetsMinPasswordLength: "Password must contain atleast 6 characters."
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            runValidation(password)
        }, 300);

        return () => clearTimeout(timeout);
    })


    const runValidation = async (pwd) => {
        if (!pwd) {
            setPasswordValidation([]);
            return;
        }

        const status = await validatePassword(auth, pwd)

        if (status.isValid) {
            setPasswordValidation(['password is valid'])
            setValidationClass('text-green-700 py-1')
            setIsSubmitDIsable(false)
            console.log("Validation status:", status);
            return;
        }

        const failed = Object.keys(errorMessages).filter(
            key => status[key] === false
        )

        // console.log("Validation status:", status);
        const invalidPassword = failed.map(key => errorMessages[key])
        setPasswordValidation(invalidPassword)
        setValidationClass('text-red-800 py-1')
        setIsSubmitDIsable(true)
        console.log(invalidPassword);

    }
    const handlePasswordChange = async (e) => {
        setPassword(e.target.value)
    };


    // const pass = 'admin'
    const updateEmailValue = (e) => {
        setEmailValue(e.target.value)
    }
    // const updatePasswordValue = (e) => {
    //     setPassword(e.target.value)
    // }
    const updatedLastName = (e) => {
        setLastName(e.target.value)
    }
    const updatedFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const updateRoleValue = (e) => {
        setSelectedRole(e.target.value)
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
        class: 'webdevlopment',
        positive_feedback: 0,
        negative_feedback: 0,
        experience: 0
    }


    const signupUser = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCredential.user);

        return userCredential.user;
    }
    const saveUserData = async (uid, firstname, lastname, role, password) => {
        if (role == 'admin') {
            return await setDoc(doc(db, 'users', uid), {
                first_name: firstname,
                last_name: lastname,
                role: role,
                password: password,
                email: auth.currentUser.email,
                uid: uid
            })
        } else if (role == 'student') {
            return await setDoc(doc(db, 'users', uid), {
                first_name: firstname,
                last_name: lastname,
                role: role,
                password: password,
                email: auth.currentUser.email,
                uid: uid,
                analytics: studentAnalytics
            })
        } else {
            return await setDoc(doc(db, 'users', uid), {
                first_name: firstname,
                last_name: lastname,
                role: role,
                password: password,
                email: auth.currentUser.email,
                uid: uid,
                analytics: teacherAnalytics
            })
        }



    }

    const handleSubmit = async (e, email, password, firstname, lastname, role) => {
        e.preventDefault();
        const status = await validatePassword(auth, password)
        if(!status.isValid) {
            dispatch(createToast("Password doesn't match our policy"))
        }

        try {
            dispatch(startLoading())
            const user = await signupUser(email, password);
            const uid = user.uid;

            try {
                await saveUserData(uid, firstname, lastname, role, password);
                dispatch(createToast('Account Created successfully'));
                console.log('User saved successfully');
                navigate('/');
                dispatch(stopLoading())
            } catch (dbError) {
                await user.delete();
                console.error('Firestore error, user deleted:', dbError);
                dispatch(stopLoading())
                // dispatch(createToast(dbError));
            }

        } catch (error) {
            dispatch(stopLoading())

            if (error instanceof FirebaseError) {
                const errorMsg = error.message.replace(/^Firebase:\s*/, '').replace(/\s*\(.*\)$/, '');
                console.log(errorMsg);
                dispatch(createToast(errorMsg));
            } else {
                console.log(`Unexpected error: ${error}`);
            }
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
                    <Input inputType='password' placeHolder='Password' inputName='Password' updatedVal={handlePasswordChange} />
                </div>
                <ol className="text-black list-inside max-w-md space-y-1 ">
                    {passwordValidation?.map((msg, index) => (
                        <>
                            <li className={`flex items-center p-0 text-[0.8em] ${validationClass}`} key={index}>
                                <svg className="w-4 h-4 text-fg-success me-1.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                                {msg}
                            </li>
                        </>
                    ))}
                </ol>
                <Submit title='Create Account' isDisabled={isSubmitDisable} />
            </form>
        </>
    )
}

export default SignUp

