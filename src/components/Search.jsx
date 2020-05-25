import React from 'react'

function Search(props) {
    return (
        <div className="field has-addons section">
            <p className="control is-expanded">
                <input className="input" type="text" name="search" placeholder="What are you looking for?" onChange={props.handleSearch} />
            </p>
            <p className="control select">
                <select name="searchSelect" onChange={props.handleSearch}>
                    <option>Select searchoption</option>
                    <option value="title">Title</option>
                    <option value="location">Location</option>
                    <option value="keyword">Keyword</option>
                </select>
            </p>
        </div>
    )
}

export default Search