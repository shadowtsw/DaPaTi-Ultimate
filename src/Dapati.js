import React from 'react';
import Header from './components/Header';
import { userLogin, apiAccessGet, apiAccessPost, apiAccessPatch, apiAccessDelete } from './components/functions/fetch_methods'
import Footer from './components/Footer';
import LogoutBar from './components/LogoutBar';
import LoginBar from './components/LoginBar';
import GuestPage from './GuestPage';
import UserPage from './UserPage';
// var Perf = require('react-addons-perf'); // ES5 with npm

//! Login Layer
class Dapati extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: localStorage.getItem('loggedIn'),
            token: localStorage.getItem('token'),
            tokenAvailable: false,
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            id: localStorage.getItem('id'),
            rememberLogin: false,
            serverUrl: "https://awacademy-kleinanzeigen.azurewebsites.net/"
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('name')) {
            this.setState({ name: "Gast" })
        }
        if (localStorage.getItem('token')) {
            this.setState({ tokenAvailable: true })
        }
        // Perf.start()
    }
    componentDidUpdate() {
        // Perf.stop()
        // Perf.printInclusive()
        // Perf.printWasted()
    }
    getData = (endpoint, token = "") => {
        return apiAccessGet(this.state.serverUrl, endpoint, "GET", token)
    }
    postData = (endpoint, token, body = {}) => {
        return apiAccessPost(this.state.serverUrl, endpoint, "POST", token, body)
    }
    deleteData = (endpoint, token, json) => {
        return apiAccessDelete(this.state.serverUrl, endpoint, "DELETE", token, json)
    }
    patchData = (endpoint, token, body = {}, json) => {
        return apiAccessPatch(this.state.serverUrl, endpoint, "PATCH", token, body, json)
    }


    userLogin = (eve) => {
        eve.preventDefault();

        const userInformation = {
            email: eve.target[0].value,
            password: eve.target[1].value
        }

        userLogin(this.state.serverUrl, userInformation)
            .then((res) => {

                if (res.token === "" || res.token === null || res.token === undefined) {
                    alert("Keine gültigen Userdaten vorhanden ! Bitte neu einloggen")
                    return;
                }
                else {
                    this.setState({ token: res.token });
                    this.setState({ loggedIn: "true" });
                    this.setState({ tokenAvailable: true })
                    if (this.state.rememberLogin === true) {
                        localStorage.setItem("loggedIn", "true");
                        localStorage.setItem("token", this.state.token);
                    }
                    this.getData("user/me", this.state.token)
                        .then((ress) => {
                            this.setState({ name: ress.name });
                            this.setState({ email: ress.email });
                            this.setState({ id: ress.id });
                            if (this.state.rememberLogin === true) {
                                localStorage.setItem("name", this.state.name);
                                localStorage.setItem("email", this.state.email);
                                localStorage.setItem("id", this.state.id);
                            }
                        })
                }
            })
            .catch((err) => { return err });
    }
    logout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        this.setState({ loggedIn: "false" });
        this.setState({ token: "" });
        this.setState({ name: "Gast" });
        this.setState({ email: "" });
        this.setState({ id: "" });
        this.setState({ rememberLogin: false })
    }
    rememberLogin(eve) {
        if (eve.target.checked) {
            this.setState({ rememberLogin: true })
        } else {
            this.setState({ rememberLogin: false })
        }
    }
    submitHandler = (eve) => {
        eve.preventDefault();
        const adData = {
            title: eve.target[0].value,
            name: eve.target[1].value,
            location: eve.target[2].value,
            email: eve.target[3].value,
            description: eve.target[4].value,
            price: +eve.target[5].value,
            priceNegotiable: eve.target[6].checked ? true : false
        }

        const adDataUser = {
            title: eve.target[0].value,
            // name: eve.target[1].value,
            location: eve.target[2].value,
            phone: "0190 66666",
            description: eve.target[4].value,
            price: +eve.target[5].value,
            priceNegotiable: eve.target[6].checked ? true : false
        }

        if (this.state.tokenAvailable === true) {
            // console.log(this.state.token);
            // console.log(typeof (this.state.token))
            this.postData('user/me/ad', this.state.token, adDataUser)
                .then((res) => {
                    console.log('mit token', res)
                    // this.postData(`user/me/saved-ad/${res.id}`, this.state.token, { id: res.id })
                    //     .then((ress) => {
                    //         console.log('save-ad-response', ress)
                    //     })
                    //     .catch((err) => {
                    //         console.log('save-ad-error', err)
                    //     })
                })
                .catch((err) => {
                    console.log('mit-token', err)
                })
        }
        else {
            this.postData('ad', this.state.token, adData).then((res) => {
                // console.log('else ohne token', res)
            });
        }
        alert(`Your ad "${adData.title}" has been successfully posted!`)
    }
    submitHandlerUpdate = (eve) => {
        eve.preventDefault();

        const adDataUser = {
            title: eve.target[0].value,
            name: eve.target[1].value,
            location: eve.target[2].value,
            phone: "0190 66666",
            description: eve.target[4].value,
            price: +eve.target[5].value,
            priceNegotiable: eve.target[6].checked ? true : false
        }

        const id = eve.target[8].value;

        if (this.state.tokenAvailable === true) {
            console.log(this.state.token);
            console.log(typeof (this.state.token))
            this.patchData(`ad/${id}`, this.state.token, adDataUser)
                .then((res) => {
                    console.log('mit token', res)
                })
                .catch((err) => {
                    console.log('mit-token', err)
                })
        }
        alert(`Your ad "${adDataUser.title}" has been successfully edited!`)
    }

    render() {
        let maincontent;
        let userNav;
        if (this.state.loggedIn === "true") {

            userNav =
                <LogoutBar
                    logout={() => { this.logout() }}
                />;
            maincontent =
                <UserPage
                    tokenAvailable={this.state.tokenAvailable}
                    token={this.state.token}
                    name={this.state.name}
                    email={this.state.email}
                    id={this.state.id}
                    getData={this.getData}
                    submitHandler={this.submitHandler}
                    postData={this.postData}
                    deleteData={this.deleteData}
                    patchData={this.patchData}
                    submitHandlerUpdate={this.submitHandlerUpdate}
                />

        } else {

            userNav =
                <LoginBar
                    userLogin={(eve) => { this.userLogin(eve) }}
                    rememberLogin={(eve) => { this.rememberLogin(eve) }} />;
            maincontent =
                <GuestPage
                    tokenAvailable={this.state.tokenAvailable}
                    getData={this.getData}
                    postData={this.postData}
                    submitHandler={this.submitHandler}
                    deleteData={this.deleteData}
                    patchData={this.patchData}
                />
        }
        return (
            <>
                <Header name={this.state.name} />
                {userNav}
                {maincontent}
                <Footer />
            </>
        )
    }
}

export default Dapati