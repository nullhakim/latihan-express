import express from 'express';
import request from 'supertest';
import mustacheExpress from 'mustache-express';

test('Test Response', async () => {
  const app = express();
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', mustacheExpress());

});