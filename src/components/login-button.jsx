import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from 'react-bulma-components/dist';


function showLoginForm() {
    document.getElementById('loginform').classList.toggle('is-hidden');
}

function LoginBtn(props) {
    return(<Button className='is-info pagination-link' onClick={showLoginForm}>{props.text}</Button>)
}

export default LoginBtn;