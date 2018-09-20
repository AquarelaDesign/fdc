const restful = require('node-restful')
const mongoose = restful.mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose);

const fcrpvSchema = new mongoose.Schema({
    descri: {type: String, required: false},
    dttran: {type: Date, required: false, default: Date.now},
    hortra: {type: Number, required: false}
})

const fcspvSchema = new mongoose.Schema({
    codser: {type: String, required: false},
    descri: {type: String, required: false},
    quant: {type: Number, min: 0, required: false, default: 0},
    vlunit: {type: Number, required: false},
    dttran: {type: Date, required: false, default: Date.now},
    hortra: {type: Number, required: false}
})

const fcppvSchema = new mongoose.Schema({
    codpec: {type: String, required: false},
    descri: {type: String, required: false},
    quant: {type: Number, min: 0, required: false, default: 0},
    vlunit: {type: Number, required: false},
    dttran: {type: Date, required: false, default: Date.now},
    hortra: {type: Number, required: false}
})

const fccpvSchema = new mongoose.Schema({
    idipas: {type: String, required: true},
    placa: {type: String, required: true, uppercase: true},
    dtpsg: {type: Date, required: true},
    cgccpf: {type: String, required: false},
    chassi: {type: String, required: false},
    dttran: {type: Date, required: false, default: Date.now},
    exiofi: {type: Number, required: false, default: true},
    hortra: {type: Number, required: false},
    idgpas: {type: Number, required: false},
    idusu: {type: String, required: false},
    kilome: {type: Number, required: false},
    observ: {type: String, required: false},
    situac: {type: Number, required: false},
    temetq: {type: Number, required: false, default: false},
    fcrpv: [fcrpvSchema],
    fcspv: [fcspvSchema],
    fcppv: [fcppvSchema]
})

fccpvSchema.plugin(AutoIncrement, {id:'idgpas_tbnum', inc_field: 'idgpas'});

module.exports = restful.model('Pas', fccpvSchema)

/*
, disable_hooks: true

User.findOne('idgpas_tbnum', function(err, user){
    user.setNext('idgpas', function(err, user){
        if(err) console.log('Não pode aumentar a idgpas porque',err);
    });
});
*/