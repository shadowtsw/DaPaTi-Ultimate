import React from 'react';
// import apiAccess from './fetchAPI/fetch_sample';
import Header from './components/header';
import SearchArea from './components/search-area';
import RegistryForm from './components/registry-form';
import DisplayBox from './components/displaybox';
import LoginForm from './components/login-form';


class Dapati extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: localStorage.getItem('loggedIn'),
            logButtonToggle: "",
            regButtonToggle: "",
            token: null,
            serverUrl: "https://awacademy-kleinanzeigen.azurewebsites.net/",
            endpoints: {
                getAd: "ad/"
            },
            serverResponse: null,
            apiAccessParam: {
                data: {},
                token: null,
                implementMethod: "GET"
            }
        }
    }

    componentDidMount() {
        if (this.state.loggedIn === "true") {
            this.setState({ logButtonToggle: "Logout" })
            this.setState({ regButtonToggle: "Un-Register" })
            console.log('eingeloggt')
        } else {
            this.setState({ logButtonToggle: "Login" })
            this.setState({ regButtonToggle: "Register" })
            console.log('ausgeloggt')
        }
    }

    rembemberLogin(eve) {
        if (this.state.loggedIn === "true") {
            localStorage.removeItem("loggedIn")
            this.setState({ loggedIn: "false" })
            this.setState({ logButtonToggle: "Login" })
            this.setState({ regButtonToggle: "Register" })
        } else {
            localStorage.setItem("loggedIn", "true");
            this.setState({ loggedIn: "true" });
            this.setState({ logButtonToggle: "Logout" })
            this.setState({ regButtonToggle: "Un-Register" })

        }
    }

    getData=()=>{
        // apiAccess(`${this.state.serverUrl}${this.state.endpoints.getAd}`) //,this.state.apiAccessParam.data,this.state.apiAccessParam.token,this.state.apiAccessParam.implementMethod
        // .then((res)=>{this.setState({serverResponse: res})})
        // .catch((err)=>{return err})
    }

    render() {
        return (
        <>
            <Header logButtonToggle={this.state.logButtonToggle} regButtonToggle={this.state.regButtonToggle}/>
            <SearchArea />
            <LoginForm />
            <RegistryForm />
            <DisplayBox />
        </>
           
            // <div className="mainApp" style={{ width: "600px", height: "400px", backgroundColor: "grey", margin: "0 auto" }}>
            //     <div className="topic" style={{ width: "80%", backgroundColor: "yellow", margin: "0 auto", textAlign: "center" }}>
            //         <Uberschrift text={"DaPaTi-Ultimate"}/>
            //         <button name={this.state.logButtonToggle} onClick={(eve) => { this.rembemberLogin(eve) }}>{this.state.logButtonToggle}</button>
            //     </div>
            //     <div className="topLocations" style={{ width: "80%", backgroundColor: "red", margin: "0 auto", textAlign: "center" }}>
            //         <Toplocations />
            //     </div>
            //     <div className="searchQuery" style={{ width: "80%", backgroundColor: "green", margin: "0 auto", textAlign: "center" }}>
            //         <SearchQuery />
            //     </div>
            //     <div className="bodyField" style={{ width: "80%", backgroundColor: "blue", margin: "0 auto", display: "flex", flexDirection: "row" }}>
            //         <div className="contentField" style={{ width: "70%", backgroundColor: "black" }}>
            //             <button name="refresh" onClick={this.getData}>refresh</button>
            //             <Maincontent title="Testtitle"/>
            //         </div>
            //         <div className="userForm" style={{ width: "30%", height: "200px", backgroundColor: "pink" }}>
            //             <p>Userform</p>
            //             <Userform />
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default Dapati