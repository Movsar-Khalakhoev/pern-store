import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import { Context } from './context/App.context'

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then(() => {
        user.setUser(true)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation='border' />
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
