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

export const AuthDtoConstants = {
  id: {
    description: 'The unique identifier of the user.',
    example: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
  },
  name: {
    description: 'The name of the user.',
    example: 'John Doe',
  },
  email: {
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  },
  password: {
    description: 'The password for the user account.',
    example: '$3f$00$bfOlGlUdTopkI1aKJgfXEwRXhbss7spSgaktfTskP01IDAObl7Aiu',
  },
};

export const AuthControllerDocStrings = {
  operations: {
    SIGNIN: {
      summary: 'Sign in a user',
      okResponse: 'User signed in successfully',
      errorResponse: 'Internal server error',
    },
    SIGNUP: {
      summary: 'Register a new user',
      okResponse: 'User registered successfully',
      errorResponse: 'Internal server error',
    },
  },
};
