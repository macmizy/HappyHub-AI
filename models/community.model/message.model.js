const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
    
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;