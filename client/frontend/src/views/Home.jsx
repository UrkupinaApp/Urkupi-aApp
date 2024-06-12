
import { Link } from 'react-router-dom'
import { Container } from '../components/Container'
import { Card,Button } from 'antd';
import urkupinaLogo from '../assets/logo_64.png';

export const Home = () => {
    
  return (
    <div>
        <Container>
        <img style={{ widht: "60px", height: "60px", marginBottom: "22px" }} src={urkupinaLogo} alt="urkupinalogo.png" />

        
        <h2 style={{fontSize:"16px",marginBottom:"15px"}}>Sistema de Gestion</h2>
        <Link style={{width:"90px",textDecoration:"none",color:"white",fontSize:"20px",padding:"10px",textAlign:"center" ,backgroundColor:"#507dbc",borderRadius:"10px"}} to="/login">Login</Link>
      
  
          
        
      

        </Container>
        </div>

  )
}
