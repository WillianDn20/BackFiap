const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true // Salva a data e hora automaticamente
});

module.exports = mongoose.model('Notice', noticeSchema);