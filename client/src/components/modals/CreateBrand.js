import { Button, Form, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { createBrand } from '../../http/deviceAPI'

const CreateType = ({ show, onHide }) => {
  const [brand, setBrand] = useState('')

  const addBrand = () => {
    createBrand(brand).then(() => {
      setBrand('')
      onHide()
    })
  }
  return (
    <Modal size='lg' centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить новый бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder='Введите название типов'
            value={brand}
            onChange={e => setBrand(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Закрыть
        </Button>
        <Button variant='outline-success' onClick={addBrand}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType
