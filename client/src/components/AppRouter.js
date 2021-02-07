import { Switch, Route, Redirect } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/constants'
import { useContext } from 'react'
import { Context } from '../context/App.context'
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
  const { user } = useContext(Context)
  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route exact key={path} path={path} component={Component} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route exact key={path} path={path} component={Component} />
      ))}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  )
})

export default AppRouter
