const restful = require('node-restful')
const mongoose = restful.mongoose

const fcveiSchema = new mongoose.Schema({
    idusu: {type: Number, required: true},
    placa: {type: String, required: false, uppercase: true},
    anofab: {type: Number, required: false},
    anomod: {type: Number, required: false},
    cgccpf: {type: String, required: false},
    chassi: {type: String, required: false},
    codmar: {type: String, required: false},
    codmod: {type: String, required: false},
    codmol: {type: String, required: false},
    codver: {type: String, required: false},
    corvei: {type: String, required: false},
    descri: {type: String, required: false},
    dttran: {type: Date, required: false, default: Date.now},
    hortra: {type: Number, required: false}
})

module.exports = restful.model('Vei', fcveiSchema)

/*
, disable_hooks: true

User.findOne('idgpas_tbnum', function(err, user){
    user.setNext('idgpas', function(err, user){
        if(err) console.log('Não pode aumentar a idgpas porque',err);
    });
});
*/