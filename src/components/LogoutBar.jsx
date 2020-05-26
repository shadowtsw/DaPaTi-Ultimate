import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";

export default function LogoutBar(props) {
    return (
        <button className="button is-fullwidth is-link is-small" onClick={props.logout}>Logout</button>
    )
}