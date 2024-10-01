import express from 'express';
import request from 'supertest';

test('Test Response Heser', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.set({
      'X-Powered-By': 'Programmer Zaman Now',
      'X-Author': 'John',
    }).end();
  })

  const response = await request(app).get('/');

  expect(response.get('X-Powered-By')).toBe('Programmer Zaman Now');
  expect(response.get('X-Author')).toBe('John');
});