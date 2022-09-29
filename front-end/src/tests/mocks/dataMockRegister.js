const validInputRegister = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const invalidInputRegister = {
  name: 'Cliente Zé ',
  email: 'invalid.com',
  password: '12345',
};

export default {
  validInputRegister,
  invalidInputRegister,
};
