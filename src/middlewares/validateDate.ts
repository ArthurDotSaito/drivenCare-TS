import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);

export const validateDate = (value, helpers) => {
  const day  = value;

  if (!dayjs(day, 'YYYY-MM-DD', true).isValid()) {
    return helpers.message({custom: 'invalid-date'});
  }

  if (dayjs(day, 'YYYY-MM-DD').isBefore(dayjs(), 'day')) {
    return helpers.message({custom:'before-today'});
  }

  if ([6, 0].includes(dayjs(day, 'YYYY-MM-DD').day())) {
    return helpers.message({custom:'weekend'});
  }

  return value;
};

