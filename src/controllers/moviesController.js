const Movie = require('../models/movie')

const createMovie = async (req, res)=>{
    //crie um novo filme
    const movie = new Movie ({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        available_on: req.body.available_on,
        created_at: req.body.created_at
    })

    //tentar mandar uma resposta e salvar no mongo
    try {
        const newMovie = await movie.save() //que está salvando no banco de dados 
        res.status(201).json(newMovie) // enviando resposta do servidor
    }catch (err){ // se nao conseguir criar, me diga qual foi o erro
        res.status(400).json({message: err.message})
    }
}

const listMovies  = async (req, res)=> {
    const movies = await Movie.find() //listando todos filmes que estao salvos no MongoDB
    res.status(200).json(movies) //enviando resposta do servidor
}

const updateMovie = async (req, res)=>{
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie == null) {
            return res.status(404).json({ message: 'Filme não encontrado!'})
        }

        if (req.body.title != null) {
            movie.title = req.body.title
        }

        if (req.body.description  != null) {
            movie.description  = req.body.description
        }

        if (req.body.type != null) {
            movie.type = req.body.type
        }

        if (req.body.available_on != null) {
            movie.available_on = req.body.available_on
        }

        if (req.body.created_at != null) {
            movie.created_at = req.body.created_at
        }

        const movieUpdated = await movie.save()
        res.json(movieUpdated)
    
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

const deleteMovie = async (req, res)=>{
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie == null) {
        return res.status(404).json({ message: 'Filme não encontrado!'})
        }
    
        await movie.remove()
        res.json({ message: 'Filme deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

}
module.exports = { 
    createMovie,
    listMovies,
    updateMovie,
    deleteMovie


}

