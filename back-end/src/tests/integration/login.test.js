const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../api/app');
const { users } = require('../../database/models/index');
const dataMock = require('../mocks/dataMock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes da rota "POST /login"', () => {
  let response;
  const errorMessage = { message: '' };

  describe('Quando ocorre com sucesso', () => {
    before(async () => {
      sinon
        .stub(users, 'findOne')
        .resolves(dataMock.stubLoginFindOne);

      response = await chai
        .request(app)
        .post('/login')
        .send(dataMock.requestLogin);
    });

    after(() => {
      sinon.restore();
    });

    it('Restorna status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Retorna os dados do usuário no corpo da response', () => {
      expect(response.body).to.have.property('id', dataMock.stubLoginFindOne.id);
      expect(response.body).to.have.property('name', dataMock.stubLoginFindOne.name);
      expect(response.body).to.have.property('email', dataMock.stubLoginFindOne.email);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
    });
  });

  describe('Quando NÃO ocorre com sucesso', () => {

    afterEach(() => {
      sinon.restore();
    });

    describe('Quando não existe o campo "email"', () => {

      before(async () => {  
        response = await chai
          .request(app)
          .post('/login')
          .send(dataMock.requestLoginWithoutEmail);
      });
  
      it('Restorna status 404', () => {
        expect(response).to.have.status(404);
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
          .post('/login')
          .send(dataMock.requestLoginWithoutPassword);
      });
  
      it('Restorna status 404', () => {
        expect(response).to.have.status(404);
      });
  
      it('Retorna mensagem de erro no corpo da response', () => {
        errorMessage.message = 'Dados inválidos';
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Quando o usuário não é encontrado', () => {

      before(async () => {
        sinon.stub(users, 'findOne').resolves(null);

        response = await chai
          .request(app)
          .post('/login')
          .send(dataMock.requestLoginNonExistentUser);
      });
  
      it('Restorna status 404', () => {
        expect(response).to.have.status(404);
      });
  
      it('Retorna mensagem de erro no corpo da response', () => {
        errorMessage.message = 'Usuário não cadastrado';
        expect(response.body).to.be.eqls(errorMessage);
      });
    });

    describe('Quando o password do usuário é incorreto', () => {

      before(async () => {
        sinon.stub(users, 'findOne').resolves(dataMock.requestLogin);

        response = await chai
          .request(app)
          .post('/login')
          .send(dataMock.requestLoginIncorrectPassword);
      });
  
      it('Restorna status 404', () => {
        expect(response).to.have.status(404);
      });
  
      it('Retorna mensagem de erro no corpo da response', () => {
        errorMessage.message = 'Invalid fields';
        expect(response.body).to.be.eqls(errorMessage);
      });
    });
  });
});