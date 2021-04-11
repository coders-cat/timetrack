import { Form } from 'react-bulma-components';
import PropTypes from 'prop-types';

const Datalist = ({ items, name, value, required, onChange }) => (
  <>
    <Form.Input
      list={name}
      name={name}
      placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
      autoComplete="off"
      value={value}
      required={required}
      onChange={onChange}
    />
    <datalist id={name}>
      {items.map((item) => (
        <option key={item} value={item} label={item} />
      ))}
    </datalist>
  </>
);

export default Datalist;

Datalist.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Datalist.defaultProps = {
  required: false,
};
