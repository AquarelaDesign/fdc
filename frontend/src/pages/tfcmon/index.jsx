import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import {
  Content, Row, Col, Tabs, TabContent, Inputs, Button,
} from 'adminlte-2-react';

// import api from '../../services/api'

import './styles.css'

const {
  Text, Date, DateRange, ICheck, Select2, DateTime,
} = Inputs

export default function Tfcmon({ history }) {
  const [situac, setSituac] = useState('TOD')
  /*
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
 */

  function getInfoTitle(label, infotext) {
    return (
      <React.Fragment>
        {`${label}  `}
        <FontAwesomeIcon
          onClick={() => { alert(infotext) }}
          style={{ cursor: 'pointer' }} 
          icon={['fas', 'info-circle']}
        />
      </React.Fragment>
    );
  }

  return (
    <Content title="Monitor">
      <Row>
        <Col xs={12}>
          <Tabs defaultActiveKey="tab_1">
            <TabContent title="Passagens" eventKey="tab_1">
              <Row>
                <Col md={2}>
                  <DateTime
                    label="Data Inicial"
                    labelPosition="above"
                    iconLeft="fas-calendar"
                    format="DD/MM/YYYY"
                    inputIconPosition="before"
                    value={moment()}
                  />
                </Col>
                <Col md={2}>
                  <DateTime
                    label="Data Final"
                    labelPosition="above"
                    iconLeft="fas-calendar"
                    format="DD/MM/YYYY"
                    inputIconPosition="before"
                    value={moment()}
                  />
                </Col>
                <Col md={3}>
                  <Select2
                    labelPosition="above"
                    label="Situação"
                    defaultValue="TOD"
                    onChange={(event) => {
                      const { params: { data } } = event
                      console.log('selectedSelect2Value', data)
                      setSituac({ selectedSelect2Value: data })
                    }}
                    options={[
                      { value: 'TOD', label: 'Todas' },
                      { value: 'PAS', label: 'Passagens' },
                      { value: 'ORC', label: 'Orçamentos' },
                      { value: 'CAN', label: 'Canceladas' },
                    ]}
                  />
                </Col>
                <Col md={2}>
                  <br />
                  <Button block type="default" text="Consulta" />
                </Col>
                <Col md={3}>
                  &nbsp;
                </Col>
              </Row>
            </TabContent>
            <TabContent title="Resumo" eventKey="tab_2">
              <Row>
                <Col md={2}>
                  &nbsp;
                </Col>
                <Col md={2}>
                  &nbsp;
                </Col>
                <Col md={2}>
                  &nbsp;
                </Col>
                <Col md={2}>
                  &nbsp;
                </Col>
                <Col md={1}>
                  &nbsp;
                </Col>
                <Col md={2}>
                  &nbsp;
                </Col>
                <Col md={1}>
                  &nbsp;
                </Col>
              </Row>
              <b>Orçamento/Passagens</b>
            </TabContent>
          </Tabs>
        </Col>
      </Row>
    </Content>
  )
}
