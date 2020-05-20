import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Hero } from 'react-bulma-components/dist';

function SearchBar() {
    return (
        <div>
            <Hero className="is-light">
                <div className="hero-body">
                    <nav className="navbar" role="navigation" aria-label="dropdown navigation">
                        <input className="container is-fluid is-size-4" placeholder="What are you looking for?"></input>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link is-size-4">
                                Search
                            </a>
                            <div className="navbar-dropdown">
                                <a className="navbar-item is-size-6">
                                    Title
                                </a>
                                <hr className="navbar-divider is-size-6" />
                                <a className="navbar-item">
                                    Location
                                </a>
                                <hr className="navbar-divider is-size-6" />
                                <a className="navbar-item">
                                    Keyword
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </Hero>
            
        </div>
    )
}

export default SearchBar