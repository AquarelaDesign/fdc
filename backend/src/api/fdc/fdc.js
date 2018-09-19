const restful = require('node-restful')
const mongoose = restful.mongoose

const fcrpvSchema = new mongoose.Schema({
    descri: {type: String, required: false},
    dttran: {type: Date, required: false},
    hortra: {type: Number, required: false},
    idgpas: {type: Number, required: false},
    idipas: {type: String, required: false}
})

const fcspvSchema = new mongoose.Schema({
    codser: {type: String, required: false},
    descri: {type: String, required: false},
    dttran: {type: Date, required: false},
    hortra: {type: Number, required: false},
    idgpas: {type: Number, required: false},
    idipas: {type: String, required: false},
    quant: {type: Number, required: false},
    vlunit: {type: Number, required: false}
})

const fcppvSchema = new mongoose.Schema({
    codpec: {type: String, required: false},
    descri: {type: String, required: false},
    dttran: {type: Date, required: false},
    hortra: {type: Number, required: false},
    idgpas: {type: Number, required: false},
    idipas: {type: String, required: false},
    quant: {type: Number, required: false},
    vlunit: {type: Number, required: false}
})

const fcusuSchema = new mongoose.Schema({
    auteml: {type: String, required: false},
    autpsh: {type: String, required: false},
    autsms: {type: String, required: false},
    autwat: {type: String, required: false},
    bairro: {type: String, required: false},
    cep: {type: String, required: false},
    cgccpf: {type: String, required: false},
    cidade: {type: String, required: false},
    codsia: {type: String, required: false},
    dttran: {type: Date, required: false},
    endcom: {type: String, required: false},
    endere: {type: String, required: false},
    endnum: {type: String, required: false},
    endrua: {type: String, required: false},
    endweb: {type: String, required: false},
    exiofi: {type: Number, required: false},
    e_mail: {type: String, required: false},
    fone: {type: String, required: false},
    horate: {type: String, required: false},
    hortra: {type: Number, required: false},
    idapp: {type: String, required: false},
    idofi: {type: String, required: false},
    idusu: {type: String, required: false},
    iestad: {type: String, required: false},
    latit: {type: Number, required: false},
    longit: {type: Number, required: false},
    nome: {type: String, required: false},
    nomres: {type: String, required: false},
    razao: {type: String, required: false},
    tipcon: {type: String, required: false},
    tipusu: {type: String, required: false},
    uf: {type: String, required: false}
})

const fcveiSchema = new mongoose.Schema({
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
    dttran: {type: Date, required: false},
    hortra: {type: Number, required: false},
    idusu: {type: Number, required: false},
    placa: {type: String, required: false}
})

const fccpvSchema = new mongoose.Schema({
    cgccpf: {type: String, required: false},
    chassi: {type: String, required: false},
    dtpsg: {type: Date, required: true},
    dttran: {type: Date, required: false},
    exiofi: {type: Number, required: false},
    hortra: {type: Number, required: false},
    idgpas: {type: Number, required: false},
    idipas: {type: String, required: true},
    idusu: {type: String, required: false},
    kilome: {type: Number, required: false},
    observ: {type: String, required: false},
    placa: {type: String, required: true},
    situac: {type: Number, required: false},
    temetq: {type: Number, required: false},
    fcrpv: [fcrpvSchema],
    fcspv: [fcspvSchema],
    fcppv: [fcppvSchema],
    fcusu: [fcusuSchema],
    fcvei: [fcveiSchema]
})

module.exports = restful.model('FDC', fccpvSchema)