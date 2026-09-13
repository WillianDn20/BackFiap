const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  attachment: {
    type: String,
    default: ''
  },
  comments: [{
    text: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
}, { 
  timestamps: true // Cria e atualiza automaticamente os campos createdAt e updatedAt
});

module.exports = mongoose.model('Post', postSchema);