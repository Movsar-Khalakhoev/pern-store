import { Button, Form, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { createType } from '../../http/deviceAPI'

const CreateType = ({ show, onHide }) => {
  const [type, setType] = useState('')

  const addType = () => {
    createType(type).then(() => {
      setType('')
      onHide()
    })
  }

  return (
    <Modal size='lg' centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder='Введите название типов'
            value={type}
            onChange={e => setType(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Закрыть
        </Button>
        <Button variant='outline-success' onClick={addType}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType
