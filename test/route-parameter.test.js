import express from "express";
import request from "supertest";

const app = express();

app.get('/products/:id', (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product: ${idProduct}`);
})

app.get('/categories/:id(\\d+)', (req, res) => {
  const idCategory = req.params.id;
  res.send(`Categories: ${idCategory}`);
})

test('Route Parameter', async () => {

  let response = await request(app).get('/products/john');
  expect(response.text).toBe('Product: john');

  response = await request(app).get('/products/salah');
  expect(response.text).toBe('Product: salah');

  response = await request(app).get('/categories/1234');
  expect(response.text).toBe('Categories: 1234');

  response = await request(app).get('/categories/salah');
  expect(response.status).toBe(404);

});
