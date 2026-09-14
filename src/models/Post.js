const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Texto puro sem códigos de imagem
  author: { type: String, required: true },
  attachments: [{ type: String }], // Até 3 anexos na lateral
  coverImage: { type: String, default: '' }, // Nova imagem de capa (substitui o banner de cor)
  comments: [commentSchema]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);