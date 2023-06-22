const Actors = require("./Actors");
const Directors = require("./Directors");
const Genres = require("./Genres");
const Movies = require("./Movies");


//Relación Tabla Pivote Movie => Actors. Movie tiene muchos Actores
Movies.belongsToMany(Actors, {through: "moviesActors"})
Actors.belongsToMany(Movies, {through: "moviesActors"})

//Relación Tabla Pivote Movie => Directors. Movie tiene muchos Directores
Movies.belongsToMany(Directors, {through: "moviesDirectors"} )
Directors.belongsToMany(Movies, {through: "moviesDirectors"} )

//Relación Tabla Pivote Movie => Genres. Movie tiene muchos Generos
Movies.belongsToMany(Genres, {through: "moviesGenres"} )
Genres.belongsToMany(Movies, {through: "moviesGenres"} )