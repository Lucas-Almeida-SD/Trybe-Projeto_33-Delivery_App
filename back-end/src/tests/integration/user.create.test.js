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
  const errorMessage = { message: '' };

  describe('Quando ocorre sucesso na criação do usuário', () => {
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

  describe('Quando ocorre falha na criação do usuário', () => {

    afterEach(() => {
      sinon.restore();
    });

    describe('Quando não existe o campo "name"', () => {

      before(async () => {
        response = await chai
          .request(app)
          .post('/user')
          .send(dataMock.requestCreateUserWithoutName);
      });
  
      it('Restorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna mensagem de erro no corpo da response', () => {
        errorMessage.message = 'Dados inválidos';
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Quando não existe o campo "email"', () => {

      before(async () => {
        response = await chai
          .request(app)
          .post('/user')
          .send(dataMock.requestCreateUserWithoutEmail);
      });
  
      it('Restorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna mensagem de erro no corpo da response', () => {
        errorMessage.message = 'Dados inválidos';
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Quando não existe o campo "password"', () => {

      before(async () => {
        response = await chai
          .request(app)
          .post('/user')
          .send(dataMock.requestCreateUserWithoutPassword);
      });
  
      it('Restorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna mensagem de erro no corpo da response', () => {
        errorMessage.message = 'Dados inválidos';
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Quando o usuário já é cadastrado', () => {

      before(async () => {
        sinon.stub(users, 'findOne').resolves(dataMock.stubUsersFindOne);

        response = await chai
          .request(app)
          .post('/user')
          .send(dataMock.requestCreateUser);
      });
  
      it('Restorna status 409', () => {
        expect(response).to.have.status(409);
      });
  
      it('Retorna mensagem de erro no corpo da response', () => {
        errorMessage.message = 'O usuário já possui cadastro';
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
  });
});