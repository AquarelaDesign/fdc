const Pas = require('./pas')
const errorHandler = require('../../common/errorHandler')

Pas.methods(['get', 'post', 'put', 'delete'])
Pas.updateOptions({new: true, runValidators: true})
Pas.after('post', errorHandler).after('put', errorHandler)

Pas.route('count', (req, res, next) => {
    Pas.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

/*
Pas.route('summary', (req, res, next) => {
    Pas.aggregate({
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
    }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, {
        $project: {_id: 0, credit: 1, debt: 1}
    }, (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})
*/
module.exports = Pas