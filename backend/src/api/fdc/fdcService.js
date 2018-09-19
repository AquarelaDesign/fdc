const FDC = require('./fdc')
const errorHandler = require('../common/errorHandler')

FDC.methods(['get', 'post', 'put', 'delete'])
FDC.updateOptions({new: true, runValidators: true})
FDC.after('post', errorHandler).after('put', errorHandler)
/*
FDC.route('count', (req, res, next) => {
    FDC.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})
*/
/*
FDC.route('summary', (req, res, next) => {
    FDC.aggregate({
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
module.exports = FDC