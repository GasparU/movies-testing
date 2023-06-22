const { getAll, create, getOne, remove, update, setGenres, setActors, setDirectors } = require('../controllers/movies.controllers');
const express = require('express');

const routerMovies = express.Router();

routerMovies.route('/')
    .get(getAll)
    .post(create);

routerMovies.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

//movies/:id/actors
routerMovies.route('/:id/genres')
    .post(setGenres)

//movies/:id/genres
routerMovies.route('/:id/actors')
    .post(setActors)

    //movies/:id/directors
routerMovies.route('/:id/directors')
    .post(setDirectors)


module.exports = routerMovies;