import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styling/index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className={`text-[15px] bg-yellow-100 hi`}>hello</p>
    </>
  )
}

export default App
