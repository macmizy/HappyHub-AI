const express = require('express')
const authenticateUser = require('../middleware/user.auth')
const controller = require('../controllers/community.controller')
const communityRoute = express.Router()

communityRoute.post("/message", authenticateUser, controller.postMessage);

communityRoute.post("/comment/:messageId", authenticateUser, controller.postComment);



communityRoute.get("/message", authenticateUser, controller.getAllMessages);


communityRoute.get("/message/:messageId", authenticateUser, controller.getMessage);

communityRoute.patch('/api/messages/:messageId/like', authenticateUser, controller.likeMessage);

communityRoute.delete('/api/messages/:messageId', authenticateUser, controller.deleteMessage);

communityRoute.delete("/api/comments/:commentId", authenticateUser, controller.deleteComment);


module.exports = communityRoute;