import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-gray-400'>
      <h1 className='text-center'>Employee Leave Tracking System</h1>
      </div>
    </>
  )
}

export default App
