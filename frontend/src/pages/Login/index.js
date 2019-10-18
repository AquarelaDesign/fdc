import React, { useState, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'

import api from '../../services/api'

import logo from '../../assets/logo.png'

import './styles.css'

export default function Login({ history }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const { addToast } = useToasts()

  useEffect(() => {
    const token = localStorage.getItem('@fdc/token')
    const email = localStorage.getItem('@fdc/email')
    const remember = localStorage.getItem('@fdc/rememberMe')

    //let bol = remember == "true" ? true : false

    setRememberMe(remember === "true" ? true : false)

    if (remember === "true") {
      setEmail(email)
    }

    //console.log(remember, bol, rememberMe, email)

    async function validateToken() {
      const response = await api.post('/oapi/validateToken', {
        "email": email,
        "token": token
      })

      if (response.data.valid) {
        //history.push('/main')
      }
    }

    validateToken()
  }, [email])

  async function clickEsqueceuSenha(event) {

  }

  async function criaUsuario(event) {

  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/oapi/login', {
        email, senha
      })

      const { oficina, token } = response.data

      localStorage.setItem('@fdc/email', email)
      localStorage.setItem('@fdc/token', token)
      localStorage.setItem('@fdc/oficina', JSON.stringify(oficina))
      localStorage.setItem('@fdc/rememberMe', rememberMe)

      history.push('/main')
    }
    catch (error) {
      const { response } = error
      if (response !== undefined) {
        //Alert.alert(response.data.errors[0])
        addToast(response.data.errors[0], {
          appearance: 'error',
          autoDismiss: true
        })
      } else {
        //Alert.alert(response.data.errors[0])
        console.log('Erro: ', error)
      }
    }
  }

  return (
    <div className="container">
      <img id="logo" src={logo} alt="Ficha do Carro" />
      <div className="content">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <label className="form-title">Informe os dadas de acesso</label>
            <input
              className="login"
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <input
              className="login"
              id="senha"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={event => setSenha(event.target.value)}
            />

            <label className="ckbox">
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={event => setRememberMe(event.target.checked)} />
              &nbsp;Lembrar dados de acesso
                  </label>

            <button className="btn1" type="submit">Acessar</button>

            <div id="loginRodape">
              <button className="btnRLogin"
                onClick={clickEsqueceuSenha}>
                <FontAwesomeIcon icon={faEnvelope} size="1x" />
                &nbsp;Esqueceu a Senha?</button>
              <button className="btnRLogin"
                onClick={criaUsuario}>
                <FontAwesomeIcon icon={faKey} size="1x" />
                &nbsp;Criar Conta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}