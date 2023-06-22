const catchError = require('../utils/catchError');
const Movies = require('../models/Movies');
const Genres = require('../models/Genres');
const Directors = require('../models/Directors');
const Actors = require('../models/Actors');

const getAll = catchError(async(req, res) => {
    const results = await Movies.findAll({include: [Genres, Directors, Actors]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movies.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.findByPk(id, {include: [Genres, Directors, Actors]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movies.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenres = catchError(async(req, res) => {

    // 1. Localizar la movie al que quiero setear datos
    const {id} = req.params
    const movies = await Movies.findByPk(id)

    // 2. setear valores
    await movies.setGenres(req.body)

    // 3. Leer los movies seteados
    const genres = await movies.getGenres()

    return res.json(genres)
})

const setActors = catchError(async(req, res) => {

    // 1. Localizar la movie al que quiero setear datos
    const {id} = req.params
    const movies = await Movies.findByPk(id)

    // 2. setear valores
    await movies.setActors(req.body)

    // 3. Leer los actors seteados
    const actors = await movies.getActors()

    return res.json(actors)
})

const setDirectors = catchError(async(req, res) => {

    // 1. Localizar la movie al que quiero setear datos
    const {id} = req.params
    const movies = await Movies.findByPk(id)

    // 2. setear valores
    await movies.setDirectors(req.body)

    // 3. Leer los directors seteados
    const directors = await movies.getDirectors()

    return res.json(directors)
})
module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres,
    setActors,
    setDirectors
}