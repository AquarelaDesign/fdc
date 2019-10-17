import React, { useState, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'

import api from '../../services/api'

//import './styles.css'

export default function Login({ history }) {
   const [email, setEmail] = useState('')
   const [senha, setSenha] = useState('')
   const [rememberMe, setRememberMe] = useState(false)

   const { addToast } = useToasts()

   useEffect(() => {
      const token = localStorage.getItem('@fdc/token')
      const email = localStorage.getItem('@fdc/email')
      setRememberMe(localStorage.getItem('@fdc/rememberMe'))
      
      async function validateToken() {
         const response = await api.post('/oapi/validateToken', {
            "email": email,
            "token": token
         })
         
         if (response.data.valid) {
            //navigation.navigate('MainMenu')
         } 
      }
      
      validateToken()
   }, [])

   async function handleSubmit(event) {
      event.preventDefault();
     
      try {
         const response = await api.post('/oapi/login', { 
            email, senha 
         })

         const { oficina, token } = response.data
         
         console.table(oficina)

         localStorage.setItem('@fdc/email', email)
         localStorage.setItem('@fdc/token', token)
         localStorage.setItem('@fdc/rememberMe', rememberMe)

         history.push('/dashboard')
      }
      catch(error) {
         const { response } = error
         if ( response !== undefined ) {
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
               <a className="cLnk"
                           onClick={() => this.clickEsqueceuSenha()}>
                           &nbsp;Esqueceu a Senha?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
               <a className="cLnk"
                           onClick={() => this.criaUsuario()}>
                           &nbsp;Criar Conta</a>
         </div>
      </form>
   )
}