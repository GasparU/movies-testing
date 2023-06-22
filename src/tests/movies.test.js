const supertest = require('supertest') //otro nombre aparte de supertest es request
const app = require('../app')
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
    expect(res.body[0]).toBeDefined()
})

test("GET One-> '/api/v1/movies', should return status code 200, and res.body.firstName should return 'jose' ", async()=>{

    const res = await supertest(app)
        .get(`/api/v1/movies/${moviestId}`)

    console.log(res.body)

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

    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movies.name)
})

test("DELETE -> '/api/v1/movies/:id' should return status 204", async ()=>{
    const res = await supertest(app).delete(`/api/v1/movies/${moviestId}`)
    expect(res.status).toBe(204)
})