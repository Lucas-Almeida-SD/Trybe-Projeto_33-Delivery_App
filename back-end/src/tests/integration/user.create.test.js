const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { users } = require('../../database/models/index');
const dataMock = require('../mocks/dataMock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes da rota "POST /user"', () => {
  let response;

  describe('Quando ocorre com sucesso', () => {
    before(async () => {
      sinon
        .stub(users, 'findOne')
        .resolves(null);
      
      sinon
      .stub(users, 'create')
      .resolves(dataMock.stubUsersCreate);

      response = await chai
        .request(app)
        .post('/user')
        .send(dataMock.requestCreateUser);
    });

    after(() => {
      sinon.restore();
    });

    it('Restorna status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna os dados do usuário no corpo da response', () => {
      expect(response.body).to.have.property('id', dataMock.stubUsersCreate.id);
      expect(response.body).to.have.property('name', dataMock.stubUsersCreate.name);
      expect(response.body).to.have.property('email', dataMock.stubUsersCreate.email);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
    });
  });
});