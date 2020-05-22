import React from 'react';
// import apiAccess from './fetchAPI/fetch_sample';
import Header from './components/header';
import SearchArea from './components/search-area';
import RegistryForm from './components/registry-form';
import DisplayBox from './components/displaybox';
import LoginForm from './components/login-form';
import API from './API/fetch_methods'


class Dapati extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: localStorage.getItem('loggedIn'),
            logButtonToggle: "",
            regButtonToggle: "",
            token: localStorage.getItem('token'),
            serverUrl: "https://awacademy-kleinanzeigen.azurewebsites.net/",
            endpoints: {
                getAd: "ad"
            },
            serverResponseGet: null,
            serverResponsePost: null,
            apiAccessParam: {
                data: {},
                token: null,
                implementMethod: "GET"
            }
        }
    }
    
    componentDidMount() {
        if (this.state.loggedIn === "true" && (this.state.token !== ""||this.state.token !== undefined||this.state.token !== null) ) {
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
            localStorage.removeItem("token",this.state.token)
            this.setState({ loggedIn: "false" })
            this.setState({ logButtonToggle: "Login" })
            this.setState({ regButtonToggle: "Register" })
        } else {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("token",this.state.token)
            this.setState({ loggedIn: "true" });
            this.setState({ logButtonToggle: "Logout" })
            this.setState({ regButtonToggle: "Un-Register" })

        }
    }

    getData=(endpoint,token="")=>{
        API.apiAccessGet(this.state.serverUrl,endpoint,"GET",token)
        .then((res)=>{this.setState({serverResponseGet: res}); console.log(res)})
        .catch((err)=>{return err})
    }
    postData=(endpoint,token,body={})=>{
        API.apiAccessPost(this.state.serverUrl,endpoint,"POST",token,body)
        .then((res)=>{this.setState({serverResponsePost: res}); console.log(res)})
        .catch((err)=>{return err})
    }
    userLogin=(userInformation)=>{
        API.userLogin(this.state.serverUrl,userInformation)
        .then((res)=>{this.setState({token: res.token})})
        .catch((err)=>{return err})
    }



    render() {
        return (
        <>
            <Header logButtonToggle={this.state.logButtonToggle} regButtonToggle={this.state.regButtonToggle}/>
            <button onClick={()=>{this.getData(this.state.endpoints.getAd)}}>TEST</button>
            <button onClick={()=>{this.userLogin({email:"", password:""})}}>Login</button>
            <SearchArea />
            <LoginForm />
            <RegistryForm />
            <DisplayBox ads={this.state.serverResponse}/>
            <button onClick={this.getData}>Get Data</button>
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