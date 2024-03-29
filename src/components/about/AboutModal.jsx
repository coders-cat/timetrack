import { Button, Form, Modal } from 'react-bulma-components';

import About from './About';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const AboutModal = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className="is-text" onClick={() => setOpen(true)}>
        About
      </Button>
      <Modal show={open} onClose={onClose} modal={{ closeOnBlur: true }}>
        <Modal.Card className="is-about">
          <Modal.Card.Header onClose={onClose}>
            <Modal.Card.Title>About</Modal.Card.Title>
          </Modal.Card.Header>
          <Modal.Card.Body>
            <About />
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

export default AboutModal;
