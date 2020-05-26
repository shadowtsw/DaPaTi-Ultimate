import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Ad from './Ad';
import SavedAd from './SavedAd';

function DisplayBox(props) {
    let title;
    if (props.origin === "Übersicht") {
        title = "DaPaTi Anzeigen";
        return (

            <section className="section has-background-light box">
                <h1 className="title has-text-centered">{title}</h1>
                <div className="hero-body">
                    {props.ads && [...props.ads.values()].map(ad => <Ad key={ad.id} ad={ad} selectAd={(id) => { props.selectAd(id) }} deleteSavedAd={(id) => { props.deleteSavedAd(id) }} />)}
                </div>
            </section>
        )
    } else if (props.origin === "Suche Ergebnis") {
        title = "Gesuchte Anzeigen";
        return (

            <section className="section has-background-light">
                <h1 className="title has-text-centered">{title}</h1>
                <div className="hero-body">
                    {props.ads && [...props.ads.values()].map(ad => <Ad key={ad.id} ad={ad} selectAd={(id) => { props.selectAd(id) }} />)}
                </div>
            </section>
        )
    } else if (props.origin === "Gespeicherte Anzeigen") {
        return (
            <section className="section">
                <div className="hero-body">
                    {props.ads && [...props.ads.values()].map(ad => <SavedAd key={ad.id} ad={ad} meineId={props.meineId} deleteSavedAd={(id) => { props.deleteSavedAd(id) }} />)}
                </div>
            </section>
        )
    } else if (props.origin === "Eigene Anzeigen") {
        return (
            <section className="section">
                <div className="hero-body">
                    {props.ads && [...props.ads.values()].map(ad => <SavedAd key={ad.id} ad={ad} meineId={props.meineId} deleteCreatedAd={(id) => { props.deleteCreatedAd(id) }} editAd={(id) => { props.editAd(id) }} />)}
                </div>
            </section>
        )
    }
}

export default DisplayBox;