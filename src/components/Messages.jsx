import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

export default function Messages(props) {
    let person = (props.meineId === props.messageSenderId)?"has-text-right has-background-light":"has-text-left has-background-info has-text-white";
        return (
        <div className={"box "+person}> {props.mes} </div> // {props.text}
        )
}