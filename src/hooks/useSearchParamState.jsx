import { getParamFromQuery, setParamToQuery } from '../utils';
import { useEffect, useState } from 'react';

export default function useSearchParamState(
  key,
  defaultValue,
  options = {
    deleteOnValue: null,
    replaceState: true,
  }
) {
  const [value, setValue] = useState(() => getParamFromQuery(key) || defaultValue);

  const setNewValue = (newValue) => {
    if (value === newValue) return;
    // Purge the param from the query if the new value is the default value on demand.
    if (options.deleteOnValue && newValue === options.deleteOnValue) {
      setParamToQuery(key, null, {
        replaceState: options.replaceState,
      });
      setValue(defaultValue);
      return;
    }

    setValue(newValue);
    setParamToQuery(key, newValue, {
      replaceState: options.replaceState,
    });
  };

  // observe search param change and update state
  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();
      setValue(getParamFromQuery(key, defaultValue));
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [key, defaultValue]);

  return [value, setNewValue];
}
