const joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const throwMyError = require('../utils/throwMyError');

class UserValidate {
  static validateRole(role) {
    const validRoles = ['customer', 'seller', 'administrator'];

    if (!validRoles.includes(role)) {
      throwMyError(StatusCodes.BAD_REQUEST, 'Função de usuário inválida');
    }
  }

  static validateFields(user) {
    const newUser = { ...user, role: user.role || 'customer' };
  
    const { error } = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      role: joi.alternatives(['customer', 'seller', 'administrator']),
    }).validate(newUser);

    if (error) throwMyError(StatusCodes.BAD_REQUEST, 'Dados inválidos');
  }
}

module.exports = UserValidate;
