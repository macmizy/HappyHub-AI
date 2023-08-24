const Message = require('../models/community.model/message.model');
const Comment = require('../models/community.model/comment.model');

const postMessage = async (req, res) => {
    try {
        const message = await Message.create({
            text: req.body.text,
            user: req.user._id,
            likes: [],
            comments: []
        });
        res.status(200).json({
            message: "Message created successfully",
            status: "true",
            message: message,
        });
    } catch (error) {
        return res.status(400).json({
            status: "false",
            message: "Message creation failed",
        });
    }
};

const postComment = async (req, res) => { 
    try {  
        const comment = await Comment.create({
            text: req.body.text,
            user: req.user._id,
            message: req.params.messageId,
        });
        const message = await Message.findByIdAndUpdate(req.params.messageId, {
            $push: { comments: comment._id },
        });
        res.status(200).json({
            message: "Comment created successfully",
            status: "true",
            comment: comment,
            message: message,
        });
    } catch (error) {
        return res.status(400).json({
            status: "false",
            message: "Comment creation failed",
        });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).populate("user").populate("comments");
        res.status(200).json({
            message: "Messages fetched successfully",
            status: "true",
            messages: messages,
        });
    } catch (error) {
        return res.status(400).json({
            status: "false",
            message: "Messages fetch failed",
        });
    }
};

const getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.messageId).populate("user").populate("comments");
        res.status(200).json({
            message: "Message fetched successfully",
            status: "true",
            message: message,
        });
    } catch (error) {
        return res.status(400).json({
            status: "false",
            message: "Message fetch failed",
        });
    }
};

const likeMessage = async (req, res) => {
    try {
      const message = await Message.findById(req.params.messageId);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      const userHasLiked = message.likes.includes(req.user._id);
  
      if (userHasLiked) {
        message.likes.pull(req.user._id);
      } else {
        message.likes.push(req.user._id);
      }
      await message.save();

      const likeCount = message.likes.length;

      res.status(200).json({ message: 'Like status updated successfully', likeCount });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

const deleteMessage = async (req, res) => {
    try {
      const message = await Message.findById(req.params.messageId);
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
      const ownerMessage = message.user.includes(req.user._id);
      if(!ownerMessage){
        return res.status(404).json({ error: 'You are not the owner of this message' });
      }
      await message.remove();
  
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
}

const deleteComment = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      const ownerComment = comment.user.includes(req.user._id);
      if(!ownerComment){
        return res.status(404).json({ error: 'You are not the owner of this comment' });
      }
      await comment.remove();
  
      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = { 
    postMessage,postComment,getAllMessages,getMessage,likeMessage,deleteMessage,deleteComment
}