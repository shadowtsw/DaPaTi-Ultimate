import React from 'react';

class Dapati extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: localStorage.getItem('loggedIn'),
            buttonToggle: ""
        }
    }

    componentDidMount() {
        if (this.state.loggedIn === "true") {
            this.setState({ buttonToggle: "logout" })
            console.log('eingeloggt')
        } else {
            this.setState({ buttonToggle: "login" })
            console.log('ausgeloggt')
        }
    }

    rembemberLogin(eve) {
        if (this.state.loggedIn === "true") {
            localStorage.removeItem("loggedIn")
            this.setState({ loggedIn: "false" })
            this.setState({ buttonToggle: "login" })
        } else {
            localStorage.setItem("loggedIn", "true");
            this.setState({ loggedIn: "true" });
            this.setState({ buttonToggle: "logout" })
        }
    }

    render() {
        return (
            <div className="mainApp" style={{ width: "600px", height: "400px", backgroundColor: "grey", margin: "0 auto" }}>
                <div className="topic" style={{ width: "80%", backgroundColor: "yellow", margin: "0 auto", textAlign: "center" }}>
                    <h1>Uberschrift</h1>
                    <button name={this.state.buttonToggle} onClick={(eve) => { this.rembemberLogin(eve) }}>{this.state.buttonToggle}</button>
                </div>
                <div className="topLocations" style={{ width: "80%", backgroundColor: "red", margin: "0 auto", textAlign: "center" }}>
                    <p>TOP Locations</p>
                </div>
                <div className="searchQuery" style={{ width: "80%", backgroundColor: "green", margin: "0 auto", textAlign: "center" }}>
                    <p>SEARCH Query</p>
                </div>
                <div className="bodyField" style={{ width: "80%", backgroundColor: "blue", margin: "0 auto", display: "flex", flexDirection: "row" }}>
                    <div className="contentField" style={{ width: "70%", backgroundColor: "black" }}>
                        <p style={{ color: "white" }}>Content</p>
                    </div>
                    <div className="userForm" style={{ width: "30%", height: "200px", backgroundColor: "pink" }}>
                        <p>Userform</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dapati