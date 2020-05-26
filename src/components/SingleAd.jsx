import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

export default function SingleAd(props) {
    let button;
    if (props.token) {
        if (props.singleAd.id && props.savedAds.get(props.singleAd.id)) {
            button =
                <>
                    <button className="button is-danger" onClick={() => { props.deleteSavedAd(props.singleAd.id) }}> Anzeige aus Merkliste löschen</button>
                    <br />
                    <div className="box has-background-success is-small"> ! Bereits Gespeichert !</div>
                </>

        } else {
            button = <button className="button is-success" onClick={props.saveAd}>Anzeige speichern</button>
        }
    } else {
        button = null;
    }

    function daysOld(date) {
        const day = 1000 * 60 * 60 * 24;
        const oldDate = new Date(date).getTime();
        const newDate = new Date().getTime();

        return Math.ceil((newDate - oldDate) / day)
    }

    const days = daysOld(props.singleAd.createdAt);

    return (
        <section className="section">
            <article className="box container has-text-centered column is-three-fifths is-offset-one-fifth">
                <h2 className="title is-size-3"> {props.singleAd.title}</h2>
                <p className="subtitle is-size-6"> {days} {days > 1 ? 'Tage' : 'Tag'} alt</p>
                <div className="content">
                    <p className="title is-size-5">Beschreibung</p><p>{props.singleAd.description}</p>
                    <p><b>Email:</b> {props.singleAd.email}</p>
                    <p><b>Ort:</b> {props.singleAd.location}</p>
                    <p><b>Ansprechpartner:</b> {props.singleAd.name}</p>
                    <p><b>Preis:</b> {props.singleAd.price} € {props.singleAd.priceNegotiable && <span class="tag is-info">VB</span>}</p>
                </div>
                {button}
            </article>
        </section>
    )
}