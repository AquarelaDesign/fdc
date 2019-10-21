import React from 'react'
import Menu from './Menu'

export default function SideBar(props) {
  return (
    <aside className='main-sidebar'>
      <section className='sidebar'>
        <Menu />
      </section>
    </aside>
  )
}