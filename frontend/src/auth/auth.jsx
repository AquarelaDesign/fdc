import './auth.css'
import './login-soft.css'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, signup } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'
import Messages from '../common/msg/messages'
import Input from '../common/form/inputAuth'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            loginMode: true, 
            email: '',
            rememberMe: false 
        }
    }

    componentDidMount() {
        const rememberMe = localStorage.getItem('rememberMe') === 'true'
        const email = rememberMe ? localStorage.getItem('email') : ''
        
        //this.state.email = email
        //this.state.rememberMe = rememberMe

        this.setState({ email, rememberMe })
        console.log('auth.jsx componentDidMount', rememberMe, email, this.state)
    }
    
    onChange(event) {
        const input = event.target
        const value = input.type === 'checkbox' ? input.checked : input.value
        this.setState({ [input.name]: value })
        //console.log('auth.jsx onChange', this.state)
    }
     
    onSubmit(values) {
        const { login, signup } = this.props
        this.state.loginMode ? login(values) : signup(values)

        const { email, rememberMe } = this.state
        localStorage.setItem('rememberMe', rememberMe)
        localStorage.setItem('email', rememberMe ? values.email : '')
        //console.log('auth.jsx onSubmit values', values)
    }

    clickEsqueceuSenha() {

    }

    criaUsuario() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    //handleKeyUp(event) {
    //    if (event.keyCode == 13) {
    //        return this.onSubmit(event)
    //    }
    //}
    // onKeyUp={v => {this.handleKeyUp(v)}}

    //handleFormSubmit() {
    //    const { email, rememberMe } = this.state
    //    localStorage.setItem('rememberMe', rememberMe)
    //    localStorage.setItem('email', rememberMe ? email : '')
    //}

    render() {
        const { loginMode, email, rememberMe } = this.state
        const { handleSubmit } = this.props
        return (
            <div className="login-box">
                <div className="logo">
                    <img className="logo-procyon center" />
                </div>
                <div className="login-box-body login-form">
                    <form className="frm" 
                        onSubmit={handleSubmit(v => this.onSubmit(v))} >
                        
                        <h4 className="form-title ftcolor">Informe os dadas de acesso</h4>
                        <br />
                        <Field component={Input} type="input" name="name"
                            placeholder="Nome" icon='user' hide={loginMode} />

                        <Field component={Input} type="email" name="email"
                            placeholder="E-mail" icon="envelope" 
                            value={email}
                            onChange={e => {this.onChange(e)}} />

                        <Field component={Input} type="password" name="senha"
                            placeholder="Senha" icon='lock' />

                        <Field component={Input} type="password" name="senha2"
                            placeholder="Confirmar Senha" icon='lock' hide={loginMode} />
                        
                        <Row>
                            <Grid cols="12">
                                <input type="checkbox" name="rememberMe" 
                                    checked={rememberMe}
                                    onChange={e => {this.onChange(e)}} /> 
                                <span className="ftcolor"> Lembrar dados de acesso</span>
                            </Grid>
                        </Row>
                        
                        <Row>
                            <Grid cols="12">
                                <button type="submit"
                                    className="btn btn-info btn-block">
                                    {loginMode ? 'Acessar' : 'Registrar'}
                                </button>
                            </Grid>
                        </Row>
                    </form>
                </div>
                <div id="troca-senha">
                    <a className="cLnk"
                        onClick={() => this.clickEsqueceuSenha()}>
                        <span className={`fa fa-envelope`}></span>
                        &nbsp;Esqueceu a Senha?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a className="cLnk"
                        onClick={() => this.criaUsuario()}>
                        <span className={`fa fa-key`}></span>
                        &nbsp;{loginMode ? 'Criar Conta' : 'Acessar'}</a>
                </div>
                <Messages />
            </div>
        )
    }
}

Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)