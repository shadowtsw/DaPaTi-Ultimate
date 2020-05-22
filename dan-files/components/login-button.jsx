import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from 'react-bulma-components/dist';


function showLoginForm() {
    document.getElementById('loginform').classList.toggle('is-hidden');
}

function LoginBtn(props) {
    return(<Button className="is-info column is-1 is-offset-8" onClick={showLoginForm}>{props.text}</Button>)
}

export default LoginBtn;