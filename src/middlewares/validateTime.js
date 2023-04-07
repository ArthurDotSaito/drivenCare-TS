import dayjs from 'dayjs';

export const validateTime = (value, helpers) => {
    const time = dayjs(value, 'HH:mm');
      if (!time.isValid()) {
        return helpers.message({custom:'invalid-time'});
      }
    const start = dayjs('08:00', 'HH:mm');
    const end = dayjs('18:00', 'HH:mm');

    if(time.isBefore(start) || time.isAfter(end)) return helpers.message({custom: 'invalid-schedule-time'});
    return time.toDate();
};
