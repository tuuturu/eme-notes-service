const express = require('express');
const { errorLogMiddleware, requestLogMiddleware } = require('./logging')

const { middleware } = require('@tuuturu/toolbox-node/authentication')

const notesRouter = require('../feature/notes/router')

async function createApp() {
    const app = express();

    app.disable('etag')
	  app.use(requestLogMiddleware)
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    app.get('/health', function (req, res) {
        res.sendStatus(200)
    });

    // Place routers before authMiddleware if you want to expose them without the need of a token

    app.use(middleware.authenticationMiddleware(`${process.env.GATEKEEPER_URL}/userinfo`))

    // Place routers after authMiddleware if you want your router to require a token
    app.use('/notes', notesRouter)

    app.use(errorLogMiddleware)
    app.use(function (err, req, res, next) {
        if (err instanceof middleware.AuthorizationError) {
            res.status(401).send('Invalid or missing token...')
        }
    })

    return app
}

module.exports = {
    createApp
}
