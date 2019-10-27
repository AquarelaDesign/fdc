import React, { Component, Suspense } from 'react'
import {
  Button,
  Card,
  CardBody,
  Col,
  Progress,
  Row,
} from 'reactstrap'
import * as moment from 'moment'
import 'moment/locale/pt-br'

import { Etiquetas, IndicadorBarra } from '../../components'

import api from '../../services/api'

moment.locale('pt-BR')
// Últimos 30 dias
// const dataInicial = moment().subtract(30, 'days').format('L');
// const dataFinal   = moment().format('L');

// Período do Mês
const dataInicial = moment().startOf('month').format('L');
const dataFinal   = moment().endOf('month').format('L');

const email = localStorage.getItem('@fdc/email')
const oficina = JSON.parse(localStorage.getItem('@fdc/oficina'))

const Icones = {
  CT: "fa fa-credit-card",
  BO: "fa fa-barcode",
  OU: "fa fa-usd",
  DI: "fa fa-money",
  TR: "fa fa-exchange",
  DE: "fa fa-handshake-o",
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      ttresetq: [{
        qtetqn: 0, qtetqp: 0, qtetqtot: 0, qtetqv: 0, qtperd: 0, qtreal: 0
      }],
      ttfccpvl: [],
      ttpagto: [],
      ttpec: [],
      ttresumo: [],
      ttretorno: [],
      ttserv: [],
    }
  }

  componentDidMount() {
    const dados = this.buscaEtqs()
    dados.then(valor => {
      this.setState({ ttresetq: valor })
    })

    const passagens = this.buscaPas()
    passagens.then(data => {
      const { ttfccpvl, ttpagto, ttpec, ttresumo, ttretorno, ttserv, } = data
      this.setState({ ttfccpvl, ttpagto, ttpec, ttresumo, ttretorno, ttserv })
    })
  }

  async buscaEtqs() {
    const response = await api.post('/v01/busca', {
      pservico: 'wfcpas',
      pmetodo: 'ResumoEtiquetas',
      pcodprg: 'TFCINI',
      pemail: email,
      params: {
        widtrans: `${oficina.codemp}|1|1|${email}`,
        wip: '192.168.50.138',
        wseqaba: 0
      }
    })

    if (response.data) {
      console.log('response.status', response.status)
      if (response.status === 200) {
        return response.data.data.ttresetq
      } else {
        console.log('Consultando Etq')
        return this.buscaEtqs()
      }
    } else {
      return response.data.errors
    }
  }

  async buscaPas() {
    const response = await api.post('/v01/busca', {
      pservico: 'wfcpas',
      pmetodo: 'ListaPassagens',
      pcodprg: 'TFCMON',
      pemail: email,
      params: {
        pdatini: dataInicial,
        pdatfim: dataFinal,
        psituac: 'TOD',
        widtrans: `${oficina.codemp}|1|1|${email}`,
        wip: '192.168.50.138',
        wseqaba: 0
      }
    })

    if (response.data) {
      console.log('response.status', response.status)
      if (response.status === 200) {
        return response.data.data
      } else {
        console.log('Consultando Pas')
        return this.buscaPas()
      }
    } else {
      return response.data.errors
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    })
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

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

  render() {
    const { ttresetq, ttresumo, ttpagto } = this.state
    const Resetq = ttresetq[0]
    const Resumo = ttresumo[0]

    console.log('Resumo', Resumo)
    // console.log('mainChart', mainChart)
    // console.log('mainChartOpts', mainChartOpts)

    return (
      <div className="animated fadeIn">
        {/* Etiquetas */}
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

        <Row>
          <Col>
            <Card>
              {/* <CardHeader>Indicadores</CardHeader> */}
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
                        &nbsp;
                        {Resumo !== undefined ?
                          this.retValor(Resumo.vlpec, 'currency') : 'R$ 0,00'}
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
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="callout callout-Light">
                      <div className="h5">Serviços</div>
                      <strong className="h6">
                        {Resumo !== undefined ?
                          this.calcTot(Resumo.qtdtot,Resumo.perserv,0) : '0'}
                      </strong>
                      &nbsp;Passagens
                      <strong>
                        &nbsp;
                        {Resumo !== undefined ?
                          this.retValor(Resumo.vlserv, 'currency') : 'R$ 0,00'}
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
                        &nbsp;
                        {Resumo !== undefined ?
                          this.retValor(Resumo.vltotal, 'currency') : 'R$ 0,00'}
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
                </Row>

                <hr className="mt-0" />
                <ul>

                  {ttpagto.map(pagto => (
                    <IndicadorBarra
                      key={pagto.tippag}
                      icon={Icones[pagto.tippag]}
                      title={pagto.despag}
                      value={pagto.valor.toString()}
                      percent={pagto.perc.toString()}
                    />
                  ))}

                  <div className="divider text-center">
                    <Button
                      color="link"
                      size="sm"
                      className="text-muted"
                      data-toggle="tooltip"
                      data-placement="top"
                      title=""
                      data-original-title="show more">
                      <i className="icon-options"></i>
                    </Button>
                  </div>
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
