import { useHistory } from 'react-router-dom'
import { Card, Col, Image } from 'react-bootstrap'
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/constants'
import config from '../config'

const DeviceItem = ({ device }) => {
  const history = useHistory()
  return (
    <Col
      md={3}
      className='mt-3'
      onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}
    >
      <Card style={{ width: 150, cursor: 'pointer' }}>
        <Card.Img src={`${config.API_URL}${device.img}`} height={150} />
        <div className='d-flex justify-content-between pl-1 pr-1 mt-1'>
          <div className='text-black-50'>{device.name}</div>
          <div className='d-flex align-items-center'>
            <div>{device.rating}</div>
            <Image src={star} width={15} height={15} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  )
}

export default DeviceItem
