import { Button, Columns, Content, Form, Modal } from 'react-bulma-components';
import { useContext, useState } from 'react';

import PropTypes from 'prop-types';
import { SettingsContext } from './SettingsContext';

const DateSetting = ({ setting }) => {
  const [date, setDate] = useState(() => {
    const d = new Date(setting.value || Date.now());
    d.setSeconds(0);
    return d;
  });
  const [show, setShow] = useState(false);
  const { updateSetting } = useContext(SettingsContext);
  const { Field, Control, Input } = Form;

  const onClose = () => {
    setDate(new Date(setting.value || Date.now()));
    setShow(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateSetting({ ...setting, value: date });
    setShow(false);
  };

  const onChangeDate = (event) => {
    event.persist();
    setDate((currDate) => {
      try {
        const d = new Date(event.target.value);
        d.setHours(currDate.getHours());
        d.setMinutes(currDate.getMinutes());
        return d;
      } catch (shht) {
        return currDate;
      }
    });
  };

  const onChangeTime = (event) => {
    event.persist();
    const [hours, minutes] = event.target.value.split(':');
    setDate((currDate) => {
      try {
        const d = new Date(currDate);
        d.setHours(hours);
        d.setMinutes(minutes);
        return d;
      } catch (shht) {
        return currDate;
      }
    });
  };

  const now = () => {
    const d = new Date();
    d.setSeconds(0);
    return d;
  };

  const displayDate = new Date(setting.value || Date.now()).toLocaleString(
    Intl.DateTimeFormat().resolvedOptions().locale,
    {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeStyle: 'short',
      dateStyle: 'short',
    },
  );

  const localDate = () => {
    const tzoffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzoffset).toISOString().slice(0, -1);
  };

  return (
    <>
      <Columns className="is-mobile is-vcentered is-centered" gap={0}>
        <Columns.Column narrow>
          <strong>{`${setting.name}: `}</strong>
          {displayDate}
        </Columns.Column>
        <Columns.Column narrow>
          <Button text onClick={() => setShow(true)}>
            Edit
          </Button>
        </Columns.Column>
      </Columns>
      <Modal show={show} onClose={onClose}>
        <form onSubmit={onSubmit}>
          <Modal.Card className="is-unclipped">
            <Modal.Card.Header onClose={onClose}>
              <Modal.Card.Title>{setting.name}</Modal.Card.Title>
            </Modal.Card.Header>
            <Modal.Card.Body className="is-unclipped">
              <Content>
                <Field kind="group">
                  <Control>
                    <Input
                      name={setting.key}
                      value={localDate().substring(0, 10)}
                      type={setting.type}
                      onChange={onChangeDate}
                      required
                    />
                  </Control>
                  <Control>
                    <Input
                      name={`${setting.key}-time`}
                      value={localDate().substring(11, 16)}
                      type="time"
                      onChange={onChangeTime}
                      required
                    />
                  </Control>
                  <Control>
                    <Button
                      color="primary"
                      type="button"
                      onClick={() => setDate(now())}
                    >
                      Now
                    </Button>
                  </Control>
                </Field>
              </Content>
            </Modal.Card.Body>
            <Modal.Card.Footer>
              <Field kind="group">
                <Control>
                  <Button.Group size="normal">
                    <Button submit color="info">
                      Save
                    </Button>
                    <Button type="reset" color="danger" onClick={onClose}>
                      Cancel
                    </Button>
                  </Button.Group>
                </Control>
              </Field>
            </Modal.Card.Footer>
          </Modal.Card>
        </form>
      </Modal>
    </>
  );
};

export default DateSetting;

DateSetting.propTypes = {
  setting: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.any]),
    type: PropTypes.string.isRequired,
  }).isRequired,
};
