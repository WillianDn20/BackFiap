const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/search', postController.searchPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

// Rota de comentários
router.post('/:id/comments', postController.addComment);

// Rota para deletar um comentário
router.delete('/:postId/comments/:commentId', postController.deleteComment);

module.exports = router;