import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import MessageBox from './MessageBox';

export default function MessageBoxWrapper(props) {
    return (
        <section className="section columns is-desktop" style={{ display: "flex", flexWrap: "wrap" }}>
            {Object.keys(props.conversation).map((entry) => <MessageBox meineId={props.meineId} key={entry} adId={entry} messages={props.conversation[entry]} sendMessage={(eve, adId, userId)=>{props.sendMessage(eve, adId, userId)}} />)}
        </section>
    )
}