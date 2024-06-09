import { Button, Content, Form, Modal } from 'react-bulma-components';

import PropTypes from 'prop-types';
import { createRoot } from 'react-dom/client';

const ConfirmModal = ({
  title,
  show = false,
  onConfirm,
  onClose,
  isFunction = false,
  unmountConfirmModal = () => {},
  message = '',
  children,
}) => {
  const handleClose = () => {
    unmountConfirmModal();
    onClose();
  };

  const handleConfirm = () => {
    unmountConfirmModal();
    onConfirm();
  };

  return (
    <Modal
      show={isFunction || show}
      onClose={handleClose}
      modal={{ closeOnBlur: true }}
    >
      <Modal.Card>
        <Modal.Card.Header onClose={handleClose}>
          <Modal.Card.Title>{title}</Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <Content>{children || message}</Content>
        </Modal.Card.Body>
        <Modal.Card.Footer>
          <Form.Field kind="group">
            <Form.Control>
              <Button.Group size="normal">
                <Button color="primary" onClick={handleConfirm}>
                  Confirm
                </Button>
                <Button color="danger" onClick={handleClose}>
                  Cancel
                </Button>
              </Button.Group>
            </Form.Control>
          </Form.Field>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  );
};

export default ConfirmModal;

export const confirmAlert = (properties) => {
  let target = document.getElementById('tt-confirm-modal');
  if (!target) {
    target = document.createElement('div');
    target.id = 'tt-confirm-modal';
    document.body.appendChild(target);
  }

  const root = createRoot(target);

  const unmountConfirmModal = () => {
    root.unmount();
    target.parentNode.removeChild(target);
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  root.render(
    <ConfirmModal
      {...properties}
      isFunction
      unmountConfirmModal={unmountConfirmModal}
    />,
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isFunction: PropTypes.bool,
  unmountConfirmModal: PropTypes.func,
  message: PropTypes.element,
  children: PropTypes.node,
};
