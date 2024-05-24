import React from 'react'
import { Layout } from 'antd';

// assets
import LogoTrello from '../assets/logo-trello.png';

const { Header } = Layout;

function HeaderComponent() {
  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1677ff', height: 40 }}>
      <div className="demo-logo" />
      <img src={LogoTrello} alt="Trello app" height="30px" />
    </Header>
  )
}

export default HeaderComponent