import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Hero } from 'react-bulma-components/dist';
import Ad from './Ad'

function DisplayBox(props) {
    return(
        <div>
        <Hero className="is-large">
            <div className="hero-body">
                {props.ads && props.ads.map(ad => <Ad ad={ad}/>)}
            </div>
        </Hero>
    </div>
    )
}

export default DisplayBox;