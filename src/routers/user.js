const express = require('express')

const User = require('../model/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(user)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })
        res.status(200).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const { id } = req.params
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: "Invalid field update" })
    }
    try {
        const user = await User.findById(id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router