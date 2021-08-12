const fetch = require('node-fetch');

const times = async () => {
  // return new Promise((resolve, reject) => {
  const sbar = await fetch(
    'https://api.pray.szone/v2/times/this_week.json?city=lahore',
  );
  // .then((res) => res.json())
  // .then((json) => resolve(json));
  // });
  let result = await sbar.json();
  return result;
};
module.exports = times;
