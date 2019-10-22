import React, { useState, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'

import {
  Button,
} from 'adminlte-2-react';

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

    setRememberMe(remember === 'true')

    if (remember === 'true') {
      setEmail(email)
    }

    async function validateToken() {
      const response = await api.post('/oapi/validateToken', {
        email, token
      })

      if (response.data.valid) {
        history.push('/main')
      }
    }

    validateToken()
  }, [email])

  async function clickEsqueceuSenha() {
    console.log('clickEsqueceuSenha')
  }

  async function criaUsuario() {
    console.log('criaUsuario')
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
    } catch (error) {
      const { response } = error
      if (response !== undefined) {
        addToast(response.data.errors[0], {
          appearance: 'error',
          autoDismiss: true
        })
      } else {
        addToast(error, {
          appearance: 'error',
          autoDismiss: true
        })
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
                onChange={event => setRememberMe(event.target.checked)}
              />
              &nbsp;Lembrar dados de acesso
            </label>

            <button className="btn1" type="submit">Acessar</button>

            <div className="loginRodape">
              <Button
                className="btnRLogin"
                icon="fa-envelope"
                text="Esqueceu a Senha?"
                onClick={clickEsqueceuSenha}
              />
              <Button
                className="btnRLogin"
                icon="fa-key"
                text="Criar Conta"
                onClick={criaUsuario}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
