import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Requests from './pages/Requests'
import Calendar from './pages/Calendar'
import { NotFound } from './pages/NotFound'
import { Toaster } from 'sonner'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Toaster position="top-right" richColors />
    <BrowserRouter>
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-10 bg-gray-100 min-h-screen'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
