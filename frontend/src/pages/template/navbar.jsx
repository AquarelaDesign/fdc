import React, { useState } from 'react'

export default function Navbar(props) {
  const [open, setOpen] = useState(true)

  function changeOpen() {
    setOpen(!open)
  }

  function parametrosOficina() {

  }

  function telaCheia() {

  }

  let oficina = {}

  oficina.nome = ""
  oficina.e_mail = ""

  // eslint-disable-next-line no-console
  return (
    <div className="navbar-custom-menu">
      <ul className="nav navbar-nav">
        <li 
          onMouseLeave={changeOpen}
          className={`dropdown user user-menu ${open ? 'open' : ''}`}>

          <a href="/#" 
            onClick={changeOpen}
            className="dropdown-toggle"
            data-toggle="dropdown">
            <img src="http://lorempixel.com/160/160/abstract"
              className="user-image" alt="" />
            <span className="hidden-xs">{oficina.nome}</span>
          </a>

          <ul className="dropdown-menu">
            <li className="user-header">
              <img src="http://lorempixel.com/160/160/abstract"
                className="img-circle-sm" alt="" />
              <p>
                <small>
                  {oficina.nome}<br />
                  {oficina.e_mail}<br />
                </small>
              </p>
            </li>
            <li className="user-body">
              <a href="/#" onClick={parametrosOficina}>
                <span className={`fa fa-gear`}></span>
                &nbsp;Parâmetros da Oficina
              </a>
              <a href="/#" onClick={telaCheia}>
                <span className={`fa fa-arrows`}></span>
                &nbsp;Tela Cheia
              </a>
            </li>
            <li className="user-footer">
              <div className="pull-right">
                <a href="/#" onClick={() => { }}
                  className="btn btn-default btn-flat">Sair</a>
              </div>
            </li>
          </ul>

        </li>
      </ul>
    </div>
  )
}
