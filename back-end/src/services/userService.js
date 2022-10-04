const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { users: usersModel } = require('../database/models/index');
const { encryptPassword } = require('../utils/md5');
const { createToken } = require('../utils/jwt');
const throwMyError = require('../utils/throwMyError');
const UserValidate = require('../validations/userValidate');

class UserService {
  constructor(model = usersModel) {
    this.model = model;
  }

  async create(user) {
    UserValidate.validateFields(user);
  
    const { password } = user;
    const passwordHash = encryptPassword(password);
  
    if (await this.model.findOne({ where: { email: user.email } })) {
      throwMyError(StatusCodes.CONFLICT, 'O usuário já possui cadastro');
    }

    const newUser = await this.model.create(
      { ...user, password: passwordHash },
    );
    
    const token = createToken(newUser);

    return { token, ...newUser.dataValues };
  }
  
  async getAllByRole(role) {
    UserValidate.validateRole(role);

    const result = await this.model.findAll({
      where: { role },
    });

    return result;
  }

  async registerAdmin(user) {
    console.log(user);
    const { password } = user;
    const passwordHash = encryptPassword(password);
    if (await this.model.findOne({ where: { email: user.email } })) {
      throwMyError(StatusCodes.CONFLICT, 'O usuário já possui cadastro');
    }
    const result = await this.model.create({ ...user, password: passwordHash });
    return result;
  }

  async getAllUser() {
    const result = await this.model.findAll({
      where: {
        [Op.or]: [
          { role: 'seller' },
          { role: 'customer' },
        ],
      },
    });
    return result;
  }

  async deleteUser(email) {
    await this.model.destroy({ where: { email } });
  }
}

module.exports = new UserService();