'use strict'

let studentRoute = require('./studentRoute')

module.exports = (app) => {
    app.get('*', (req, res) => {
        res.render('page-not-found', {
            title: '404 Error'
        })
    })

}
