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
  attachments: [{ type: String }], 
  coverImage: { type: String, default: '' }, 
  comments: [commentSchema]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);