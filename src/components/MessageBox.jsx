import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import Messages from './Messages';

export default function MessageBox(props) {
    let empfangsId;
    let articleTitle;
    if(props.savedAds.get(props.adId)){
        articleTitle = props.savedAds.get(props.adId);
        articleTitle = articleTitle.title;
    } else if(props.ownAds.get(props.adId)) {
        articleTitle = props.ownAds.get(props.adId);
        articleTitle = articleTitle.title;
    } else {
        articleTitle = "nicht verfügbar oder gelöscht"
    }
    if (props.messages[0].recipientUserId === props.meineId) {
        empfangsId = props.messages[0].senderUserId
    }
    else {
        empfangsId = props.messages[0].recipientUserId
    }
    let messageBoxID = `${props.adId}messagesDisplayBox`;
    console.log(messageBoxID, 'id')
    function toggleMessages(){
        let display = document.getElementById(messageBoxID); 
        display.classList.toggle('is-hidden')
    }
    return (
        <section className="section column is-half-desktop">
            <article className="box container has-text-centered" style={{ width: "400px", display: "flex", flexWrap: "wrap" }}>
                <div>
                    <p className="subtitle"><strong>Anzeige-ID:</strong> {props.adId}</p>
                    <p className="subtitle"><strong>Anzeige:</strong> {articleTitle}</p>
                    <button className="button is-rounded is-small is-link" onClick={()=> toggleMessages()}>Toggle Nachrichten</button>
                    <hr />
                </div>
                <div id={messageBoxID} className="is-hidden">
                    {props.messages.map(mes => <Messages meineId={props.meineId} messageSenderId={mes.senderUserId} empfangsId={mes.recipientUserId} key={mes.id} mes={mes.text} />)}

                    <br />
                    <form className="columns container" onSubmit={(eve) => { props.sendMessage(eve, props.adId, empfangsId) }}>
                        <input className="column is-8 input is-rounded has-background-light" type="text" />
                        <div className="column"> </div>
                        <button className=" button is-rounded is-link" type="submit">Antworten</button>
                    </form>
                    <br />
                </div>
            </article>
        </section>
    )
}