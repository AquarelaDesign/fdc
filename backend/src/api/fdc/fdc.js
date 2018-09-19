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
    temetq: {type: Number, required: false, default: false}
})

fcusuSchema.plugin(AutoIncrement, {id:'idusu_tbnum', inc_field: 'idusu'});
fccpvSchema.plugin(AutoIncrement, {id:'idgpas_tbnum', inc_field: 'idgpas'});

module.exports = restful.model('FDC', fccpvSchema)


/*
    fcrpv: [fcrpvSchema],
    fcspv: [fcspvSchema],
    fcppv: [fcppvSchema],
    fcusu: [fcusuSchema],
    fcvei: [fcveiSchema]



, disable_hooks: true

User.findOne('idgpas_tbnum', function(err, user){
    user.setNext('idgpas', function(err, user){
        if(err) console.log('Não pode aumentar a idgpas porque',err);
    });
});
*/