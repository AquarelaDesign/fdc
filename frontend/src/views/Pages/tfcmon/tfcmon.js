import React, { Component } from 'react'

import { 
  Button, Label, Tooltip,
  Card, CardHeader, CardBody, CardFooter,
  Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
  Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap'

import { 
  MDBDatePicker as DatePicker,
  MDBDataTable 
} from 'mdbreact'

// import './styles.css'
import { getEmail, dataInicial, dataFinal } from '../../../globais'

const email = getEmail()

class tfcmon extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      tooltipOpen: [false, false],
      dataInicial: dataInicial,
      dataFinal: dataFinal,
    }
  }

  lorem() {
    return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
  }

  toggleTT(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return (index === i ? !element : false);
    })
    this.setState({
      tooltipOpen: newArray,
    })
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    })
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
          {`1. ${this.lorem()}`}
        </TabPane>
        <TabPane tabId="2">
          {`2. ${this.lorem()}`}
        </TabPane>
      </>
    )
  }

  render() {
    const {dataInicial, dataFinal} = this.state

    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Row>
              <Col xs="12">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '1'}
                      onClick={() => { this.toggle(0, '1'); }}
                    >
                      Passagens
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={this.state.activeTab[0] === '2'}
                      onClick={() => { this.toggle(0, '2'); }}
                    >
                      Resumo
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab[0]} className="p-3">
                  <TabPane tabId="1">
                    <Row>
                      {/* Data Inicial */}
                      <Col xs="2">
                        <FormGroup>
                          <Label htmlFor="parMon-datini">Data Inicial</Label>
                          <Input 
                            type="date" 
                            id="parMon-datini" 
                            placeholder="Data Inicial" 
                            text={dataInicial}
                          />
                          <Tooltip 
                            placement="right" 
                            isOpen={this.state.tooltipOpen[0]} 
                            target="parMon-datini" 
                            toggle={() => {this.toggleTT(0)}}>
                            Informe a data inicial para consulta
                          </Tooltip>
                        </FormGroup>
                      </Col>
                    
                      {/* Data Final */}
                      <Col xs="2">
                        <FormGroup>
                          <Label htmlFor="parMon-datfim">Data Final</Label>
                          <Input 
                            type="date" 
                            id="parMon-datfim" 
                            placeholder="Data Final" 
                          />
                          <Tooltip 
                            placement="right" 
                            isOpen={this.state.tooltipOpen[1]} 
                            target="parMon-datfim" 
                            toggle={() => {this.toggleTT(1)}}>
                            Informe a data final para consulta
                          </Tooltip>
                        </FormGroup>
                      </Col>
                    
                      {/* Situação */}
                      <Col xs="3">
                        <FormGroup>
                          <Label htmlFor="parMon-situac">Situação</Label>
                          <Input type="select" id="parMon-situac" placeholder="Selecione situação">
                            <option value="TOD">Todas</option>
                            <option value="PAS">Passagens</option>
                            <option value="ORC">Orçamentos</option>
                            <option value="CAN">Canceladas</option>
                          </Input>
                          <Tooltip 
                            placement="right" 
                            isOpen={this.state.tooltipOpen[2]} 
                            target="parMon-situac" 
                            toggle={() => {this.toggleTT(2)}}>
                            Informe a data final para consulta
                          </Tooltip>
                        </FormGroup>
                      </Col>

                      <Col xs="2" className="Aligner-center">
                        <Button type="submit" id="submit" size="sm" color="primary" block>
                          <i className="fa fa-dot-circle-o"></i> Consulta</Button>
                      </Col>

                    </Row>
                    <Row>
                      {`1. ${this.lorem()}`}
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    {`2. ${this.lorem()}`}
                  </TabPane>

                </TabContent>
                {/* 
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
                */}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
      
      /* 
      <Card>
        <CardHeader>
          <Row>

          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="text" placeholder="Username" autoComplete="username" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input type="text" placeholder="Email" autoComplete="email" />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" placeholder="Password" autoComplete="new-password" />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input type="password" placeholder="Repeat password" autoComplete="new-password" />
            </InputGroup>
            <Button color="success" block>Create Account</Button>
          </Form>
        </CardBody>
        <CardFooter>
          <Row>
            <Col xs="12" sm="6">
              <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
            </Col>
            <Col xs="12" sm="6">
              <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
      */
    )
  }
}

export default tfcmon
