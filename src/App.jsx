import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Login'
import { Route, Routes } from 'react-router'
import LoginPage from './Pages/LoginPage'
import SignUp from './Components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}>
          <Route index element={<Login/>} />
          <Route path='/sign-up' element={<SignUp/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
