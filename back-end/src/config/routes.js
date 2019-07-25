const express = require('express')
const Multer = require('multer')
const uploadConfig = require('../config/upload')

const PostController = require('../controllers/PostController')
const LikeController = require('../controllers/LikeController')

const multer = Multer(uploadConfig)
const Router = express.Router()

// Post routes
Router.get('/posts', multer.none(), PostController.index)
Router.post('/posts', multer.single('image'), PostController.store)

// Likes routes
Router.post('/posts/:id/likes', LikeController.store)

module.exports = Router