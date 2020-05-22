import React from 'react'
// import Dapati from '../dapati'

function maincontent(props) {
    return (
        <>
            <article>
                <section>
                    <h3 style={{ color: "white" }}>Just a header</h3>
                    <p style={{ color: "white" }}>Just a Text</p>
                    <h4>{props.title}</h4>
                </section>
            </article>
        </>
    )
}

export default maincontent