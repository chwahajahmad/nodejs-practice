const axios = require('axios');
const apiEndPoint = 'https://api.pray.zone/v2/times/this_week.json?city=';
const getData = (city = 'lahore') => {
  axios.get(`${apiEndPoint}${city}`).then((res) => console.log(res));
};
getData();

module.exports = getData;
