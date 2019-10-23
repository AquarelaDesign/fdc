import React, { useEffect } from 'react'
import AdminLTE, {
  Sidebar, Navbar
} from 'adminlte-2-react'

import './styles.css'
import logo from '../../assets/logo.png'

import Footer from '../template/footer'
import Etiquetas from '../etiquetas'
import Tfcmon from '../tfcmon'


const { Item } = Sidebar
const { Entry, NotificationItem } = Navbar

export default function Main({ history }) {
  useEffect(() => {
    const token = localStorage.getItem('@fdc/token')

    if (token === null || token === '' || token === undefined) {
      history.push('/')
    }
  }, [])

  const notificationMenu = [
    {
      id: 1,
      icon: 'fas-users',
      iconColor: 'aqua',
      text: '5 new members joined today',
    },
    {
      id: 2,
      icon: 'fas-exclamation-triangle',
      iconColor: 'yellow',
      text: ' Very long description here that may not fit into the page and may cause design problems',
    },
    {
      id: 3,
      icon: 'fas-users',
      iconColor: 'red',
      text: '5 new members joined today',
    },
    {
      id: 4,
      icon: 'fas-shopping-cart',
      iconColor: 'green',
      text: '25 sales made',
    },
    {
      id: 5,
      icon: 'fas-user',
      iconColor: 'red',
      text: 'You changed your username',
    },
  ]

  function logoff(event) {
    event.preventDefault();
    localStorage.removeItem('@fdc/token')
    localStorage.removeItem('@fdc/oficina')
  }

  return (
    <AdminLTE
      title={['']}
      titleShort={['']}
      browserTitle="Siare Mobile - Procyon Systemas"
      theme="blue"
      footer={<Footer />}
    >

      <Navbar.Core className="navbar">
        <Entry
          icon="fas-bell"
          className="notifications-menu"
          labelType="warning"
        >
          {notificationMenu.map(p => <NotificationItem key={p.id} {...p} />)}
        </Entry>
        <Entry
          icon="fas-power-off"
          onClick={event => logoff(event)}
        />
      </Navbar.Core>

      <Sidebar.Core>
        <img id="logo" src={logo} alt="Ficha do Carro" />
        <Item icon="fas-flag" text="Passagens" to="/tfcpas" />
        <Item icon="fas-tags" text="Etiquetas" to="/etiquetas" active />
        <Item icon="fas-car" text="Veículos" to="/tfcvei" />
        <Item icon="fas-users" text="Usuários" to="/tfcusu" />
        <Item icon="fa-chart-pie" text="Indicadores" to="/tfcini" />
        <Item icon="far-copy" text="Mensagens" to="/tfcmsg" />
        <Item icon="fa-tachometer-alt" text="Monitor" to="/tfcmon" />

        <Item icon="fa-truck" text="Estoque">
          <Item icon="far-edit" text="Produtos" to="/tfcpec" />
          <Item icon="fa-list" text="Movimentação" to="/tfcest" />
        </Item>

        <Item text="Notas Fiscais" icon="fa-file-alt">
          <Item icon="fa-sign-in-alt" text="Entrada" to="/tfcnfe" />
          <Item icon="fa-window-close" text="Cancelar/Devolução" to="/tfcnfs" />
          <Item icon="fas-tasks" text="Monitor" to="/tfcnfm" />
        </Item>

      </Sidebar.Core>

      <Etiquetas path="/etiquetas" exact />
      <Tfcmon path="/tfcmon" exact />

    </AdminLTE>
  )
/*
  return (
    <div className="container">
      <div className="content">
        <div className='wrapper'>
          <Header />
          <Sidebar />
          <div className='content-wrapper'>
            {props.children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
*/
}
