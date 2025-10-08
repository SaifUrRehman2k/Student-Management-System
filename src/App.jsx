import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import { Route, Routes } from 'react-router'
import LoginPage from './Pages/LoginPage'
import SignUp from './Components/Signup'
import StudentPage from './Pages/Student'
import Analyctics from './Pages/Student/Analyctics'
import Dashboard from './Pages/Student/Dashboard'
import Class from './Pages/Student/Class'
import Events from './Pages/Student/Events'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<StudentPage/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='/analyctics' element={<Analyctics/>}/>
          <Route path='/classes' element={<Class/>}/>
          <Route path='/events' element={<Events/>}/>

        </Route>
        <Route  element={<LoginPage/>}>
          <Route path='/login' element={<Login/>} />
          <Route path='/sign-up' element={<SignUp/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
