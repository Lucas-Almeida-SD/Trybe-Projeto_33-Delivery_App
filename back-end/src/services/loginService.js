const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { users } = require('../database/models/index');
const { createToken } = require('../utils/jwt');

const passwordService = require('./password.service');
const throwMyError = require('../utils/throwMyError');

const validateBody = (data) => {
    const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
});
  const { email, password } = data;
  const { error, value } = schema.validate({ email, password });
  if (error) throwMyError(StatusCodes.NOT_FOUND, 'Dados inválidos');

  return value;
};

const validateCredentials = async ({ email, password }) => {
  const user = await users.findOne({ where: { email }, raw: true });

  if (!user) throwMyError(StatusCodes.NOT_FOUND, 'Usuário não cadastrado');
  
  passwordService.checkPassword(password, user.password);

  const token = createToken(user);

  return { ...user, token };
};

module.exports = {
  validateCredentials,
  validateBody,
};