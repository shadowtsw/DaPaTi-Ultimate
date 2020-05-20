import React from 'react';

class Dapati extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    render() {
        return(
            <>
                <h1>Test</h1>
                <p>Die ist ein Test</p>
            </>
        )
    }
}

export default Dapati