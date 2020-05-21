import React from 'react'

function inputfield(){
    return (
        <input/>
    )
}


function searchQuery(){
    return (
        <>
        <span>Ort</span>
        {inputfield()}
        <span>Begriff</span>
        {inputfield()}
        <button>Suche</button>
        </>
    )
}

export default searchQuery