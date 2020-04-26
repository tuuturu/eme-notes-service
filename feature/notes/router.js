const express = require('express')
const { SaneRedis } = require('@tuuturu/toolbox-node/data')

const router = express.Router()

router.get('/', async (req, res) => {
	const client = new SaneRedis.Client()

	res.json({ msg: 'works' })
})

module.exports = router
