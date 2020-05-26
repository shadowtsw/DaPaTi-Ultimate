import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

export default function RegistryFail() {
    return (
        <section className="section">
            <div className="box column is-three-fifths is-offset-one-fifth">
                <h3 className="title is-size-4">Fehlgeschlagen</h3>
                <p className="subtitle is-size-5">Passwort muss mindestens 6 Seichen haben</p>
                <p>Bitte überprüfe deine Daten und versuche es erneut</p>
            </div>
        </section>
    )
}