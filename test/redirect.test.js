import express from 'express';
import request from 'supertest';

test('Test Response', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.redirect('/to-next-page');
    //   res.redirect(301, '/to-next-page');
    //   res.redirect('https://nostracode.com');
  })

  const response = await request(app).get('/');

  expect(response.status).toBe(302);
  expect(response.get('Location')).toBe('/to-next-page');
});