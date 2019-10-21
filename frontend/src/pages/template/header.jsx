import React from 'react'
import Navbar from './Navbar'

export default function Header(props) {
  return (
    <header className='main-header'>
      <a href='/#' className='logo'>
        <img className="logo-header" alt="" />
      </a>
      <nav className='navbar navbar-static-top'>
        <a href='/#' className='sidebar-toggle' data-toggle='offcanvas'></a>
        <Navbar />
      </nav>
    </header>
  )
}