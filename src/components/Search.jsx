import React from 'react'

function Search(props) {
    return (
        <div className="field has-addons section">
            <p className="control is-expanded">
                <input className="input" type="text" name="search" placeholder="What are you looking for?"/>
            </p>
            <p className="control select">
                <select name="searchSelect">
                    <option>Select searchoption</option>
                    <option value="location">Location</option>
                    <option value="keyword">Keyword</option>
                </select>
            </p>
        </div>
    )
}

export default Search