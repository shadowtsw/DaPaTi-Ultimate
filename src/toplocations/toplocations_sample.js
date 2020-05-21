import React from 'react'
// import Dapati from '../dapati'

function listEntry(props) {
    return (
        <>
        <li>Hamburg</li>
        <li>Venedig</li>
        <li>Berlin</li>
        <li>Köln</li>
        <li>Sydney</li>
        </>
    )
}



function toplocations(props) {
    return (
        <>
            <span>TOP Locations</span>
            <ul style={{display: "flex", justifyContent:"space-around"}}>
                {listEntry()}
            </ul>
        </>
    )
}

export default toplocations