import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/App.context'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'

const CreateType = observer(({ show, onHide }) => {
  const { device } = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const deleteInfo = number => {
    setInfo(info.filter(i => i.number !== number))
  }

  const selectFile = e => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file, 'image.jpg')
    formData.append('brandId', device.selectedBrand.id)
    formData.append('deviceTypeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(onHide)
  }

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  }, [])

  return (
    <Modal size='lg' centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>
              {device.selectedType.name || 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => device.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>
              {device.selectedBrand.name || 'Выберите бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className='mt-3'
            placeholder='Название устройства'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Control
            type='number'
            className='mt-3'
            placeholder='Цена устройства'
            value={price}
            onChange={e => setPrice(+e.target.value)}
          />
          <Form.Control
            type='file'
            className='mt-3'
            placeholder='Картинка устройства'
            onChange={selectFile}
          />
          <hr />
          <Button variant='outline-dark' onClick={addInfo} className='mb-3'>
            Добавить новое свойство
          </Button>
          {info.map(i => (
            <Row className='mt-2' key={i.number}>
              <Col md={4}>
                <Form.Control
                  placeholder='Название'
                  value={i.title}
                  onChange={e => changeInfo('title', e.target.value, i.number)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder='Описание'
                  value={i.description}
                  onChange={e =>
                    changeInfo('description', e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  variant='outline-danger'
                  onClick={() => deleteInfo(i.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Закрыть
        </Button>
        <Button variant='outline-success' onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateType
