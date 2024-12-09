import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import UrkuLogo from '../assets/icon.png';

import { Layout, Menu, Button } from 'antd';
import { 
  UserOutlined, 
  PoweroffOutlined, 
  DashboardOutlined, 
  FileDoneOutlined, 
  SettingOutlined, 
  BarChartOutlined, 
  AppstoreOutlined // Icono para Pool
} from '@ant-design/icons';
import Clock from '../components/Clock';

import { Logo } from './Logo';

const { Sider, Content, Header } = Layout;

export const MiLayout = ({ children }) => {
  const Navigate = useNavigate();
  const Location = useLocation();
  const [collap, setCollap] = useState();
  const { Logout } = useAuthContext();

  const HandleCollapse = () => {
    setCollap(!collap);
  };

  const HandleNavigate = (key) => {
    Navigate("/private/" + key);
  };

  return (
    <Layout style={{ background: "transparent", justifyContent: "center" }}>
      <Sider 
        onClick={HandleCollapse} 
        style={{ height: "100vh", backgroundColor: "rgba(82, 114, 242,0.1)", backdropFilter: "blur(2px)" }} 
        collapsed={collap} 
        collapsible
      >
        <Logo />

        <Menu 
          mode='inline' 
          style={{ background: "transparent", fontSize: "19px", color: "white" }} 
          items={[
            { label: "Dashboard", key: "dashboard", icon: <DashboardOutlined /> },
            { label: "Sistemas", key: "pool", icon: <AppstoreOutlined /> }, // Nueva pestaña
            { label: "Clientes", key: "clientes", icon: <UserOutlined /> },
            { label: "Tickets", key: "tickets", icon: <FileDoneOutlined /> },
            { label: "Analytics", key: "analytics", icon: <BarChartOutlined /> },
            { label: "Settings", key: "settings", icon: <SettingOutlined /> },
          ]} 
          onClick={({ key }) => HandleNavigate(key)}
        />
      </Sider>

      <Content style={{ width: "100%", height: "100vh", backgroundColor: "transparent", display: "flex", flexDirection: "column" }}>
        <Header 
          style={{ width: "100%", backgroundColor: "rgba(38, 53, 138,0.1)", backdropFilter: "blur(10px)", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}
        >
          <div style={{ width: "3%" }}>
            <img src={UrkuLogo} style={{ width: "40px", height: "40px", marginTop: "17px" }} />
          </div>
          <div style={{ width: "60%", textAlign: "center", fontSize: "23px" }}>
            <h3></h3>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "240px" }}>
            <Clock />
            <Button 
              primary 
              style={{ width: "50px", height: "40px", borderRadius: "10px", marginLeft: "20px", fontSize: "14px", fontWeight: "600", color: "white", backgroundColor: "rgba(200, 29, 37,0.8)", border: "1px solid black" }} 
              onClick={Logout}
            >
              <PoweroffOutlined />
            </Button>
          </div>
        </Header>
        {children}
      </Content>
    </Layout>
  );
};
