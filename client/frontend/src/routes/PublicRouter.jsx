import { useAuthContext } from "../context/AuthContext"

import{Navigate,Outlet} from 'react-router-dom'

export const PublicRouter = () => {

    const {Authenticated} = useAuthContext()



    if(Authenticated){
        return <Navigate to={"/private/dashboard"}/>
    }
            return(<div><Outlet/></div>)
    
  
}
