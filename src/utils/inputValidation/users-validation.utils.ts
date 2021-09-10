import Joi from 'joi';

export const fiqahValidator = (fiqah: string) => {
  if (!fiqah) throw new Error('Fiqah Missing');
  fiqah = fiqah.trim();
  if (!(fiqah.toLowerCase() === 'jafari' || fiqah.toLowerCase() === 'hanafi'))
    return {
      status: false,
      message: 'Fiqah Should Be Hanafi or Jafari',
      city: '',
      fiqah: '',
    };

  return {
    status: true,
    message: 'All Good!',
    city: '',
    fiqah: '',
  };
};

export const cityFiqahSeperator = (text: string) => {
  if (
    !text ||
    text.length <= 0 ||
    text.indexOf('--') === -1 ||
    text.indexOf('--') === text.lastIndexOf('--')
  )
    return {
      status: false,
      message: 'Invalid Request',
      city: '',
      fiqah: '',
    };

  const city = text.slice(
    text.indexOf('--') + 2,
    text.charAt(text.lastIndexOf('--') - 1) === ' '
      ? text.lastIndexOf('--') - 1
      : text.lastIndexOf('--'),
  );

  const fiqah = text.slice(text.lastIndexOf('--') + 2, text.length);

  const fiqahValidation = fiqahValidator(fiqah);

  if (!fiqahValidation.status) return fiqahValidation;
  return {
    status: true,
    message: 'Successfully Return',
    city: city.toLowerCase(),
    fiqah: fiqah.toLowerCase(),
  };
};

export const userSchema = (omitText: boolean) =>
  Joi.object()
    .keys({
      command: Joi.string().required(),
      text: omitText ? Joi.string().allow('') : Joi.string().required(),
      response_url: Joi.string().required(),
      user_id: Joi.string().required(),
      user_name: Joi.string().required(),
      channel_id: Joi.string().required(),
      channel_name: Joi.string().required(),
    })
    .unknown(true);
