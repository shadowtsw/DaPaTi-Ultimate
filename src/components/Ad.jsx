import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

function Ad(props) {

    return (
        <article className="box column is-three-fifths is-offset-one-fifth">
            <div className="columns is-tablet">
                <div className='column is-tablet'>
                    <h3 className="title is-size-4">{(props.ad.title.length > 80) ? props.ad.title.substring(0, 80) + '...' : props.ad.title}</h3>
                    <p className="content">{(props.ad.description.length > 80) ? props.ad.description.substring(0, 80) + '...' : props.ad.description}</p>
                </div>
                <br />
                <div className="column is-3">
                <button className="button is-fullwidth is-link" onClick={() => { props.selectAd(props.ad.id) }}>Details</button>
                </div>
            </div>
        </article>
    )
}

export default Ad