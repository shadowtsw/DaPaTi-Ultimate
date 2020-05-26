import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

function SavedAd(props) {

    if (props.ad.userId === props.meineId) {
        return (
            <article className="box container has-text-centered">
                <h2 className="title is-size-3"> {props.ad.title}</h2>
                <p className="subtitle is-size-7"> {new Date(props.ad.createdAt).toLocaleDateString()}</p>
                <div className="content">
                    <p className="title is-size-5">Beschreibung</p><p>{props.ad.description}</p>
                    <p><b>Email:</b> {props.ad.email}</p>
                    <p><b>Ort:</b> {props.ad.location}</p>
                    <p><b>Ansprechpartner:</b> {props.ad.name}</p>
                    <p><b>Preis:</b> {props.ad.price} € {props.ad.priceNegotiable && <span class="tag is-info">VB</span>}</p>
                </div>
                <button className="button is-warning" onClick={() => { props.editAd(props.ad.id) }}>Anzeige bearbeiten</button>
                <button className="button is-danger" onClick={() => { props.deleteCreatedAd(props.ad.id) }}>Anzeige löschen</button>
                <p>{props.meineId}</p>
            </article>
        )
    } else {
        return (
            <article className="box container has-text-centered">
                <h2 className="title is-size-3"> {props.ad.title}</h2>
                <p className="subtitle is-size-7"> {new Date(props.ad.createdAt).toLocaleDateString()}</p>
                <div className="content">
                    <p className="title is-size-5">Beschreibung</p><p>{props.ad.description}</p>
                    <p><b>Email:</b> {props.ad.email}</p>
                    <p><b>Ort:</b> {props.ad.location}</p>
                    <p><b>Ansprechpartner:</b> {props.ad.name}</p>
                    <p><b>Preis:</b> {props.ad.price} € {props.ad.priceNegotiable && <span class="tag is-info">VB</span>}</p>
                </div>
                <button className="button is-warning" onClick={() => { props.deleteSavedAd(props.ad.id) }}>Anzeige aus Merkliste löschen</button>
            </article>
        )
    }
}

export default SavedAd;