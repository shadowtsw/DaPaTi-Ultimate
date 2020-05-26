import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Hero } from 'react-bulma-components/dist';
import SearchDropdown from './search-dropdown';

function SearchArea() {
    return (
        <div>
            <Hero className="is-light">
                <SearchDropdown />
            </Hero>
            
        </div>
    )
}

export default SearchArea