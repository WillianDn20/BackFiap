const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts.' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post.' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, author, attachment } = req.body;
    
    const newPost = new Post({ 
      title, 
      content, 
      author, 
      attachment: attachment || '' 
    });
    
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: 'Error creating post.' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ error: 'Post not found.' });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post.' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found.' });
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post.' });
  }
};

// --- AQUI ESTÁ A ATUALIZAÇÃO ---
exports.searchPosts = async (req, res) => {
  try {
    const term = req.query.term || '';
    const posts = await Post.find({
      $or: [
        { title: { $regex: term, $options: 'i' } },
        { content: { $regex: term, $options: 'i' } },
        { author: { $regex: term, $options: 'i' } } // Agora também procura pelo nome do autor!
      ]
    }).sort({ createdAt: -1 }); // Já aproveitei para ordenar do mais recente para o mais antigo
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error searching posts.' });
  }
};
// -------------------------------

exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found.' });

    post.comments.push({
      text: req.body.text,
      author: req.body.author
    });

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: 'Error adding comment.' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userName, userRole } = req.query;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: 'Post not found.' });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found.' });

    if (userRole === 'teacher' || comment.author === userName) {
      post.comments.pull(commentId);
      await post.save();
      return res.status(200).json(post);
    } else {
      return res.status(403).json({ error: 'Access denied. You can only delete your own comments.' });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: 'Error deleting comment.' });
  }
};