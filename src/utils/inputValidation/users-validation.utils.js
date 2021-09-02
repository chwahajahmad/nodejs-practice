const WorldCities = require('worldcities');
const cityValidator = (city) => {
  city = city.trim();
  if (WorldCities.getByName(city) === undefined)
    return {
      status: false,
      message: 'City Not Found',
    };
  return {
    status: true,
    message: 'All Good!',
  };
};

const fiqahValidator = (fiqah) => {
  fiqah = fiqah.trim();
  if (!(fiqah.toLowerCase() === 'jafari' || fiqah.toLowerCase() === 'hanafi'))
    return {
      status: false,
      message: 'Fiqah Should Be Hanafi or Jafari',
    };

  return {
    status: true,
    message: 'All Good!',
  };
};
const VerifyRequest = (text) => {
  if (
    text.length <= 0 ||
    text.indexOf('--') === -1 ||
    text.indexOf('--') === text.lastIndexOf('--')
  )
    return {
      status: false,
      message: 'Make Sure You have added City and Fiqah',
    };

  const city = text.slice(
    text.indexOf('--') + 2,
    text.charAt(text.lastIndexOf('--') - 1) === ' '
      ? text.lastIndexOf('--') - 1
      : text.lastIndexOf('--'),
  );

  const fiqah = text.slice(text.lastIndexOf('--') + 2, text.length);

  const fiqahValidation = fiqahValidator(fiqah);
  const cityValidation = cityValidator(city);

  if (!fiqahValidation.status) return fiqahValidation;
  if (!cityValidation.status) return cityValidation;

  return { status: true, city: city.toLowerCase(), fiqah: fiqah.toLowerCase() };
};

module.exports = { VerifyRequest, cityValidator, fiqahValidator };
