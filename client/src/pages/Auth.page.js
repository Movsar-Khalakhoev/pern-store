import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/constants'
import { Context } from '../context/App.context'
import { useContext, useState } from 'react'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'

const AuthPage = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const history = useHistory()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const sign = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }

      user.setUser(data)
      user.setIsAuth(true)
      history.push(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 56 }}
    >
      <Card className='col-md-6'>
        <h4 className='text-center mt-2'>
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h4>
        <Form>
          <Form.Control
            className='mt-4'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-2'
            placeholder='Пароль'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Row className='d-flex justify-content-between align-items-center pl-3 pr-3'>
            <Link to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </Link>
            <Button
              className='mt-4 mb-2 float-right'
              variant='outline-success'
              onClick={sign}
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

export default AuthPage
