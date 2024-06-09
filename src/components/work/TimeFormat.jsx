import PropTypes from 'prop-types';
import ms from 'pretty-ms';
import { useMemo } from 'react';

const TimeFormat = ({ time, label }) => {
  const [prettyMs, prettyHours] = useMemo(() => {
    const pad = (t) => String(t).padStart(2, '0');

    const diff = 1000 - (time % 1000);
    const t = diff < 500 ? time + diff : time;

    const h = Math.floor(t / 3600000);
    const m = Math.floor((t / 60000) % 60);
    const s = Math.floor((t / 1000) % 60);

    return [
      ms(time, { secondsDecimalDigits: 0 }),
      `${pad(h)}:${pad(m)}:${pad(s)}`,
    ];
  }, [time]);

  return (
    <span>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {label} <span>{prettyMs}</span> (<span>{prettyHours}</span>)
    </span>
  );
};

export default TimeFormat;

TimeFormat.propTypes = {
  time: PropTypes.number.isRequired,
  label: PropTypes.string,
};
