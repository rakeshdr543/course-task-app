const express = require('express')

const Task = require('../model/task')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id)
        res.status(200).send(task)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    console.log(isValidOperation)

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid field update" })
    }
    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router