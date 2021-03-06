import React, { Component, Suspense } from 'react'
import api from '../../services/api'
import Axios from 'axios'
// import { element } from 'prop-types'

import {
  CardColumns,
  Card,
  CardHeader,
  CardBody,
  Col,
  Progress,
  Row,
} from 'reactstrap'
// import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { Etiquetas, IndicadorBarra, IndicadorSimples } from '../../components'
import { getEmail, dataInicial, dataFinal } from '../../globais'

const email = getEmail()

const Icones = {
  CT: "fa fa-credit-card",
  BO: "fa fa-barcode",
  OU: "fa fa-usd",
  DI: "fa fa-money",
  TR: "fa fa-exchange",
  DE: "fa fa-handshake-o",
}

const divBlock = {
  display: 'block'
}

const divNone = {
  display: 'none'
}

class Dashboard extends Component {
  _isMounted = false

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
      mostraValores: true,
      styleLoader: divNone,
      hGrafDocs: { height: 388 },
      ttresetq: [{
        qtetqn: 0, 
        qtetqp: 0, 
        qtetqtot: 0, 
        qtetqv: 0, 
        qtperd: 0, 
        qtreal: 0
      }],
      ttfccpvl: [],
      ttpagto: [
        {tippag: "CT", qtdtot: 0, despag: "CARTÃO", valor: 0.00, perc: 0.00},
        {tippag: "OU", qtdtot: 0, despag: "OUTROS", valor: 0.00, perc: 0.00},
        {tippag: "BO", qtdtot: 0, despag: "BOLETO", valor: 0.00, perc: 0.00},
        {tippag: "DI", qtdtot: 0, despag: "DINHEIRO", valor: 0.00, perc: 0.00},
        {tippag: "TR", qtdtot: 0, despag: "TRANSFERÊNCIA", valor: 0.00, perc: 0.00},
        {tippag: "DE", qtdtot: 0, despag: "DESCONTO", valor: 0.00, perc: 0.00}
      ],
      ttpec: [],
      ttresumo: [
        {
          "qtdtot": 0,
          "vltotal": 0.0,
          "tikmed": 0.0,
          "vlserv": 0,
          "perserv": 0.00,
          "vlpec": 0.00,
          "perpec": 0.00
        }
      ],
      ttretorno: [],
      ttserv: [],
      legendas: {},
      cores: {},
      grDocs: [{
        data: [],
        labels: [],
        cores: [],
      }],
      grContas: [{
        data: [],
        labels: [],
        cores: [],
      }],
      resContas: [],
      totpag: 0,
      totrec: 0,
      qtrec: 0,
      qtpag: 0,
      totais: [{
        canval: 0,
        cancel: 0,
        inu: 0,
        dev: 0,
        imp: 0,
        pas: 0,
        rps: 0,
        nfse: 0,
        err: 0,
        orc: 0,
        val: 0,
        geral: 0,
      }],
    }
  }

  componentDidMount() {
    try {
      this._isMounted = true

      this.startPreloader()

      function calculaNotas(ListaDocs, state) {
        let totais = {}
            totais.canval = 0
            totais.cancel = 0
            totais.inu = 0
            totais.dev = 0
            totais.imp = 0
            totais.pas = 0
            totais.rps = 0
            totais.nfse = 0
            totais.err = 0
            totais.orc = 0
            totais.val = 0
            totais.geral = 0
        
        let legendas = {}
            legendas.canval = 'Cancelada com DANFE'
            legendas.cancel = 'Cancelado'
            legendas.inu = 'Inutilizada'
            legendas.dev = 'NFe Devolução'
            legendas.imp = 'NFe Importada'
            legendas.pas = 'Passagem'
            legendas.rps = 'RPS'
            legendas.nfse = 'NFSe'
            legendas.err = 'Com Erro'
            legendas.orc = 'Orçamento'
            legendas.val = 'NFe'
            legendas.geral = 'Total'

        let cores = {}
            cores.canval = '#FF6384'
            cores.cancel = '#FF0000'
            cores.inu = '#000000'
            cores.dev = '#191970'
            cores.imp = '#4682B4'
            cores.pas = '#FFCE56'
            cores.rps = '#00FFFF'
            cores.nfse = '#008080'
            cores.err = '#800000'
            cores.orc = '#FF8C00'
            cores.val = '#00FF00'
            cores.geral = '#FFFFFF'

        if (ListaDocs !== undefined) {
          ListaDocs.forEach((value, key) => {
            const _tipo = value.TipoNF;
      
            if (value.Tipo === 'CAN' || value.Situacao === 'C') { // Cancelado
              if (value.Tipo === 'VAL') {
                totais.canval++
                totais.geral++
              } else {
                totais.cancel++
                totais.geral++
              }
            } else if (value.Situacao === 'INU') {
              totais.inu++
              totais.geral++
            } else {
              switch(value.Tipo) {
                case '': 
                  if (_tipo === 'DEV') {
                    if (value.Situacao === 'ERR') {
                      totais.err++
                    } else {
                      totais.dev++                       
                    }
                    totais.geral++
                  } else if (_tipo === 'NFE') {
                    totais.imp++
                    totais.geral++
                  } else {
                    totais.geral++
                  }
                  break
                case 'PAS': 
                  if (_tipo === 'NFSE') {
                    if (value.SerieNFSe === 'RP') {
                      totais.rps++
                      totais.geral++
                    } else {
                      totais.nfse++
                      totais.geral++
                    }
                  } else {
                    totais.pas++
                    totais.geral++
                  }
                  break
                case 'INU': 
                  totais.inu++
                  totais.geral++
                  break
                case 'ERR': 
                  totais.err++
                  totais.geral++
                  break
                case 'DEV': 
                  totais.dev++
                  totais.geral++
                  break
                case 'VAL': 
                  if (!value.chaNFe) {
                    totais.err++
                    totais.geral++
                  } else {
                    totais.val++
                    totais.geral++
                  }
                  break
                case 'ORC': 
                  totais.orc++
                  totais.geral++
                  break
                default:  
                  totais.geral++
                  break
              }
            }
      
          })
        } else {
          // const grDocs = { data: totais, labels: legendas, cores }
          // this.setState({ grDocs: grDocs })
        }

        state.setState({ totais: totais, legendas: legendas, cores: cores })
        return totais
      }

      async function buscaEtqs(state) {
        try {
          await api.post('/v01/busca', {
            pservico: 'wfcpas',
            pmetodo: 'ResumoEtiquetas',
            pcodprg: 'TFCINI',
            pemail: email,
          }).then(response => {
            if (response.status === 200) {
              state.setState({ ttresetq: response.data.data.ttresetq })
            } else {
              buscaEtqs(state)
            }
          })
        } catch (error) {
          const { response } = error
          if (response !== undefined) {
          } else {
            console.log(error, {type: 'error'})
          }
        }
      }

      async function buscaPas(state) {
        try {
          await api.post('/v01/busca', {
            pservico: 'wfcpas',
            pmetodo: 'ListaPassagens',
            pcodprg: 'TFCMON',
            pemail: email,
            params: {
              pdatini: dataInicial,
              pdatfim: dataFinal,
              psituac: 'TOD',
            }
          }).then(response => {
            if (response.status === 200) {
              const { ttfccpvl, ttpagto, ttpec, ttresumo, ttretorno, ttserv, } = response.data.data
              state.setState({ ttfccpvl, ttpec, ttretorno, ttserv })
              
              if (ttpagto !== undefined) state.setState({ ttpagto })
              if (ttresumo !== undefined) state.setState({ ttresumo })
            } else {
              buscaPas(state)
            }
          })
        } catch (error) {
          const { response } = error
          if (response !== undefined) {
            console.log(response.data.errors[0], {type: 'error'})
          } else {
            console.log(error, {type: 'error'})
          }
        }
      }

      async function buscaContas(state) {
        try {
          await api.post('/v01/busca', {
            pservico: 'wfcfin',
            pmetodo: 'ListaResumo',
            pcodprg: 'TFCFIN',
            pemail: email,
            params: {
              pdtini: dataInicial,
              pdtfim: dataFinal,
              ptipcon: 'A',
            }
          }).then(response => {
            if (response.status === 200) {
              const { ttresumo } = response.data.data
              // state.setState({ resContas: ttresumo })
              console.log(ttresumo)
              
              ttresumo.forEach((value, key) => {
                state.setState({ 
                  totpag: state.state.totpag + value.totpag,
                  totrec: state.state.totrec + value.totrec,
                  qtpag: state.state.qtpag + value.qtpag,
                  qtrec: state.state.qtrec + value.qtrec
                })
                // console.log(`${value.dtvcto};${value.qtpag};${value.totpag};${value.qtrec};${value.totrec};`)
              })
            } else {
              buscaContas(state)
            }
          })
        } catch (error) {
          const { response } = error
          if (response !== undefined) {
            console.log(response.data.errors[0], {type: 'error'})
          } else {
            console.log(error, {type: 'error'})
          }
        }
      }

      const uri = 'http://fdc.procyon.com.br/wss/i/integra.php'
      const url = `${uri}?prog=wsimporc&email=${email}&di=${dataInicial}&df=${dataFinal}&t=R`
      
      async function buscaNotas(state) {
        try {
          await Axios.get(
            url
          ).then(response => {
            if (response.status === 200) {
              const { ListaDocs } = response.data.Lista
              calculaNotas(ListaDocs, state)
            } else {
              buscaNotas(state)
            }
          })
        } catch (error) {
          const { response } = error
          if (response !== undefined) {
            console.log('err1', response.data.errors[0], {type: 'error'})
          } else {
            console.log('err2', error, {type: 'error'})
          }
        }
        state.montaGraficoDocs()
      }

      buscaEtqs(this)
      buscaPas(this)
      buscaContas(this)
      buscaNotas(this)
    }
    catch (e) {
      console.log('Erro:', e)
    }
    finally {
      this.endPreloader()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  calcTot(total, per, dec) {
    try {
      let valor = (total * (per / 100))
      return new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: dec,
                maximumFractionDigits: dec
              }).format(valor)
    } catch (error) {
      return '0'
    }
  }

  retValor(valor, tipo) {
    let xVal = 0

    if (valor !== undefined || valor !== null) {
      xVal = valor
    }

    try {
      return new Intl.NumberFormat('pt-BR', {
                  style: tipo,
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(xVal)
    } catch (error) {
      return tipo === 'currency' ? 'R$ 0,00' : '0,00'
    }
  }

  montaGraficoDocs() {
    const { totais, legendas, cores } = this.state
    
    let labels = []
    let data = []
    let cor = []
    
    for (let [key, value] of Object.entries(totais)) {
      if (value > 0 && key !== 'geral') {
        for (let [k, v] of Object.entries(legendas)) {
          if (k === key) {
            labels.push(v)
            break
          }
        }
        
        for (let [k, v] of Object.entries(cores)) {
          if (k === key) {
            cor.push(v)
            break
          }
        }
        
        data.push(value)
      }
    }

    const grDocs = { data, labels, cores: cor }
    this.setState({ grDocs: grDocs })

//    const height = document.getElementById('chartDocs').clientHeight
//    const clRec = { height: height }
//    this.setState({ hGrafDocs: clRec })
  }

  startPreloader() {
    this.setState({ styleLoader: divBlock })
  }
 
  endPreloader() {
    this.setState({ styleLoader: divNone })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Carregando...</div>

  render() {
    const { 
      ttresetq, ttresumo, ttpagto, 
      grDocs, hGrafDocs,
      styleLoader, mostraValores,
      totpag, totrec,
    } = this.state

    // try {
      const Resetq = ttresetq[0]
      const Resumo = ttresumo[0]
      /*
      const pie = {
        labels: grDocs.labels,
        datasets: [
          {
            data: grDocs.data,
            backgroundColor: grDocs.cores,
            hoverBackgroundColor: grDocs.cores,
          }],
      }
      
      const line = {
        labels: grDocs.labels,
        datasets: [
          {
            label: 'Documentos',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: grDocs.data,
          },
        ],
      }
      
      const doughnut = {
        labels: grDocs.labels,
        datasets: [
          {
            data: grDocs.data,
            backgroundColor: grDocs.cores,
            hoverBackgroundColor: grDocs.cores,
          }],
      }
      */
      const bar = {
        labels: grDocs.labels,
        datasets: [
          {
            label: '',
            backgroundColor: 'rgba(0,0,205,0.2)',
            borderColor: 'rgba(131,111,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,0,205,0.4)',
            hoverBorderColor: 'rgba(131,111,255,1)',
            data: grDocs.data,
          },
        ],
      }

      const options = {
        label: {
          display: false,
        },
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false
      }
      
      return (
        <div className="animated fadeIn">
          <div style={styleLoader}>
            Buscando dados...
          </div>
          {/* Etiquetas */}
          <Suspense fallback={this.loading()}>          
            <Card>
              <CardHeader>
                Etiquetas
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" sm="4" lg="2">
                    <Etiquetas
                      className="text-white bg-gray-700"
                      icon="fa fa-tags"
                      mainText="Abertas"
                      color="secondary"
                      value={Resetq.qtetqtot.toString()}
                      link="#/charts"
                      footer
                    />
                  </Col>
                  <Col xs="12" sm="4" lg="2">
                    <Etiquetas
                      className="text-white bg-success"
                      icon="fa fa-check-square-o"
                      mainText="Normais"
                      color="secondary"
                      value={Resetq.qtetqn.toString()}
                      link="#/charts"
                      footer
                    />
                  </Col>
                  <Col xs="12" sm="4" lg="2">
                    <Etiquetas
                      className="text-white bg-warning"
                      icon="fa fa-exclamation-triangle"
                      mainText="Próximas"
                      color="secondary"
                      value={Resetq.qtetqp.toString()}
                      link="#/charts"
                      footer
                    />
                  </Col>
                  <Col xs="12" sm="4" lg="2">
                    <Etiquetas
                      className="text-white bg-danger"
                      icon="fa fa-times"
                      mainText="Vencidas"
                      color="secondary"
                      value={Resetq.qtetqv.toString()}
                      link="#/charts"
                      footer
                    />
                  </Col>
                  <Col xs="12" sm="4" lg="2">
                    <Etiquetas
                      className="text-white bg-primary"
                      icon="fa fa-thumbs-up"
                      mainText="Efetuadas"
                      color="secondary"
                      value={Resetq.qtreal.toString()}
                      link="#/charts"
                      footer
                    />
                  </Col>
                  <Col xs="12" sm="4" lg="2">
                    <Etiquetas
                      className="text-white bg-dark"
                      icon="fa fa-thumbs-down"
                      mainText="Perdidas"
                      color="secondary"
                      value={Resetq.qtperd.toString()}
                      link="#/charts"
                      footer
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Suspense>

          {/* Indicadores */}
          <Suspense fallback={this.loading()}>
            <Card>
              <CardHeader>
                Indicadores
              </CardHeader>
              <CardBody>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="callout callout-Light">
                      <div className="h5">Peças</div>
                      <strong className="h6">
                        {Resumo !== undefined ?
                          this.calcTot(Resumo.qtdtot,Resumo.perpec,0) : '0'}
                      </strong>
                      &nbsp;Passagens
                      <strong>
                        {Resumo !== undefined && mostraValores ?
                          ' '+this.retValor(Resumo.vlpec, 'currency') : ''}
                        &nbsp;(
                        {Resumo !== undefined ?
                          this.retValor(Resumo.perpec, 'decimal') : '0,00'}
                        %)
                      </strong>
                      <Progress
                        className="progress-xs mt-2"
                        color="success"
                        value={Resumo !== undefined ? Resumo.perpec : 0}
                        />
                    </div>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="callout callout-Light">
                      <div className="h5">Serviços</div>
                      <strong className="h6">
                        {Resumo !== undefined ?
                          this.calcTot(Resumo.qtdtot,Resumo.perserv,0) : '0'}
                      </strong>
                      &nbsp;Passagens
                      <strong>
                        {Resumo !== undefined && mostraValores ?
                          ' '+this.retValor(Resumo.vlserv, 'currency') : ''}
                        &nbsp;(
                        {Resumo !== undefined ?
                          this.retValor(Resumo.perserv, 'decimal') : '0,00'}
                        %)
                      </strong>
                      <Progress
                        className="progress-xs mt-2"
                        color="info"
                        value={Resumo !== undefined ? Resumo.perserv : 0}
                      />
                    </div>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="callout callout-Light">
                      <div className="h5">Total</div>
                      <strong className="h6">
                        {Resumo !== undefined ?
                          Resumo.qtdtot.toString() : '0'}
                      </strong>
                      &nbsp;Passagens
                      <strong>
                        {Resumo !== undefined && mostraValores ?
                          ' '+this.retValor(Resumo.vltotal, 'currency') : ''}
                        &nbsp;(
                        {Resumo !== undefined ?
                          '100,00' : '0,00'}
                        %)
                      </strong>
                      <Progress
                        className="progress-xs mt-2"
                        color="info"
                        value={Resumo !== undefined ? 100 : 0}
                      />
                    </div>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="callout callout-Light">
                      <div className="h5">Ticket Médio</div>
                      <strong>
                        {Resumo !== undefined && mostraValores ?
                          this.retValor(Resumo.tikmed, 'currency') : ''}
                      </strong>
                      <Progress
                        className="progress-xs mt-2"
                        color="warning"
                        value={Resumo !== undefined ? 100 : 0}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                      <IndicadorSimples
                        header={totpag.toString()}
                        mainText="Contas a Pagar" 
                        icon="fa fa-bank" 
                        color="danger" 
                        variant="1" 
                      />
                    </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <IndicadorSimples
                      header={totrec.toString()}
                      mainText="Contas a Receber" 
                      icon="fa fa-money" 
                      color="success" 
                      variant="1" 
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Suspense>

          <Suspense fallback={this.loading()}>          
            <CardColumns className="cols-2">
              {/* Recebimentos */}
              <Card style={hGrafDocs}>
                <CardHeader>
                  Recebimentos
                  <div className="card-header-actions">
                    <a href="/dashboard" className="card-header-action">
                      <small className="text-muted">+</small>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <ul>
                    {
                    ttpagto.map(pagto => (
                      <IndicadorBarra
                        key={pagto.tippag}
                        icon={Icones[pagto.tippag]}
                        title={pagto.despag}
                        value={ mostraValores ? pagto.valor.toString() : ''}
                        percent={pagto.perc.toString()}
                      />
                    ))
                    }
                  </ul>
                </CardBody>
              </Card>
              {/* Documentos */}
              <Card id="chartDocs">
                <CardHeader>
                  Documentos
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Bar data={bar} options={options} />
                  </div>
                </CardBody>
              </Card>
              {/*
              <Card>
                <CardBody>
                  <div className="chart-wrapper">
                    <Pie data={pie} />
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="chart-wrapper">
                    <Line data={line} options={options} />
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div className="chart-wrapper">
                    <Doughnut data={doughnut} />
                  </div>
                </CardBody>
              </Card>
              */}
            </CardColumns>
          </Suspense>
        </div>
      )
    // } catch(e) {
    //   // console.log('render', e)
    //   return (
    //     <></>
    //   )
    // }

  }
}

export default Dashboard;
