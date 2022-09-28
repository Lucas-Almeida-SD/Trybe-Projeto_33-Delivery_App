// Login -----------------------------------------------------------------
const requestLogin = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
}

const requestLoginWithoutEmail = {
  password: '$#zebirita#$',
}

const requestLoginWithoutPassword = {
  email: 'zebirita@email.com',
}

const requestLoginNonExistentUser = {
  email: 'nonexistentuser@email.com',
  password: 'password123',
}

const requestLoginIncorrectPassword = {
  email: 'zebirita@email.com',
  password: '$#zebirita123#$',
}

const stubLoginFindOne = {
  id: 1,
	name: "Cliente Zé Birita",
	email: "zebirita@email.com",
	password: "1c37466c159755ce1fa181bd247cb925",
	role: "customer",
}

// Users ------------------------------------------------------------------
const requestCreateUser = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
}

const requestCreateUserWithoutName = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
}

const requestCreateUserWithoutEmail = {
  name: 'Cliente Zé Birita',
  password: '$#zebirita#$',
}

const requestCreateUserWithoutPassword = {
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
}

const stubUsersCreate = {
  id: 1,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
	role: "customer",
}

const stubUsersFindOne = {
  id: 1,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
	role: "customer",
}

const stubUsersFindAllByRoleCustomer = [
  {
    id: 1,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    password: "1c37466c159755ce1fa181bd247cb925",
    role: "customer",
  },
  {
    id: 2,
    name: "Cliente Zé Cachaça",
    email: "zecachaca@email.com",
    password: "2b5824e0a6155a2698c6f3991539fc80",
    role: "customer",
  },
]

module.exports = {
  requestLogin,
  requestLoginWithoutEmail,
  requestLoginWithoutPassword,
  requestLoginNonExistentUser,
  requestLoginIncorrectPassword,
  stubLoginFindOne,
  requestCreateUser,
  requestCreateUserWithoutName,
  requestCreateUserWithoutEmail,
  requestCreateUserWithoutPassword,
  stubUsersCreate,
  stubUsersFindOne,
  stubUsersFindAllByRoleCustomer,
};
