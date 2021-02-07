import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../context/App.context'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <ListGroup>
      {device.types.map(type => (
        <ListGroup.Item
          key={type.id}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          style={{ cursor: 'pointer' }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
})

export default TypeBar
