import { Card, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../context/App.context'

const BrandBar = observer(() => {
  const { device } = useContext(Context)

  return (
    <Row>
      {device.brands.map(brand => (
        <Card
          key={brand.id}
          className='p-3 mr-1'
          border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
          onClick={() => device.setSelectedBrand(brand)}
          style={{ cursor: 'pointer' }}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  )
})

export default BrandBar
