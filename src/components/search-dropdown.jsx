import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Hero } from 'react-bulma-components/dist';
import SearchBar from './searchbar';

function SearchDropdown() {
    return (
                <div className="hero-body">
                    <nav className="navbar" role="navigation" aria-label="dropdown navigation">
                        <SearchBar />

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link is-size-4">
                                Search
                            </a>
                            <div className="navbar-dropdown is-paddingless">
                                <a className="navbar-item is-size-5">
                                    Title
                                </a>
                                <hr className="navbar-divider is-marginless is-paddingless" />
                                <a className="navbar-item is-size-5">
                                    Location
                                </a>
                                <hr className="navbar-divider is-marginless is-paddingless" />
                                <a className="navbar-item is-size-5">
                                    Keyword
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
    )
}

export default SearchDropdown