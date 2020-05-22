import React from 'react'

function Ad(props) {

    return (
        <article className="box">
            <h3 className="title">{props.ad.title}</h3>
            <p>{props.ad.description}</p>            
        </article>
    )
}

export default Ad