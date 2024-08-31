import request from 'supertest';
import { envs } from '../constants/envs';
import express, { Application } from 'express';

const port = envs.port;
const app: Application = express();

app.use(express.json());

app.get('/health', (_, res) => {
  res.status(200).json({ message: `Server running on port ${port}.` });
});

describe('Server', () => {
  it('should respond with a 200 status and a message', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Server running on port ${port}.`);
  });
});
