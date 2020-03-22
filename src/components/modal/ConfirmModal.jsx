import React from 'react';
import PropTypes from 'prop-types';
import { render, unmountComponentAtNode } from 'react-dom';
import { Modal, Content, Button, Form } from 'react-bulma-components';

const ConfirmModal = ({ title, show, onConfirm, onClose, isFunction, message, children }) => {
  const unmountConfirmModal = () => {
    if (isFunction) {
      const target = document.getElementById('tt-confirm-modal');
      unmountComponentAtNode(target);
      target.parentNode.removeChild(target);
    }
  };

  const handleClose = () => {
    unmountConfirmModal();
    onClose();
  };

  const handleConfirm = () => {
    unmountConfirmModal();
    onConfirm();
  };

  return (
    <Modal show={isFunction || show} onClose={handleClose} modal={{ closeOnBlur: true }}>
      <Modal.Card>
        <Modal.Card.Head onClose={handleClose}>
          <Modal.Card.Title>{title}</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Content>{children || message}</Content>
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Form.Field kind="group">
            <Form.Control>
              <Button color="primary" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button color="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Form.Control>
          </Form.Field>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
};

export default ConfirmModal;

export const confirmAlert = properties => {
  let target = document.getElementById('tt-confirm-modal');
  if (!target) {
    target = document.createElement('div');
    target.id = 'tt-confirm-modal';
    document.body.appendChild(target);
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  render(<ConfirmModal {...properties} isFunction />, target);
};

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isFunction: PropTypes.bool,
  message: PropTypes.element,
  children: PropTypes.node
};

ConfirmModal.defaultProps = {
  show: false,
  isFunction: false,
  message: '',
  children: undefined
};
