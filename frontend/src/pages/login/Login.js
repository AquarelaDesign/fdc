import React, { Component } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap'

import api from '../../services/api'
import logo from '../../assets/logo.png'
import './styles.css'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
        email: '',
        senha: '',
        texto: '',
        show: false,
        rememberMe: false
    }
  }

  componentDidMount() {
    const email = localStorage.getItem('@fdc/email')
    const remember = localStorage.getItem('@fdc/rememberMe')

    if (remember === 'true') {
      this.setState({ email: email, rememberMe: true })
    } else {
      this.setState({ rememberMe: false })
    }
  }

  clickEsqueceuSenha() {
    console.log('clickEsqueceuSenha')
  }

  criaUsuario() {
    console.log('criaUsuario')
  }

  setShow() {
    try {
      this.setState({ texto: "" })
      this.setState({ show: false })
    } catch (error) {
      console.log(error)
    }
  }

  async onChange(event) {
    const input = event.target
    const value = input.type === 'checkbox' ? input.checked : input.value

    console.log('onChange', input.type, input.checked, value, input)

    this.setState({ [input.id]: value })
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post('/oapi/login', {
        email: this.state.email,
        senha: this.state.senha
      })
      .then(res => {
        const { oficina, token } = res.data

        localStorage.setItem('@fdc/email', this.state.email)
        localStorage.setItem('@fdc/token', token)
        localStorage.setItem('@fdc/oficina', JSON.stringify(oficina))
        localStorage.setItem('@fdc/rememberMe', this.state.rememberMe)

        this.props.history.push('/home')
      })

    } catch (error) {
      const { response } = error
      if (response !== undefined) {
        //useToasts.add(response.data.errors[0], { appearance: 'error', autoDismiss: true })
        // console.log(response.data.errors[0])
        toast(response.data.errors[0], {type: 'error'})
      } else {
        this.setState({
          texto: error,
          show: true
        })
        //useToasts.add(error, { appearance: 'error', autoDismiss: true })
        // console.log('error', error)
        toast(error, {type: 'error'})
      }
    }
  }

  render() {
    const { email, rememberMe } = this.state

    console.log(rememberMe)

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <img id="logo" src={logo} alt="Ficha do Carro" />
          <div className="content">
            <div className="login">
              <Form onSubmit={e => {this.handleSubmit(e)}}>
                <label className="form-title">Informe os dados de acesso</label>
                <Input
                  className="login"
                  id="email"
                  type="email"
                  value={email}
                  placeholder="E-mail"
                  onChange={e => {this.onChange(e)}}
                />

                <Input
                  className="login"
                  id="senha"
                  type="password"
                  placeholder="Senha"
                  autoComplete="current-password"
                  onChange={e => {this.onChange(e)}}
                />

                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    value={rememberMe}
                    onChange={e => {this.onChange(e)}}
                  />
                  <Label
                    check
                    className="form-check-label"
                    htmlFor="rememberMe">
                    Lembrar dados de acesso
                  </Label>
                </FormGroup>

                <button className="btn1" type="submit">Acessar</button>

                <div className="loginRodape">
                  <button
                    className="btnRLogin"
                    type="button"
                    onClick={this.clickEsqueceuSenha}
                  ><i className="fa fa-envelope-o"> Esqueceu a Senha?</i></button>
                  <button
                    className="btnRLogin"
                    type="button"
                    icon="fa-key"
                    onClick={this.criaUsuario}
                  ><i className="fa fa-key"> Criar Conta</i></button>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

export default Login
