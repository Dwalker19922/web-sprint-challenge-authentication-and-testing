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
  })
})