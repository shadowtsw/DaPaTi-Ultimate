import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from 'react-bulma-components/dist';

function RegBtn(props) {
    return(<Button className='is-info pagination-link' onClick={() => props.update('reg')}>{props.text}</Button>)
}

export default RegBtn;