const restful = require('node-restful')
const mongoose = restful.mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose);

const fcusuSchema = new mongoose.Schema({
    idofi: {type: String, required: true},
    idusu: {type: Number, required: false},
    nome: {type: String, required: true},
    nomres: {type: String, required: false},
    razao: {type: String, required: false},
    cgccpf: {type: String, required: false},
    iestad: {type: String, required: false},
    endere: {type: String, required: false},
    endrua: {type: String, required: false},
    endnum: {type: String, required: false},
    endcom: {type: String, required: false},
    bairro: {type: String, required: false},
    cidade: {type: String, required: false},
    uf: {type: String, required: false},
    cep: {type: String, required: false},
    e_mail: {type: String, required: false, lowercase: true},
    fone: {type: String, required: false},
    latit: {type: Number, required: false},
    longit: {type: Number, required: false},
    auteml: {type: String, required: false},
    autpsh: {type: String, required: false},
    autsms: {type: String, required: false},
    autwat: {type: String, required: false},
    codsia: {type: String, required: false},
    endweb: {type: String, required: false},
    exiofi: {type: Number, required: false},
    horate: {type: String, required: false},
    idapp: {type: String, required: false},
    tipcon: {type: String, required: false},
    tipusu: {type: String, required: false, default: 'COF'},
    dttran: {type: Date, required: false, default: Date.now},
    hortra: {type: Number, required: false}
})

fcusuSchema.plugin(AutoIncrement, {id:'idusu_tbnum', inc_field: 'idusu'});

module.exports = restful.model('Usu', fcusuSchema)

/*
, disable_hooks: true

User.findOne('idgpas_tbnum', function(err, user){
    user.setNext('idgpas', function(err, user){
        if(err) console.log('Não pode aumentar a idgpas porque',err);
    });
});
*/