export const DB_TYPE = 'mysql';
export const DB_MIGRATIONS = ['migrations/*.ts,.js'];

export const TEST_MODULE_ROUTE = 'testEntity';
export const AUTH_ROUTE = 'auth';
export const SIGNIN_ROUTE = 'login';
export const SIGNUP_ROUTE = 'register';
export const DOCS_ROUTE = 'api';

export const SIGNIN_EXPIRATION_TIME = '60m';

export const swgBuilderLabels = {
  title: 'Black-circle',
  description: 'The black-circle app API description',
  version: '1.0',
  tag: 'test',
};

export const testDtoProperties = {
  id: {
    example: 'Example id',
    description: 'The id of the test object',
  },
  name: {
    example: 'Example name',
    description: 'The name of the test object',
  },
  email: {
    example: 'Example email',
    description: 'The email of the test object',
  },
};
