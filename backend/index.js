const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Permitir CORS
app.use(cors());

// Endpoint ping
app.get('/ping', (req, res) => {
  res.json({ message: 'Hola mundo' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
