import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

function Ad(props) {

    return (
        <article className="box column is-three-fifths is-offset-one-fifth">
            <h3 className="title is-size-4">{(props.ad.title.length > 80) ? props.ad.title.substring(0, 80) + '...' : props.ad.title}</h3>
            <p className="content">{(props.ad.description.length > 80) ? props.ad.description.substring(0, 80) + '...' : props.ad.description}</p>
            <button className="button is-info" onClick={() => { props.selectAd(props.ad.id) }}>Details</button>
        </article>
    )
}

export default Ad