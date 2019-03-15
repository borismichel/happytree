const express = require('express');

const app = express();
const port = process.env.PORT || 3320;

app.use(express.static('www'))

app.get('/', express.static('www'));

app.listen(port);

console.log('Serving static on Port ' + port)
