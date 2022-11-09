import { Columns } from 'react-bulma-components';
import Settings from 'components/settings/Settings';
import TodayTime from 'components/work/TodayTime';

const InfoSettingsBar = () => (
  <Columns className="is-vcentered is-mobile is-centered">
    <Settings />
    <Columns.Column narrow>
      <TodayTime />
    </Columns.Column>
  </Columns>
);

export default InfoSettingsBar;
