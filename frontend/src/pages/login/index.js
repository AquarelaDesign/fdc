import React, { Component } from 'react';
import { 
  Container, 
  Form, 
  Input, 
} from 'reactstrap';

import api from '../../services/api'
import logo from '../../assets/logo.png'
import './styles.css'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { 
        email: '',
        senha: '',
        rememberMe: false 
    }
  }

  componentDidMount() {
    const email = localStorage.getItem('@fdc/email')
    const remember = localStorage.getItem('@fdc/rememberMe')
    
    this.setState({ rememberMe: remember === 'true' })
    
    if (this.state.rememberMe) {
      this.setState({ email })
    }
  }

  async clickEsqueceuSenha() {
    console.log('clickEsqueceuSenha')
  }

  async criaUsuario() {
    console.log('criaUsuario')
  }

  onChange(event) {
    const input = event.target
    const value = input.type === 'checkbox' ? input.checked : input.value

    console.log('input', input.id, value)

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
        // addToast(response.data.errors[0], { appearance: 'error', autoDismiss: true })
        console.log(response.data.errors[0])
      } else {
        // addToast(error, { appearance: 'error', autoDismiss: true })
        console.log('error', error)
      }
    }
  }

  render() {
    // const { email, rememberMe } = this.state
    // const { handleSubmit } = this.props
    
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
                  type="text"
                  value={this.state.email}
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

                <label className="ckbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={this.state.rememberMe}
                    onChange={e => {this.onChange(e)}}
                  />
                  &nbsp;Lembrar dados de acesso
                </label>

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
