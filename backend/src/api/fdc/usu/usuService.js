const Usu = require('./usu')
const errorHandler = require('../../common/errorHandler')

Usu.methods(['get', 'post', 'put', 'delete'])
Usu.updateOptions({new: true, runValidators: true})
Usu.after('post', errorHandler).after('put', errorHandler)

Usu.route('find', (req, res, next) => {
    const email = req.body.e_mail || ''

    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            const { nome, email, idusu } = user
            res.json({ nome, email, idusu })
        } else {
            return res.send({ })
        }
    })
})

Usu.route('count', (req, res, next) => {
    Usu.count((error, value) => {
        if (error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})


/*
Usu.route('summary', (req, res, next) => {
    Usu.aggregate({
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
module.exports = Usu