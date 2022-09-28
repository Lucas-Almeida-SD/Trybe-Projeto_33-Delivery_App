const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { users } = require('../../database/models/index');
const dataMock = require('../mocks/dataMock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes da rota "GET /user/:role"', () => {
  let response;
  const errorMessage = { message: '' };

  describe('Quando ocorre sucesso na leitura dos usuários', () => {
    before(async () => {
      sinon
        .stub(users, 'findAll')
        .resolves(dataMock.stubUsersFindAllByRoleCustomer);

      response = await chai
        .request(app)
        .get('/user/customer');
    });

    after(() => {
      sinon.restore();
    });

    it('Restorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna no corpo da response uma lista de users com "role" igual a "consumer"', () => {
      expect(response.body).to.be.eqls(dataMock.stubUsersFindAllByRoleCustomer);
    });
  });

  describe('Quando ocorre falha na leitura dos usuários', () => {
    before(async () => {
      response = await chai
        .request(app)
        .get('/user/custom');
    });

    it('Restorna status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Retorna mensagem de erro no corpo da response', () => {
      errorMessage.message = 'Função de usuário inválida';
      expect(response.body).to.be.eqls(errorMessage);
    });
  });
});