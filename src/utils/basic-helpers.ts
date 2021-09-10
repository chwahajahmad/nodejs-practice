import axios from 'axios';
export const sendRes = (responseUrl: string, message: string) => {
  if (!message) return;
  axios.post(responseUrl, {
    text: message,
  });
};
export const getTimezoneOffset = (tz: string, hereDate: any) => {
  hereDate = new Date(hereDate || Date.now());
  hereDate.setMilliseconds(0); // for nice rounding

  const hereOffsetHrs = (hereDate.getTimezoneOffset() / 60) * -1,
    thereLocaleStr = hereDate.toLocaleString('en-US', { timeZone: tz }),
    thereDate = new Date(thereLocaleStr),
    diffHrs = (thereDate.getTime() - hereDate.getTime()) / 1000 / 60 / 60,
    thereOffsetHrs = hereOffsetHrs + diffHrs;

  console.log(
    tz,
    thereDate,
    'UTC' + (thereOffsetHrs < 0 ? '' : '+') + thereOffsetHrs,
  );
  return thereOffsetHrs;
};
