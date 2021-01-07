import { useCallback } from 'react';

let lastId = 1;

const useUid = (prefix) => {
  // eslint-disable-next-line no-plusplus
  const shameUid = (key) => `${prefix}${key}${lastId++}`;

  return useCallback(shameUid, [prefix]);
};

export default useUid;
