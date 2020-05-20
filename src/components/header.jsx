import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Hero } from 'react-bulma-components/dist';


function Header() {

    return (
        <div>
            <Hero className="is-info">
                <div className="hero-body">
                    <h1 className='is-size-1 has-text-centered'>DaPaTi</h1>
                </div>
            </Hero>
        </div>
    )
}

export default Header;