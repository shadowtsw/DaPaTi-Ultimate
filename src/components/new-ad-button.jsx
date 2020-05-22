import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from 'react-bulma-components/dist';


function NewAdBtn(props) {
        return(<Button className='is-info pagination-link' onClick={() => props.update('newad')}>Create Ad</Button>)
}

export default NewAdBtn;