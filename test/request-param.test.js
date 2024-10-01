import express from 'express';
import request from 'supertest';

test('Request Param', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`)
  })

  const response = await request(app).
    get('/')
    .query({ firstName: "John", lastName: "Doe" });
  expect(response.text).toBe("Hello John Doe");

});