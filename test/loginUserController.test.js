import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../models/User.js';
import { loginUserController } from '../controllers/users.controller.js';

jest.mock('express-validator', () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: 'Error message' }]),
  })),
}));

jest.mock('gravatar', () => jest.fn());

jest.mock('bcryptjs', () => ({
  compare: jest.fn(() => true),
  hash: jest.fn(
    () => '$2a$10$063ZNn7taLhtPyZHDVsxrubzAv7bNbgCsLdosSu6Wkch1pHeNbcyO',
  ),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn((payload, secret, options, cb) => cb(null, 'token')),
}));

jest.mock('../models/User', () => ({
  User: {
    findOne: jest.fn(() => ({
      email: 'test01@gmail.com',
      password: '$2a$10$063ZNn7taLhtPyZHDVsxrubzAv7bNbgCsLdosSu6Wkch1pHeNbcyO',
    })),
  },
}));

jest.mock('config', () => ({
  get: jest.fn(() => 'jwtSecret'),
}));

describe('loginUserController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: { email: 'test01@gmail.com', password: 'Tushar00' },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      send: jest.fn(() => res),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns a 400 status and errors if there are validation errors', async () => {
    await loginUserController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: 'Error message' }],
    });
  });

  it('returns a 400 status and error message if the user does not exist', async () => {
    User.findOne.mockImplementationOnce(() => null);
    await loginUserController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: 'Error message' }],
    });
  });

  it('returns a 400 status and error message if the passwords do not match', async () => {
    bcrypt.compare.mockImplementationOnce(() => false);
    await loginUserController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: 'Error message' }],
    });
  });
});
