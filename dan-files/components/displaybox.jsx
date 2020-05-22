import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Hero } from 'react-bulma-components/dist';

function DisplayBox(params) {
    return(
        <div>
        <Hero className="is-large">
            <div className="hero-body">
                <h1 className='is-size-1 has-text-centered'>results shown here</h1>
            </div>
        </Hero>
    </div>
    )
}

export default DisplayBox;