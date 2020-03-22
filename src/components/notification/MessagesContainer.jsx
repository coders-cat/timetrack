import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MessagesContainer = ({ show, children }) => {
  return (
    <div
      role="contentinfo"
      aria-label="Status messages"
      className={classNames('notifications', { 'is-hidden': !show })}
    >
      {children}
    </div>
  );
};

export default MessagesContainer;

MessagesContainer.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
