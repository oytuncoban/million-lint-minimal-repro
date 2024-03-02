import moment from 'moment';

export function formatDate(date) {
  if (!date) {
    return '--';
  }
  return moment(date).format('DD.MM.YYYY');
}

export function formatPercentage(percentage) {
  return (percentage % 100) * 100 > 0 ? percentage.toFixed(0) : parseInt(percentage);
}

export function setParamToQuery(
  key,
  value,
  options = {
    replaceState: false,
    onlyReturnPath: false,
  }
) {
  const params = new URLSearchParams(window.location.search);
  let path = window.location.pathname;

  if (!value) {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  if (params.size > 0) {
    path += params.toString() && `?${params.toString()}`;
  }

  if (options.onlyReturnPath) {
    return {
      path,
      action: 'return-only',
    };
  }

  if (options.replaceState) {
    window.history.replaceState(null, '', path);
    return {
      path,
      action: 'replaced',
    };
  }

  window.history.pushState({ path }, '', path);
  return {
    path,
    action: 'pushed',
  };
}

export function getParamFromQuery(key) {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(key);
  return value;
}
