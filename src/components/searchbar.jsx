import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

function SearchBar(props) {
    return (
        <>
            <form className="section columns" onSubmit={(eve) => { props.searchFunction(eve) }}>
                <input className="input column" type="text" id="searchLocation" placeholder="Ort" />
                <input className="input column" type="text" id="searchTitle" placeholder="Titel" />
                <input className="input column" type="text" id="searchDescription" placeholder="Beschreibung" />
                <div className="column is-paddingless">
                    <button className="button is-fullwidth is-link" type="submit">Suche</button>
                </div>
            </form>
        </>
    )
}

export default SearchBar