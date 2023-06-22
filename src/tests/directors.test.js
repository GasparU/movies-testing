const supertest = require('supertest') //otro nombre aparte de supertest es request
const app = require('../app')
require('../models')

let directorstId
test("POST -> '/api/v1/directors', should return status code 201", async()=>{
    const directors = {
        firstName: "Yenny",
        lastName: "Calderon",
        nationality: "peruano",
        image: "imagen1",
        birthday: "1989-08-12"
    }

    const res = await supertest(app)
        .post('/api/v1/directors')
        .send(directors)
        
        console.log(res.body)
        directorstId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(directors.firstName)
})

test("GET -> '/api/v1/directors', should return status code 200", async()=>{

    const res = await supertest(app).get('/api/v1/directors')

    expect(res.status).toBe(200)
})

test("GET One-> '/api/v1/directors', should return status code 200, and res.body.firstName should return 'jose' ", async()=>{

    const res = await supertest(app)
        .get(`/api/v1/directors/${directorstId}`)

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Yenny")
})

test("PUT -> '/api/v1/directors/:id' should return status 200 and res.body.firstName --- Student.firstName", async()=>{
    const directors = {
        firstName: "Mayra",
        lastName: "Calderon",
        nationality: "peruano",
        image: "imagen1",
        birthday: "1989-08-12"
    }

    const res = await supertest(app)
        .put(`/api/v1/directors/${directorstId}`)
        .send(directors)

    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(directors.firstName)
})

test("DELETE -> '/api/v1/directors/:id' should return status 204", async ()=>{
    const res = await supertest(app).delete(`/api/v1/movies/${directorstId}`)
    expect(res.status).toBe(204)
})