import React from 'react'
import UserStore from '../store/User.store'
import DeviceStore from '../store/Device.store'

export const Context = React.createContext({})

const AppContext = ({ children }) => {
  return (
    <Context.Provider
      value={{ user: new UserStore(), device: new DeviceStore() }}
    >
      {children}
    </Context.Provider>
  )
}

export default AppContext
