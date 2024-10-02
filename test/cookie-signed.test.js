import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser("SECRETKEYRAHASIA"));
app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie('Login', name, { path: '/', signed: true });
  res.send(`Hello ${name}`);
});

app.post("/", (req, res) => {
  const name = req.signedCookies['Login'];
  res.send(`Hello ${name}`);
});

test('Test Cookie Signed', async () => {
  const response = await request(app).post('/login')
    .set("Content-Type", "application/json")
    .send({ name: "John" });
  console.info(response.get('Set-Cookie').toString());
  expect(response.get('Set-Cookie').toString()).toContain("John")
  expect(response.text).toBe('Hello John');
});

test('Test Cookie Signed Read', async () => {
  const response = await request(app).post('/')
    .set("Cookie", "Login=s%3AJohn.z6bpxrTZZRVqm0WW%2Bx0ISn0pK5I5bHLjM%2BOc49P6ugc")

  expect(response.text).toBe('Hello John');
});

