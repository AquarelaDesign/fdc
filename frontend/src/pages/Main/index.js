import React from 'react'

import Header from '../template/header'
//import SideBar from '../template/sideBar'
//import Footer from '../template/footer'

export default function Main() {

  return (
    <div className="container">
      <div className="content">
        <div className='wrapper'>
          <Header />
          <strong>Dashboard</strong>
        </div>
      </div>
    </div>
  )

  /*
  return (
    <div className='wrapper'>
      <Header />
      <SideBar />
      <div className='content-wrapper'>
        {props.children}
      </div>
      <Footer />
    </div>
  )
  */
}