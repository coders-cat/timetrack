import { useEffect, useRef, useState } from 'react';

import BulmaSwitch from 'components/bulma/BulmaSwitch';
import PropTypes from 'prop-types';
import TimeFormat from './TimeFormat';
import db from 'db/db';

const WorkSwitch = ({ projectId, workUnit, setWorkUnit }) => {
  const [checked, setChecked] = useState(false);
  const [label, setLabel] = useState('Zzzz');
  const timerRef = useRef();

  useEffect(() => {
    if (workUnit.id) {
      setLabel(<TimeFormat time={0} label="Elapsed" />);
      timerRef.current = setInterval(() => {
        setLabel(
          <TimeFormat time={Date.now() - workUnit.startTime} label="Elapsed" />
        );
      }, 1000);
      setChecked(true);
    }

    return () => {
      setLabel('Zzzz');
      setChecked(false);
      clearInterval(timerRef.current);
    };
  }, [workUnit]);

  const toggleStatus = async () => {
    if (workUnit.id) {
      await db.workunits.update(workUnit.id, {
        endTime: Date.now(),
      });
      setWorkUnit({});
    } else {
      await db.transaction('rw', db.workunits, async () => {
        await db.workunits
          .where('endTime')
          .equals('')
          .modify({ endTime: Date.now() });

        const wId = await db.workunits.add({
          projectId,
          startTime: Date.now(),
          endTime: '',
        });
        setWorkUnit(await db.workunits.get(wId));
      });
    }
  };

  return (
    <BulmaSwitch
      label={label}
      id={`switch-${projectId}`}
      name={`switch-${projectId}`}
      checked={checked}
      onChange={toggleStatus}
    />
  );
};

export default WorkSwitch;

WorkSwitch.propTypes = {
  projectId: PropTypes.number.isRequired,
  workUnit: PropTypes.shape({
    id: PropTypes.number,
    startTime: PropTypes.number,
  }).isRequired,
  setWorkUnit: PropTypes.func.isRequired,
};
