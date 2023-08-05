const express = require('express')
const router = express.Router()

const data = {}
data.employees = require('../../data/employees.json')
// console.log(data.employees)

// chain different HTTP methods to a single route
router.route('/')
    .get((req,res) => {
        res.json(data.employees)
    })
    .post((req,res) => {
        res.json({
            "name": req.body.name,
            "profession": req.body.profession
        })
    })
    .put((req,res) => {
        res.json({
            "name": req.body.name,
            "profession": req.body.profession
        })
    })
    .delete((req,res) => {
        res.json({ "id":req.body.id })
    })

router.route('/:id') // the url having a parameter
    .get((req,res) => {
        res.json({
            "id":req.params.id
        })
    })

module.exports = router
