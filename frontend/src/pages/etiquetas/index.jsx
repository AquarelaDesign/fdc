import React, { useState, useEffect } from 'react'
import {
  Content, Row, Col, Infobox2
} from 'adminlte-2-react';

import api from '../../services/api'

import './styles.css'

export default function Etiquetas({ history }) {
  const [resetq, setResetq] = useState({
    qtetqn: 0, qtetqp: 0, qtetqtot: 0, qtetqv: 0, qtperd: 0, qtreal: 0
  })

  const {
    qtetqn, qtetqp, qtetqtot, qtetqv, qtperd, qtreal
  } = resetq

  useEffect(() => {
    const token = localStorage.getItem('@fdc/token')
    const email = localStorage.getItem('@fdc/email')
    const oficina = JSON.parse(localStorage.getItem('@fdc/oficina'))

    if (token === undefined || token === '') {
      history.push('/')
    }

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
        setResetq(response.data.data.ttresetq[0])
      }
    }

    buscaEtqs()
  }, [])

  return (
    <Content title="Etiquetas de Revisão">
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
  )
}
