import { useCallback, useState } from 'react';

import { isBoolean } from '../utils/predicate';

export function useBoolean(defaultValue = false) {
  if (!isBoolean(defaultValue)) {
    throw new Error('defaultValue must be a boolean');
  }

  const [value, setValue] = useState(defaultValue);

  const setTrue = useCallback(() => setValue(true), [setValue]);
  const setFalse = useCallback(() => setValue(false), [setValue]);
  const toggle = useCallback(() => setValue((v) => !v), [setValue]);

  return {
    value,
    setValue,
    setTrue,
    setFalse,
    toggle,
  };
}
