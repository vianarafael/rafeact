const express = require('express');
const app = express();

const PORT = 3333;

app.use(express.static('./'));

app.get('/', (req, res) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
