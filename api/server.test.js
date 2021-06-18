// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})
test('sanity', () => {
  expect(true).toBe(true)
})
describe('register user', () => {
  it('registers a new user to the db', async () => {
    const res = await request(server).post('/api/auth/register')
    .send({username:"Daniel",password:"1234"})
    expect(res.status).toBe(201)

  })
  it('returns data in the correct shape', async () => {
    const res = await request(server).post('/api/auth/register')
    .send({username:"Daniel",password:"1234"})
    expect(res.body).toMatchObject({ id: 1,username:"Daniel" })
    expect(res.body.password).toBeDefined()
    expect( await db("users")).toHaveLength(1)
  })
  it('rejects request with missing username', async () => {
    const res = await request(server).post('/api/auth/register')
    .send({username:"",password:"1234"})
      expect(res.statusCode).toBe(400)
      expect(await db("users")).toHaveLength(0)
})
})
describe('alows a user to log in', () => {
  it('logs in a new user to the db', async () => {
    await request(server).post('/api/auth/register')
    .send({username:"Daniel",password:"1234"})
    const res = await request(server).post('/api/auth/login')
    .send({username:"Daniel",password:"1234"})
    expect(res.status).toBe(200)
  })
  it('sends back a token', async () => {
     await request(server).post('/api/auth/register')
    .send({username:"Daniel",password:"1234"})
    const res = await request(server).post('/api/auth/login')
    .send({username:"Daniel",password:"1234"})
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
  })
})
  describe('get jokes', () => {
    it('rejects a user without a token', async () => {
     const res = await request(server).get('/api/jokes')
      expect(res.status).toBe(401)
    })
    it('allows user with a token', async () => {
      const getToken = async ()=>{
        await request(server).post('/api/auth/register')
        .send({username:"Daniel",password:"1234"})
        const res = await request(server).post('/api/auth/login')
        .send({username:"Daniel",password:"1234"})
        return res.body.token
      }
      const token = await getToken()
      const res = await request(server).get("/api/jokes/")
      .set('Authorization',  token)
      expect(res.status).toBe(200)
    })
})
