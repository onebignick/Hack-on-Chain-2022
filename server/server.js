require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

var hashhexes = []

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

app.use(express.json())

app.get('/api', (request, response) => {
    response.json(hashhexes);
});

app.post('/input', async (request, response) => {
    const data = JSON.stringify(request.body.data)
    hashhexes.push(data);
    console.log(hashhexes)
});

app.listen(port, ()=> {
    console.log(`Express conected to: http://localhost:${port}`)
});