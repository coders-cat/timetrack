import PropTypes from 'prop-types';

const BulmaSwitch = ({ label, id, name, checked, onChange }) => (
  <div className="field">
    <input
      type="checkbox"
      className="switch is-rounded is-success"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

export default BulmaSwitch;

BulmaSwitch.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
