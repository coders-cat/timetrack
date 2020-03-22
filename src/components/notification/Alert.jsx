import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Notification } from 'react-bulma-components';

const Alert = ({ color, uid, message, dismissible, timeOut, onClose }) => {
  useEffect(() => {
    if (!dismissible || timeOut) {
      const timer = setTimeout(() => onClose(uid), timeOut || 5000);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => {};
  }, [dismissible, uid, onClose, timeOut]);

  return (
    <Notification color={color}>
      {dismissible && <Button remove onClick={() => onClose(uid)} />}
      {message}
    </Notification>
  );
};

export default Alert;

Alert.propTypes = {
  color: PropTypes.oneOf(['primary', 'link', 'info', 'success', 'warning', 'danger']),
  uid: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  dismissible: PropTypes.bool,
  timeOut: PropTypes.number,
  onClose: PropTypes.func
};

Alert.defaultProps = {
  color: 'primary',
  dismissible: false,
  timeOut: 0,
  onClose: () => {}
};
