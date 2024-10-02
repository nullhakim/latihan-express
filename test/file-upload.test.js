import express from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload";

const app = express();
app.use(expressFileUpload());

app.post("/", async (req, res) => {
  const textFile = req.files.article;
  await textFile.mv(__dirname + "/upload/" + textFile.name);

  res.send(`Hello ${req.body.name}, you upload ${textFile.name}`);
});

test("Test Upload File ", async () => {
  const response = await request(app)
    .post("/")
    .field("name", "John")
    .attach("article", __dirname + "/contoh.txt");
  expect(response.text).toBe("Hello John, you upload contoh.txt");
});
