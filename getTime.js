const fetch = require('node-fetch');

const times = () => {
  fetch('https://api.pray.zone/v2/times/this_week.json?city=lahore')
    .then((res) => res.json())
    .then((json) => console.log(json));
};

module.exports = times;
