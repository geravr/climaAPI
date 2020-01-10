import React from 'react';

const Error = ({mensaje}) => {
    return ( 
        <div className="card-panel red darken-4 error col s12 mt-5">
            {mensaje}
        </div>
     );
}
 
export default Error;