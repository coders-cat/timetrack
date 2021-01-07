import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Columns, Button, Form } from 'react-bulma-components';
import { SettingsContext } from './SettingsContext';

const BoolSetting = ({ setting }) => {
  const { updateSetting } = useContext(SettingsContext);

  const toggle = () => {
    updateSetting({ ...setting, value: !setting.value });
  };

  return (
    <Columns className="is-centered is-vcentered is-mobile" gapless>
      <Columns.Column narrow>
        <Form.Control>
          <Button color={setting.value ? 'success' : 'warning'} size="small" onClick={toggle}>
            <span>{setting.name}</span>
            <span>{setting.value ? '? Yes' : '? No'}</span>
          </Button>
        </Form.Control>
      </Columns.Column>
    </Columns>
  );
};

export default BoolSetting;

BoolSetting.propTypes = {
  setting: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.any]),
    type: PropTypes.string.isRequired,
  }).isRequired,
};
