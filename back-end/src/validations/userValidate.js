const { StatusCodes } = require('http-status-codes');
const throwMyError = require('../utils/throwMyError');

class UserValidate {
  static validateRole(role) {
    const validRoles = ['customer', 'seller', 'administrator'];

    if (!validRoles.includes(role)) {
      throwMyError(StatusCodes.BAD_REQUEST, 'Função de usuário inválida');
    }
  }
}

module.exports = UserValidate;
