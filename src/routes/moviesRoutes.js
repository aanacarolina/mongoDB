const express = require('express')
const router = express.Router()

const controller = require('../controllers/moviesController')

//Create/Criar -> Post
router.post('/', controller.createMovie)

//Read/Ler -> Get
router.get('/', controller.listMovies)

//Update/atualizar -> Patch
router.patch('/:id', controller.updateMovie)

//Delete/deletar -> Delete
router.delete('/:id', controller.deleteMovie)

module.exports = router
