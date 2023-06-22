const express = require('express');
const routerMovies = require('./movies.routes');
const routerGenres = require('./genres.routes');
const routerDirectors = require('./directors.routes');
const routerActors = require('./actors.routes');
const router = express.Router();

// colocar las rutas aquí
router.use('/movies', routerMovies)
router.use('/genres', routerGenres)
router.use('/directors', routerDirectors)
router.use('/actors', routerActors)

module.exports = router;