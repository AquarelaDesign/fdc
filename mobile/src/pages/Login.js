import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, KeyboardAvoidingView, Alert, Image, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'

//import Alerta from '../components/Alerta'
import api from '../services/api'

import logo from '../assets/logo.png'
import bg from '../assets/splash.png'

// No Motorola G7 Plus foi necessário habilitar (Android 9)
// enabled={Platform.OS === 'ios'} 

export default function Login({ navigation }) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   //const [showAlert, setShowAlert] = useState([false])

   useEffect(() => {
      AsyncStorage.getItem('token').then(token => {
         async function validateToken() {
            const response = await api.post('/oapi/validateToken', {
               "email": email,
               "token": token
            })
            
            if (token) {
               navigation.navigate('MainMenu')
            } 
         }
         
         validateToken()
      })
   }, [])

   async function handleSubmit() {
      
      try {
         const response = await api.post('/oapi/login', {
            "email": email,
            "senha": password
         })

         const { oficina, token } = response.data

         await AsyncStorage.setItem('oficina', JSON.stringify(oficina))
         await AsyncStorage.setItem('token', token)

         //console.log('oficina', oficina, token)

         navigation.navigate('MainMenu')
      }
      catch(error) {
         const { response } = error
         if ( response !== undefined ) {
            Alert.alert(response.data.errors[0])
         } else {
            //Alert.alert(response.data.errors[0])
            console.log('Erro:', error)
         }
      }

   }
   
   return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
         <ImageBackground
            style={styles.background}
            source={bg}
         >
            <Image source={logo} />

            <View style={styles.form}>
               <Text style={styles.label}>Endereço e-mail</Text>
               <TextInput 
                  style={styles.input}
                  placeholder="Seu endereço de e-mail"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
               />

               <Text style={styles.label}>Senha</Text>
               <TextInput 
                  style={styles.input}
                  placeholder="Sua senha"
                  placeholderTextColor="#999"
                  autoCorrect={false}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
               />
               
               <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Iniciar sessão</Text>
               </TouchableOpacity>
            </View>
         </ImageBackground>
      </KeyboardAvoidingView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

   background: {
      flex: 1,
      width: '100%', 
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
   },

   form: {
      alignSelf: 'stretch',
      paddingHorizontal: 30,
      marginTop: 30,
   },

   label: {
      fontWeight: 'bold',
      justifyContent: 'center',
      marginBottom: 8,
   },

   input: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 44,
      marginBottom: 20,
      borderRadius: 2,
   },

   button: {
      height: 42,
      backgroundColor: '#007189',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
   },

   buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16,
   },
})