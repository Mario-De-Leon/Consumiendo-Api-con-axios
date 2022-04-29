import React from "react";

const Context =  React.createContext()
function Provider(props){
    const[comentario,setComentario] = React.useState([])    
    const[individual,setIndividual] = React.useState({text: "", like: false, countLikes: 0, responder:[] })
    const[respuesta,setRespuesta] = React.useState('')
    const[key,setKey] = React.useState('')
    return(
        <Context.Provider value={{
            comentario,
            setComentario,
            individual,
            setIndividual,
            respuesta,
            setRespuesta,
            key,
            setKey
        }}>
            {props.children}
        </Context.Provider>
    )
}
export{Context, Provider}