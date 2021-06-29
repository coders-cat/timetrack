import { useEffect, useRef, useState } from 'react';

import TimeFormat from './TimeFormat';
import db from 'db/db';

const TodayTime = () => {
  const [time, setTime] = useState(0);
  const [today] = useState(new Date());
  const [tabVisible, setTabVisible] = useState(true);
  const timerRef = useRef();

  useEffect(() => {
    const fetchWorkUnits = async () => {
      const startTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0
      ).getTime();

      const endTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      ).getTime();

      console.log('startTime', startTime);
      console.log('endTime', endTime);

      const workunits = await db.workunits
        .where('[startTime+endTime]')
        .between([startTime, startTime], [endTime, endTime], true, true)
        .toArray();

      console.log('workunits', workunits);

      const total = workunits.reduce(
        (prev, curr) =>
          curr.endTime ? prev + (curr.endTime - curr.startTime) : prev,
        0
      );

      const runningWorkunits = await db.workunits
        .where('endTime')
        .equals('')
        .toArray();

      console.log('running', runningWorkunits);

      const running = runningWorkunits.reduce(
        (prev, curr) => prev + (Date.now() - curr.startTime),
        0
      );

      setTime(total + running);

      console.log('total', total);
      console.log('running', running);
    };

    clearInterval(timerRef.current);

    if (tabVisible) {
      fetchWorkUnits();
      timerRef.current = setInterval(fetchWorkUnits, 5000);
    }

    return () => clearInterval(timerRef.current);
  }, [tabVisible, today]);

  useEffect(() => {
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
    let hidden, visibilityChange;
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    function handleVisibilityChange() {
      setTabVisible(!document[hidden]);
    }

    if (
      typeof document.addEventListener === 'undefined' ||
      hidden === undefined
    ) {
      console.log(
        'This operation requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.'
      );
    } else {
      document.addEventListener(
        visibilityChange,
        handleVisibilityChange,
        false
      );
    }

    const onFocus = () => {
      setTabVisible(true);
    };

    const onBlur = () => {
      setTabVisible(false);
    };

    document.addEventListener('focus', onFocus);
    document.addEventListener('blur', onBlur);

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
      document.removeEventListener('focus', onFocus);
      document.removeEventListener('blur', onBlur);
    };
  }, []);

  const displayDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'short',
  }).format(today);

  return (
    <>
      Total on {displayDate}: <TimeFormat time={time} />
    </>
  );
};

export default TodayTime;
