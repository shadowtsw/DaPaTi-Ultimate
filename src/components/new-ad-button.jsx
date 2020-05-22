import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button } from 'react-bulma-components/dist';


function showPostAdForm() {
    document.getElementById('postadform').classList.toggle('is-hidden');
}

function NewAdBtn(props) {
    return(<Button className='is-info pagination-link' onClick={showPostAdForm}>Create Add</Button>)
}

export default NewAdBtn;