const express = require('express')

const Task = require('../model/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({ ...req.body, owner: req.user._id })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    const { completed, sortBy } = req.query
    const queryObject = {}
    const sort = {}

    if (completed) {
        queryObject.completed = completed === 'true'
    }

    if (sortBy) {
        const parts = sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    try {
        // await req.user.populate('tasks')
        let tasks = await Task.find({ ...queryObject, owner: req.user._id }).skip(skip).limit(limit).sort(sort)
        res.status(200).send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        res.status(200).send(task)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid field update" })
    }
    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router