const express = require('express')
const { nanoid } = require('nanoid')
const { SaneRedis } = require('@tuuturu/toolbox-node/data')

const { log } = require('../../lib/logging')
const { Note } = require('./models')

const router = express.Router()

const client = new SaneRedis.Client()
client.connect(process.env.REDIS_URI)
	.then(() => log.info(`Successfully connected to ${process.env.REDIS_URI}`))
	.catch(() => log.info(`Error connecting to ${process.env.REDIS_URI}`))

router.get('/', async (req, res) => {
	const repoKey = [
		req.principal,
		'notes'
	].join(':')

	const repo = client.createCollectionRepository(repoKey)

	const notes = await repo.getAll()

	res.json(notes).end()
})

router.post('/', async (req, res) => {
	const note = new Note(req.body)
	if (note.id) return res.status(400).end()

	note.id = nanoid()
	if (!note.isValid()) return res.status(400).end()

	const repoKey = [
		req.principal,
		'notes'
	].join(':')

	const repo = client.createCollectionRepository(repoKey)

	await repo.set(note.id, note)

	res.json(note).end()
})

router.patch('/:id', async (req, res) => {
	const repoKey = [
		req.principal,
		'notes'
	].join(':')

	const repo = client.createCollectionRepository(repoKey)
	const note = await repo.get(req.params.id)

	const updatedNote = new Note(Object.assign({}, note, req.body))
	updatedNote.id = req.params.id

	if (!updatedNote.isValid()) return res.status(400).end()

	await repo.set(req.params.id, updatedNote)

	res.json(updatedNote).end()
})

router.delete('/:id', async (req, res) => {
	const repoKey = [
		req.principal,
		'notes'
	].join(':')

	const repo = client.createCollectionRepository(repoKey)
	await repo.del(req.params.id)

	res.end()
})

module.exports = router
