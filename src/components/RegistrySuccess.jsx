import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

export default function RegistrySuccess(props) {
    // console.log(props)
    return (
        <>
            <h3>Registrierung erfolgreich</h3>
            <p>Du kannst dich nun einloggen !</p>
            <br />
            <p>Deine ID: {props.userInfo.id}</p>
            <p>Dein Name: {props.userInfo.name}</p>
            <p>Deine Email: {props.userInfo.email}</p>
        </>
    )
}