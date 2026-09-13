const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

// Bloco que agrupa os testes de Posts
describe('Testes da API de Posts', () => {
  
  // Roda antes dos testes começarem
  beforeAll(async () => {
    // Utiliza um banco isolado
    await mongoose.connect('mongodb://localhost:27017/blog_db_test');
  });

  // Roda depois dos testes terminarem
  afterAll(async () => {
    // Limpa o banco de teste e fecha a conexão
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  //Criar um Post
  it('Deve criar uma nova postagem com sucesso', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Post de Teste Automatizado',
        content: 'Este post foi gerado pelo Jest',
        author: 'Sistema'
      });

    //Resultados esperados
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Post de Teste Automatizado');
  });

  //Listar Posts
  it('Deve retornar uma lista de postagens', async () => {
    const res = await request(app).get('/posts');

    expect(res.statusCode).toEqual(200);
    // Verifica se o retorno é um array
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});