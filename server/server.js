require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Connecting to MongoDb
const { MongoClient } = require("mongodb");
uri = process.env.URI;

const client = new MongoClient(uri);

client.connect()

async function findCountry(client, countryName) {
    const result = await
        client.db("countries-data")
        .collection('countries')
        .findOne({'input':countryName});

        if (result) {
            return(result)
        } else {
            console.log('Invalid answer')
        }
}


var countries = []


app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

app.use(express.json())

app.get('/api', (request, response) => {
    response.json(countries);
});

app.post('/input', async (request, response) => {
    const userInput = request.body.countryName.toLowerCase()
    const result = await findCountry(client, userInput);
    console.log(result);
    if (result && countries.includes(result.displayName)===false) {
        countries.push(result.displayName);
    } else {
        response.status(401).send('Invalid answer')
    }
});

app.put('/clear', async (request, response) => {
    countries = []
})

app.listen(port, ()=> {
    console.log(`Express conected to: http://localhost:${port}`)
});