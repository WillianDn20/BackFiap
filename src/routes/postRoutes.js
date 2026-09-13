const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Pega o get/post e encaminha para a função desejada
router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/search', postController.searchPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Rota de comentários
router.post('/:id/comentarios', postController.addComment);

module.exports = router;