import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Ad from './Ad'

function DisplayBox(props) {
    return(
        
        <section className="section">
            <div className="hero-body">
                {props.ads && props.ads.map(ad => <Ad key={ad.id} ad={ad}/>)}
            </div>
        </section>
    
    )
}

export default DisplayBox;