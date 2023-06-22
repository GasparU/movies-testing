const supertest = require('supertest') //otro nombre aparte de supertest es request
const app = require('../app')
require('../models')

let genreId
test("POST -> '/api/v1/genres', should return status code 201", async()=>{
    const genres = {
        name: "Terror"

    }

    const res = await supertest(app)
        .post('/api/v1/genres')
        .send(genres)
            
        genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(genres.name)
})

test("GET -> '/api/v1/genres', should return status code 200", async()=>{

    const res = await supertest(app).get('/api/v1/genres')

    expect(res.status).toBe(200)
})

test("GET One-> '/api/v1/genres', should return status code 200, and res.body.firstName should return 'jose' ", async()=>{

    const res = await supertest(app)
        .get(`/api/v1/genres/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Terror")
})

test("PUT -> '/api/v1/genres/:id' should return status 200 and res.body.firstName --- Student.firstName", async()=>{
    const genres = {
        name: "Acción"
    }

    const res = await supertest(app)
        .put(`/api/v1/genres/${genreId}`)
        .send(genres)

    
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genres.name)
})

test("DELETE -> '/api/v1/genres/:id' should return status 204", async ()=>{
    const res = await supertest(app).delete(`/api/v1/genres/${genreId}`)
    expect(res.status).toBe(204)
})