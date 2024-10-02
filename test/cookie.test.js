import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  const name = req.cookies['name'];
  res.send(`Hello ${name}`);
})

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: '/' });
  res.send(`Hello ${name}`);
})

test('Test Cookie Read', async () => {
  const response = await request(app).get('/')
    .set("Cookie", "name=John;author=jonathan");
  expect(response.text).toBe('Hello John');
});

test('Test Cookie Create', async () => {
  const response = await request(app).post('/login')
    .set("Content-Type", "application/json")
    .send({ name: "John" });
  expect(response.get('Set-Cookie').toString()).toContain('John')
  expect(response.text).toBe('Hello John');
});