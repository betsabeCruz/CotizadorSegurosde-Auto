import { createContext, useState } from "react"
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers"

const CotizadorContext =  createContext()

const CotizadorProvider = ({children}) =>{

    const [datos, setDatos]= useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError]= useState('')
    const [resultado, setResultado]= useState(0)
    const [cargando, setCargando]= useState(false)
    
    const handleChangeData= e =>{
        setDatos({
            ...datos,
            [e.target.name]: e.target.value

        })
        
    }
    const cotizarSeguro= () =>{
        //una base
        let resultado = 2000
        //obtener diferencia de anios
        const diferencia= obtenerDiferenciaYear(datos.year)

        //hay que restar el3% por cada anio
        resultado -= (diferencia * 0.03)*resultado

        //americano 15%

        //Europeo 30%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca)

        //Basico incrementa 20%
        //Completo 50%
        resultado *= calcularPlan(datos.plan)

        //formatear dinero
        resultado= formatearDinero(resultado)
        
        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
        
    }
    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeData,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
            >
            {children}
        </CotizadorContext.Provider>
    )
}


export{
    CotizadorProvider
}

export default CotizadorContext