import express from 'express';
import request from 'supertest';

test('Test Response Heser', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('<html><head><title>Hello HTML</title></head></html>')
  })

  const response = await request(app).get('/');

  expect(response.get('Content-Type')).toContain('text/html');
  expect(response.text).toBe('<html><head><title>Hello HTML</title></head></html>');
});