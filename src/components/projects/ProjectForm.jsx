import { Button, Content, Form, Modal } from 'react-bulma-components';

import Datalist from 'components/forms/Datalist';
import PropTypes from 'prop-types';

const ProjectForm = ({
  project,
  clients,
  show,
  onClose,
  onChange,
  onSubmit,
}) => {
  const { Field, Control, Input } = Form;

  return (
    <Modal show={show} onClose={onClose} closeOnBlur>
      <Modal.Card className="is-unclipped">
        <Modal.Card.Header showClose={false}>
          <Modal.Card.Title>Project</Modal.Card.Title>
        </Modal.Card.Header>
        <form onSubmit={onSubmit} autoComplete="off">
          <Modal.Card.Body className="is-unclipped">
            <Content>
              <Field kind="group">
                <Control>
                  <Datalist
                    items={clients}
                    name="client"
                    value={project.client}
                    required
                    onChange={onChange}
                  />
                </Control>
                <Control>
                  <Input
                    name="name"
                    placeholder="Project"
                    value={project.name}
                    onChange={onChange}
                    required
                  />
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
        </form>
      </Modal.Card>
    </Modal>
  );
};

export default ProjectForm;

ProjectForm.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    client: PropTypes.string,
  }).isRequired,
  clients: PropTypes.arrayOf(PropTypes.string).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
