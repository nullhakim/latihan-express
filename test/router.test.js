import express from 'express';
import request from 'supertest';

const router = express.Router();
router.use((req, res, next) => {
  console.info(`Receive request : ${req.originalUrl}`);
  next();
});

router.get('/feature/a', (req, res) => {
  res.send('Feature A');
})

const app = express();

const featureEnabled = true;
if (featureEnabled) {
  app.use(router);
}

test('test router', async () => {

  let response = await request(app).get('/feature/a');
  expect(response.text).toBe('Feature A');

});