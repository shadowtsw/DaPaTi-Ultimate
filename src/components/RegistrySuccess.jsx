import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

export default function RegistrySuccess(props) {
    return (
        <section className="section">
            <div className="box column is-three-fifths is-offset-one-fifth">
                <h3 className="title is-size-4">Registrierung erfolgreich</h3>
                <p className="subtitle is-size-5">Du kannst dich nun einloggen !</p>
                <br />
                <p>Deine ID: {props.userInfo.id}</p>
                <p>Dein Name: {props.userInfo.name}</p>
                <p>Deine Email: {props.userInfo.email}</p>
            </div>
        </section>
    )
}