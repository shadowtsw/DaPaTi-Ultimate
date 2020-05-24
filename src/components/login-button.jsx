import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from 'react-bulma-components/dist';

function LoginBtn(props) {
    return(<Button className='is-info pagination-link' onClick={(eve) => {props.update('login')}}>{props.text}</Button>)
}

export default LoginBtn;