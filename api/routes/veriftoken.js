const jwt = require('jsonwebtoken');


module.exports.verifyToken = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }

    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, 'eyJpc3MiOiJ0b2RvYXBpIiwibmJmIjoxND')

    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }

    req.userId = payload.subject
    next()
}