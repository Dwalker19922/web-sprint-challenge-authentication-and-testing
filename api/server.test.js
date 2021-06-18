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
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})
test('sanity', () => {
  expect(true).toBe(true)
})
