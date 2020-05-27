import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Messages from './Messages';

export default function MessageBox(props) {
    let empfangsId;
    if (props.messages[0].recipientUserId === props.meineId){
        empfangsId = props.messages[0].senderUserId
    }
    else {
        empfangsId = props.messages[0].recipientUserId
    }
    return (
        <section className="section column is-half-desktop">
        <article className="box container has-text-centered" style={{ width: "400px", display: "flex", flexWrap: "wrap" }}>
            <div>
                <div>
                    <p className="subtitle">{props.adId}</p>
                    <hr />
                </div>
                <div>
                    {props.messages.map(mes => <Messages meineId={props.meineId} messageSenderId={mes.senderUserId} empfangsId={mes.recipientUserId} key={mes.id} mes={mes.text} />)}
                </div>
                <br />
            </div>
            <form className="columns container" onSubmit={(eve) => { props.sendMessage(eve,props.adId,empfangsId) }}>
                <input className="column is-8 input is-rounded has-background-light" type="text" />
                <div className="column"> </div>
                <button className=" button is-rounded is-link" type="submit">Antworten</button>
            </form>
            <br />
        </article>
        </section>
    )
}