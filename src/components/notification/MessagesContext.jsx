import React, { useCallback, useState } from 'react';

import Alert from './Alert';
import MessagesContainer from './MessagesContainer';
import PropTypes from 'prop-types';
import useUid from 'hooks/useUid';

const MessagesContext = React.createContext();

const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const uid = useUid('mp');

  const onClose = (muid) => {
    setMessages((cur) => cur.filter((m) => m.uid !== muid));
  };

  const addMessage = useCallback(
    (m) => {
      setMessages((cur) => [...cur, { ...m, uid: uid(m.message), onClose }]);
    },
    [uid]
  );

  const addException = useCallback(
    (ex) => {
      // eslint-disable-next-line no-console
      console.error('Error', ex);
      setMessages((cur) => [
        ...cur,
        {
          color: 'danger',
          uid: uid(ex.message),
          message: ex.message,
          dismissible: true,
          onClose,
        },
      ]);
    },
    [uid]
  );

  const clearErrors = useCallback(() => {
    setMessages((cur) => cur.filter((m) => m.color !== 'danger'));
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        addMessage,
        addException,
        clearErrors,
      }}
    >
      <MessagesContainer show={messages.length > 0}>
        {messages.map((m) => (
          <Alert
            key={m.uid}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...m}
          />
        ))}
      </MessagesContainer>
      {children}
    </MessagesContext.Provider>
  );
};

const MessagesConsumer = MessagesContext.Consumer;

export { MessagesContext, MessagesProvider, MessagesConsumer };

MessagesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
