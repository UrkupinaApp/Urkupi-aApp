import { useAuthContext } from '../context/AuthContext'
import{Navigate,Outlet} from 'react-router-dom'

export const PrivateRouter = () => {

    const {Authenticated} = useAuthContext()

    

    if(!Authenticated){
        return <Navigate to={"/"}/>
    }
            return(<div><Outlet/></div>)
    
  
}
