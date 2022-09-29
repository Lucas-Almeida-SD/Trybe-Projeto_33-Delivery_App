const invalidLoginInput = {
  email: 'invalid.com',
  password: '12345',
};

const validLoginInputCustomer = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const validLoginInputSeller = {
  email: 'fulana@deliveryapp.com',
  password: 'fulana@123',
};

const validLoginInputAdmin = {
  email: 'adm@deliveryapp.com',
  password: '--adm2@21!!--',
};

export default {
  invalidLoginInput,
  validLoginInputCustomer,
  validLoginInputSeller,
  validLoginInputAdmin,
};
