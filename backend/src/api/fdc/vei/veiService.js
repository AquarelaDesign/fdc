const Vei = require('./vei')
const errorHandler = require('../../common/errorHandler')

Vei.methods(['get', 'post', 'put', 'delete'])
Vei.updateOptions({new: true, runValidators: true})
Vei.after('post', errorHandler).after('put', errorHandler)

Vei.route('count', (req, res, next) => {
    Vei.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

/*
Vei.route('summary', (req, res, next) => {
    Vei.aggregate({
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
module.exports = Vei