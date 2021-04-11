import BoolSetting from './BoolSetting';
import { Columns } from 'react-bulma-components';
import DateSetting from './DateSetting';
import { SettingsContext } from './SettingsContext';
import { useContext } from 'react';

const Settings = () => {
  const { settings } = useContext(SettingsContext);

  return (
    <Columns className="is-vcentered is-mobile is-centered">
      {settings.map((s) => (
        <Columns.Column narrow key={s.id}>
          {
            {
              date: <DateSetting setting={s} />,
              bool: <BoolSetting setting={s} />,
            }[s.type]
          }
        </Columns.Column>
      ))}
    </Columns>
  );
};

export default Settings;
