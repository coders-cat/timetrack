import { useCallback } from 'react';

let lastId = 1;

const useUid = prefix => {
  const shameUid = key => {
    // eslint-disable-next-line no-plusplus
    return `${prefix}${key}${lastId++}`;
  };

  return useCallback(shameUid, [prefix]);
};

export default useUid;
