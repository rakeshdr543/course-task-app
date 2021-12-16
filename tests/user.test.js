const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOne, userOneId, setUpDatabase } = require('./fixtures/db')

// beforeEach(async () => {
//     setUpDatabase()
// })

test('Should test create user', async (done) => {
    const response = await request(app).post('/users').send({
        name: 'Rakesh',
        email: "rakeshtest1@mail.com",
        password: "forgot12345"
    }).expect(201)
    done()

    // Assert that database was changed successfully
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertion about response
    expect(response.body).toMatchObject({
        user: {
            name: 'Rakesh',
            email: "rakeshtest1@mail.com",
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('forgot12345')
})

test('Should login user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.user.token).toBe(user.tokens[1].token)
})

test('Should not login user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "123"
    }).expect(400)
})

test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get user profile', async () => {
    await request(app)
        .get('/users/me')
        .send({})
        .expect(400)
})

test('Should delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete user profile', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(400)
})

test('Should upload user avatar', async () => {
    await request(app)
        .delete('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/image.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update name of user profile', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ name: 'Jest' })
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual(Jest)
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ location: 'Sira' })
        .expect(400)
})