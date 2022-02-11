import { Button, Content, Form, Modal } from 'react-bulma-components';

import PropTypes from 'prop-types';

const WorkUnitForm = ({ workunit, show, onClose, onChange, onSubmit }) => {
  if (!show) {
    return null;
  }
  const { Field, Control, Input } = Form;

  const getLocalDate = (millis) => {
    const date = new Date(millis);
    date.setSeconds(0);
    const tzoffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzoffset).toISOString().slice(0, -1);
  };

  const localDate = (millis) => getLocalDate(millis).substring(0, 10);
  const localTime = (millis) => getLocalDate(millis).substring(11, 16);

  const now = () => {
    const d = new Date();
    d.setSeconds(0);
    return d.getTime();
  };

  const setDate = (name, millis) => {
    onChange(null, { name, value: millis });
  };

  return (
    <Modal show={show} onClose={onClose} closeOnBlur>
      <Modal.Card className="is-unclipped">
        <Modal.Card.Header showClose={false}>
          <Modal.Card.Title>Work Unit</Modal.Card.Title>
        </Modal.Card.Header>
        <form onSubmit={onSubmit}>
          <Modal.Card.Body className="is-unclipped">
            <Content>
              <Field kind="group">
                <Control>
                  <Input
                    name="startTime"
                    value={localDate(workunit.startTime)}
                    type="date"
                    onChange={onChange}
                    required
                  />
                </Control>
                <Control>
                  <Input
                    name="startTime-time"
                    value={localTime(workunit.startTime)}
                    type="time"
                    onChange={onChange}
                    required
                  />
                </Control>
                <Control>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setDate('startTime', now())}
                  >
                    Now
                  </Button>
                </Control>
              </Field>
            </Content>
            <Content>
              <Field kind="group">
                <Control>
                  <Input
                    name="endTime"
                    value={localDate(workunit.endTime)}
                    type="date"
                    onChange={onChange}
                    required
                  />
                </Control>
                <Control>
                  <Input
                    name="endTime-time"
                    value={localTime(workunit.endTime)}
                    type="time"
                    onChange={onChange}
                    required
                  />
                </Control>
                <Control>
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => setDate('endTime', now())}
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
                <Button submit color="info">
                  Save
                </Button>
                <Button type="reset" color="danger" onClick={onClose}>
                  Cancel
                </Button>
              </Control>
            </Field>
          </Modal.Card.Footer>
        </form>
      </Modal.Card>
    </Modal>
  );
};

export default WorkUnitForm;

WorkUnitForm.propTypes = {
  workunit: PropTypes.shape({
    id: PropTypes.number,
    projectId: PropTypes.number,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
