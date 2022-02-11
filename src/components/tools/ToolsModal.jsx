import { Button, Content, Form, Modal } from 'react-bulma-components';

import DexieExport from './export/DexieExport';
import DexieImport from './import/DexieImport';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ToolsModal = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className="is-text" onClick={() => setOpen(true)}>
        Tools
      </Button>
      <Modal show={open} onClose={onClose} modal={{ closeOnBlur: true }}>
        <Modal.Card>
          <Modal.Card.Header onClose={onClose}>
            <Modal.Card.Title>Import/Export Tools</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <Content>
              <DexieExport />
              <DexieImport />
            </Content>
          </Modal.Card.Body>
          <Modal.Card.Footer>
            <Form.Field>
              <Form.Control>
                <Button color="info" onClick={onClose}>
                  Close
                </Button>
              </Form.Control>
            </Form.Field>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    </>
  );
};

export default ToolsModal;
