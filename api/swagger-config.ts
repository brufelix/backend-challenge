import path from 'path';
import { Options } from 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: Options = {
  apis: [path.resolve(__dirname, './src/routes/*.{js,ts}')],
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Backend challenge Documentation.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Development server.',
      },
    ],
  },
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
