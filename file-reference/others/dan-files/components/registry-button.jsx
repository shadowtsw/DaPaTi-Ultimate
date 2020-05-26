import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from 'react-bulma-components/dist';


function showRegForm() {
    document.getElementById('registryform').classList.toggle('is-hidden');
}

function RegBtn(props) {
    return(<Button className="is-info column is-1 is-offset-one-quarter" onClick={showRegForm}>{props.text}</Button>)
}

export default RegBtn;