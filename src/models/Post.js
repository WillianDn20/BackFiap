const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  attachment: { type: String, default: '' },
  coverColor: { type: String, default: '#3498db' }, // Cor da capa (padrão azul)
  coverText: { type: String, maxLength: 30, default: '' }, // Texto de até 15 letras
  comments: [commentSchema]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);