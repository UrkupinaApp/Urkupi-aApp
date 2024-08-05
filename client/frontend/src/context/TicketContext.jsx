import axios  from "axios"

import { useState,useEffect,createContext, useContext } from "react"



export const TicketContext = createContext()





export const TicketProvider =({children})=>{
    
    
    const getInitialData = async()=>{
        const response=await axios.get('https://xn--urkupia-9za.store/tickets/getTickets')
        console.log(response.data)
    
        return response.data
    }


const data = getInitialData()
   
    const [ticketData,setTicketData] = useState(data)

    const updateTicketData = (data)=>{
        setTicketData(data)

            
    }

    return <TicketContext.Provider value={{ticketData,updateTicketData,getInitialData}}>
        {children}
    </TicketContext.Provider>
}


export const useTicketContext = ()=>useContext(TicketContext)