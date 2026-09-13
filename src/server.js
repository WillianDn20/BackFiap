require('dotenv').config(); // Carrega as configurações do arquivo .env
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Tenta conectar ao banco de dados ANTES de ligar o servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
    
    // Só liga o servidor se o banco estiver online
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro fatal ao conectar ao MongoDB:', err);
  });