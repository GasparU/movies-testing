const supertest = require('supertest') //otro nombre aparte de supertest es request
const app = require('../app')
const Actors = require('../models/Actors')
const Directors = require('../models/Directors')
const Genres = require('../models/Genres')

require('../models')

let moviestId
test("POST -> '/api/v1/movies', should return status code 201", async()=>{
    const movies = {
        name: "Star Wars",
        image: "image1",
        synopsis: "resumen star wars",
        releaseYear: "1992"
    }

    const res = await supertest(app)
        .post('/api/v1/movies')
        .send(movies)
   
    moviestId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movies.name)
})

test("GET -> '/api/v1/movies', should return status code 200", async()=>{

    const res = await supertest(app).get('/api/v1/movies')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].directors).toBeDefined()
})

test("GET One-> '/api/v1/movies', should return status code 200, and res.body.firstName should return 'jose' ", async()=>{

    const res = await supertest(app)
        .get(`/api/v1/movies/${moviestId}`)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Star Wars")
})

test("PUT -> '/api/v1/movies/:id' should return status 200 and res.body.firstName --- Student.firstName", async()=>{
    const movies = {
        name: "Mario Bros",
        image: "imagen2",
        synopsis: "resumen star wars",
        releaseYear: "1992"
    }

    const res = await supertest(app)
        .put(`/api/v1/movies/${moviestId}`)
        .send(movies)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movies.name)
})

test("POST -> '/api/v1/movies/:id/actors' should return status 200 and res.body.length = 1", async ()=>{
    const actors = {
        firstName: "Yenny",
        lastName: "Zamora",
        nationality: "Canada",
        image: "imagen1",
        birthday: "1984-05-09"
    }

    const actor = await Actors.create(actors)

    const res = await supertest(app)
        .post(`/api/v1/movies/${moviestId}/actors`)
        .send([actor.id])

        
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    await actor.destroy()
})

test("POST -> '/api/v1/movies/:id/directors' should return status 200 and res.body.length = 1", async ()=>{
    const directors = {
        firstName: "Cinthya",
        lastName: "Gaspar",
        nationality: "peruano",
        image: "imagen1",
        birthday: "1982-12-15"
    }

    const director = await Directors.create(directors)

    const res = await supertest(app)
        .post(`/api/v1/movies/${moviestId}/directors`)
        .send([director.id])
       
    expect(res.status).toBe(200)
})

test("POST -> '/api/v1/movies/:id/genres' should return status 200 and res.body.length = 1", async ()=>{
    const genres = {
        name: "Acción"
    }

    const genre = await Genres.create(genres)

    const res = await supertest(app)
        .post(`/api/v1/movies/${moviestId}/genres`)
        .send([genre.id])

    expect(res.status).toBe(200)
})

test("DELETE -> '/api/v1/movies/:id' should return status 204", async ()=>{
    const res = await supertest(app).delete(`/api/v1/movies/${moviestId}`)
    expect(res.status).toBe(204)
})