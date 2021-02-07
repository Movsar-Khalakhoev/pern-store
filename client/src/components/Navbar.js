import { useContext } from 'react'
import { Context } from '../context/App.context'
import { Button, ButtonGroup, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  ADMIN_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/constants'
import { observer } from 'mobx-react-lite'

const Navigation = observer(() => {
  const { user } = useContext(Context)

  const logout = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Link to={SHOP_ROUTE}>
        <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
      </Link>
      <ButtonGroup className='ml-auto'>
        <Link to={SHOP_ROUTE} className='nav-link text-light'>
          Товары
        </Link>
        {user.isAuth ? (
          <>
            <Link to={ADMIN_ROUTE} className='nav-link text-light'>
              Админ. панель
            </Link>
            <Link
              to={LOGIN_ROUTE}
              className='nav-link text-light'
              onClick={logout}
            >
              Выйти
            </Link>
          </>
        ) : (
          <>
            <Link to={LOGIN_ROUTE} className='nav-link text-light'>
              Войти
            </Link>
          </>
        )}
      </ButtonGroup>
    </Navbar>
  )
})

export default Navigation
