import { Button, Notification } from 'react-bulma-components';

import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Alert = ({
  color = 'primary',
  uid,
  message,
  dismissible = false,
  timeOut = 0,
  onClose = () => {},
}) => {
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
  color: PropTypes.oneOf([
    'primary',
    'link',
    'info',
    'success',
    'warning',
    'danger',
  ]),
  uid: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  dismissible: PropTypes.bool,
  timeOut: PropTypes.number,
  onClose: PropTypes.func,
};
