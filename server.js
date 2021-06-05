const express = require('express') // importa express
const app = express() //cria a instancia do express

//conectar o mongo com o mongoose
const db = require('./src/data/database')
db.connect()

app.use(express.json())

//usar as rotas
const moviesRouter = require('./src/routes/moviesRoutes')
app.use('/movies',moviesRouter)

const PORT = 3333 

app.listen(PORT, ()=> console.log(`Servidor de filmes rodando muito na porta ${PORT}`))    //subindo o servidor



