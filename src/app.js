const express = require('express');
const cors = require('cors'); 
const app = express();

const postRoutes = require('./routes/postRoutes'); 
const userRoutes = require('./routes/userRoutes'); // Importo as novas rotas de usuário

app.use(cors());
app.use(express.json());

// Teste do servidor
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong! Servidor online.' });
});

// Aviso ao Express para usar os meus roteadores
app.use('/posts', postRoutes);

// Uso o userRoutes na raiz, assim ele cria o /login e o /registrar
app.use('/', userRoutes); 

module.exports = app;