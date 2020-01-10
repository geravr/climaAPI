import React, { useState } from 'react';

const Formulario = ({datosConsulta, setLoader}) => {

    // state del componente
    // busqueda = state, setBusqueda = this.setState
    const [busqueda, setBusqueda] = useState({
        ciudad : '',
        pais : ''
    })

    const handleChange = e => {
        //Cambiar el state
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const consultarClima = e => {
        e.preventDefault();

        setLoader(true);
        datosConsulta(busqueda);
        
    }

    return ( 
        <form onSubmit={consultarClima}>
            <div className="input-field col s12">
                <input
                type="text"
                name="ciudad"
                id="ciudad"
                onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad</label>
            </div>
            <div className="input-field col s12">
                    <select onChange={handleChange} name="pais">
                    <option value="">Selecciona un país</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CL">Chile</option>
                    <option value="ES">España</option>
                </select>
            </div>
            <div className="input-field col s12">
                <button type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4" value="Buscar Clima">Buscar Clima</button>
            </div>
        </form>
     );
}
 
export default Formulario;