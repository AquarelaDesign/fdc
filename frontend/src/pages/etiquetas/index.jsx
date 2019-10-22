/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import {
  Content, Row, Col, Infobox2
} from 'adminlte-2-react';

import api from '../../services/api'

import './styles.css'

const token = localStorage.getItem('@fdc/token')
const email = localStorage.getItem('@fdc/email')
const oficina = JSON.parse(localStorage.getItem('@fdc/oficina'))

if (token === null) {
  localStorage.setItem('@fdc/token', '')
  window.location.href = '/'
}

class Etiquetas extends Component {
  ttresetq = {}

  componentWillMount() {
    async function buscaEtqs() {
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
        this.setState(this.ttresetq, response.data.ttresetq)
      }
    }

    buscaEtqs()
  }

  render() {
    const {
      qtetqn, qtetqp, qtetqtot, qtetqv, qtperd, qtreal
    } = this.ttresetq

    console.log(this.ttresetq)
    console.log(qtetqn, qtetqp, qtetqtot, qtetqv, qtperd, qtreal)

    return (
      <Content title="Etiquetas">
        <Row>
          <Col xs={12} sm={4} md={2}>
            <Infobox2
              icon="fas-tags"
              color="gray"
              title={qtetqtot}
              text="Alertas"
              footerText="Detalhes "
            />
          </Col>
          <Col xs={12} sm={4} md={2}>
            <Infobox2
              icon="far-check-square"
              color="green"
              title={qtetqn}
              text="Normais"
              footerText="Detalhes "
            />
          </Col>
          <Col xs={12} sm={4} md={2}>
            <Infobox2
              icon="fas-exclamation-triangle"
              color="yellow"
              title={qtetqp}
              text="Próximas"
              footerText="Detalhes "
            />
          </Col>
          <Col xs={12} sm={4} md={2}>
            <Infobox2
              icon="fa-times"
              color="red"
              title={qtetqv}
              text="Vencidas"
              footerText="Detalhes "
            />
          </Col>
          <Col xs={12} sm={4} md={2}>
            <Infobox2
              icon="fas-thumbs-up"
              color="blue"
              title={qtreal}
              text="Efetuadas"
              footerText="Detalhes "
            />
          </Col>
          <Col xs={12} sm={4} md={2}>
            <Infobox2
              icon="fas-thumbs-down"
              color="navy"
              title={qtperd}
              text="Perdidas"
              footerText="Detalhes "
            />
          </Col>
        </Row>
      </Content>
    );
  }
}

export default Etiquetas;
