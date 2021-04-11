import { useContext, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { SettingsContext } from 'components/settings/SettingsContext';
import TimeFormat from './TimeFormat';
import db from 'db/db';

const ProjectTime = ({ project }) => {
  const { getSetting } = useContext(SettingsContext);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const fetchWorkUnits = async () => {
      const startTime = (await getSetting('startDate')).value.getTime();
      const endTime = (await getSetting('endDate')).value.getTime();

      const workunits = await db.workunits
        .where('[projectId+startTime+endTime]')
        .between(
          [project.id, startTime, startTime],
          [project.id, endTime, endTime],
          true,
          true
        )
        .toArray();

      const total = workunits.reduce(
        (prev, curr) =>
          curr.endTime ? prev + (curr.endTime - curr.startTime) : prev,
        0
      );

      setTime(total);
    };

    fetchWorkUnits();
  }, [project, getSetting]);

  return <TimeFormat time={time} />;
};

export default ProjectTime;

ProjectTime.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
