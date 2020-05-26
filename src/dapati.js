import React from 'react';
// import Header from './components/header';
// import SearchArea from './components/search-area';
// import RegistryForm from './components/registry-form';
// import DisplayBox from './components/displaybox';
// import LoginForm from './components/login-form';
// import PostAdForm from './components/PostAdForm';
// import API from './API/fetch_methods';
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Hero } from "react-bulma-components/dist";
import { useState } from 'react';
import { userLogin, apiAccessGet, apiAccessPost, apiAccessPatch, apiAccessDelete } from './API/fetch_methods'
// var Perf = require('react-addons-perf'); // ES5 with npm

// * Regular methods implemented by responsible class

//? Used by UserPage and GuestPage
function changeTab(eve, add = "") {
    console.log(eve.target.textContent)
    if (add === "") {
        this.setState({
            activeTab: eve.target.textContent
        })
    } else {
        this.setState({
            activeTab: add
        })
    }
}
//? Used by UserPage and GuestPage
function searchFunction(eve) {
    eve.preventDefault();
    console.log(eve.target)

    let suchbegriffOrt;
    let suchbegriffTitel;
    let suchbegriffBegriff;

    eve.target[0].value ? (suchbegriffOrt = eve.target[0].value) : (suchbegriffOrt = "")
    eve.target[1].value ? (suchbegriffTitel = eve.target[1].value) : (suchbegriffTitel = "")
    eve.target[2].value ? (suchbegriffBegriff = eve.target[2].value) : (suchbegriffBegriff = "")

    const filter =
    {
        limit: 20,
        offset: 0,
        where: {
            and: [
                { location: { like: suchbegriffOrt, options: "i" } },
                { title: { like: suchbegriffTitel, options: "i" } },
                { description: { like: suchbegriffBegriff, options: "i" } }
            ]
        }
    };

    const filterParam = encodeURIComponent(JSON.stringify(filter));

    this.props.getData(`ad/?filter=${filterParam}`)
        .then((res) => {
            console.log(res)
            this.setState({ searchedAds: res })
        })
        .catch((err) => {
            console.log('err', err)
        })
    this.setState({ activeTab: "Suche Ergebnis" })
}
//? Used by UserPage and GuestPage
function updateRoutineBasic() {
    const filterParam = encodeURIComponent(JSON.stringify({ limit: 20, offset: 0 }))

    this.props.getData("ad?filter=" + filterParam, this.props.token)
        .then((res) => {
            let sortedAds = new Map();
            res.forEach((article) => {
                sortedAds.set(article.id, article)
            })
            this.setState({ sortedAd: sortedAds })
        })
}
//? Used by UserPage only
function updateRoutineUser() {

    this.props.getData("user/me/saved-ad", this.props.token)
        .then((res) => {
            let sortedAds = new Map();
            res.forEach((article) => {
                sortedAds.set(article.id, article)
            })
            this.setState({ savedAds: sortedAds })
        })
    this.props.getData("user/me/conversations", this.props.token)
        .then((res) => {
            this.setState({ messageCenter: res })
        })
}
//? Used by UserPage only
function getAccountInfo() {
    this.props.getData("user/me", this.props.token).then((res) => {
        this.setState({
            userInfo: res
        })
    })
}
//? Used by UserPage
function deleteCreatedAd(adId) {
    this.props.deleteData(`ad/${adId}`, this.props.token, { id: adId })
        .then((res) => {
            console.log('res deleteSavedAd', res)
            alert("Anzeige erfolgreich gelöscht")
        })
        .catch((err) => {
            console.log('err deleteSavedAd', err)
            alert("Check Log for Details")
        })
}
//? Used by UserPage
function patchCreatedAd(adId) {
    this.props.patchData(`ad/${adId}`, this.props.token, { id: adId })
        .then((res) => {
            console.log('res patchData', res)
            alert("Anzeige erfolgreich geändert")
        })
        .catch((err) => {
            console.log('err patchData', err)
            alert("Check Log for Details")
        })
}
// * End



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
    deleteData = (endpoint, token, body = {}) => {
        return apiAccessDelete(this.state.serverUrl, endpoint, "DELETE", token, body)
    }
    patchData = (endpoint, token, body = {}) => {
        return apiAccessPatch(this.state.serverUrl, endpoint, "PATCH", token, body)
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
            console.log(this.state.token);
            console.log(typeof (this.state.token))
            this.postData('user/me/ad', this.state.token, adDataUser)
                .then((res) => {
                    console.log('mit token', res)
                    this.postData(`user/me/saved-ad/${res.id}`, this.state.token, { id: res.id })
                        .then((ress) => {
                            console.log('save-ad-response', ress)
                        })
                        .catch((err) => {
                            console.log('save-ad-error', err)
                        })
                })
                .catch((err) => {
                    console.log('mit-token', err)
                })
        }
        else {
            this.postData('ad', this.state.token, adData).then((res) => {
                console.log('else ohne token', res)
            });
        }
        alert(`Your ad "${adData.title}" has been successfully posted!`)
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
                    token={this.state.token}
                    name={this.state.name}
                    email={this.state.email}
                    id={this.state.id}
                    getData={this.getData}
                    submitHandler={this.submitHandler}
                    postData={this.postData}
                    deleteData={this.deleteData}
                    patchData={this.patchData}
                />

        } else {

            userNav =
                <LoginBar
                    userLogin={(eve) => { this.userLogin(eve) }}
                    rememberLogin={(eve) => { this.rememberLogin(eve) }} />;
            maincontent =
                <GuestPage
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
            </>
        )
    }
}

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.changeTab = changeTab.bind(this);
        this.searchFunction = searchFunction.bind(this);
        this.updateRoutineBasic = updateRoutineBasic.bind(this);
        this.updateRoutineUser = updateRoutineUser.bind(this);
        this.getAccountInfo = getAccountInfo.bind(this);
        this.deleteCreatedAd = deleteCreatedAd.bind(this)
        this.patchCreatedAd = patchCreatedAd.bind(this)
        this.state = {
            activeTab: "Übersicht",
            savedAds: null,
            searchedAds: null,
            messageCenter: null,
            sortedAd: null,
            singleAd: null,
            userInfo: {
                id: "",
                name: "",
                email: ""
            }
        }
    }
    componentDidMount() {
        this.updateRoutineBasic();
        this.updateRoutineUser();
        this.getAccountInfo();
    };

    selectAd(id) {
        console.log(id)
        this.setState({
            singleAd: this.state.sortedAd.get(id)
        })
        this.setState({
            activeTab: "Einzelartikel"
        })
        this.updateRoutineUser()
    }

    saveAd() {
        if (this.state.savedAds.get(this.state.singleAd.id)) {
            alert("Anzeige wurde bereits gespeichert, schau in deine Merkliste")
            this.updateRoutineUser()
            return;
        }
        this.props.postData(`user/me/saved-ad/${this.state.singleAd.id}`, this.props.token, { id: this.state.singleAd.id })
            .then((res) => {
                console.log('res saveAd', res)
                alert("Anzeige erfolgreich gespeichert")
            })
            .catch((err) => {
                console.log('err saveAd', err)
                alert("Check Log for Details")
            })
        this.updateRoutineUser()
    }
    deleteSavedAd(adId) {
        this.props.deleteData(`user/me/saved-ad/${adId}`, this.props.token, { id: adId })
            .then((res) => {
                console.log('res deleteSavedAd', res)
                alert("Anzeige erfolgreich gelöscht")
            })
            .catch((err) => {
                console.log('err deleteSavedAd', err)
                alert("Check Log for Details")
            })
        this.updateRoutineUser()
    }

    render() {
        let maincontent;
        let sucheErgebnis;
        let content = new Map([
            ["Übersicht", <DisplayBox ads={this.state.sortedAd} origin="Übersicht" selectAd={(id) => this.selectAd(id)} />],
            ["Suche Ergebnis", <DisplayBox ads={this.state.searchedAds} origin="Suche Ergebnis" selectAd={(id) => this.selectAd(id)} />],
            ["Anzeige Aufgeben", <PostAdForm name={this.props.name}  email={this.props.email} submitHandler={this.props.submitHandler} />],
            ["Eigene Anzeigen", <div className="box has-background-light"><h3 className="title">Eigene Anzeigen</h3><DisplayBox ads={this.state.savedAds} origin="Eigene Anzeigen" meineId={this.props.id}/></div>],
            ["Gespeicherte Anzeigen", <div className="box has-background-light"><h3 className="title">Gespeicherte Anzeigen</h3><DisplayBox ads={this.state.savedAds} origin="Gespeicherte Anzeigen" /></div>],
            ["Message Center", <div className="box has-background-light"><h3 className="title">Message Center</h3></div>],
            ["Account-Info", <div className="box has-background-light"><h3 className="title">Account-Info</h3><p className="subtitle">ID: {this.state.userInfo.id}</p><p>Name: {this.state.userInfo.name}</p><p>Email: {this.state.userInfo.email}</p></div>],
            ["Einzelartikel", <SingleAd singleAd={this.state.singleAd} savedAds={this.state.savedAds} saveAd={() => { this.saveAd() }} token={this.props.token} />]
        ])
        maincontent = content.get(this.state.activeTab)

        if (this.state.searchedAds) {
            sucheErgebnis =
                <li className={this.state.activeTab === "Suche Ergebnis" ? "is-active" : undefined } onClick={(eve) => { this.changeTab(eve, "Suche Ergebnis") }}><a href="#!">Suche Ergebnis ({this.state.searchedAds.length})</a>
                </li>
        }

        return (<>

            <SearchBar searchFunction={(eve) => this.searchFunction(eve)} />
            <div className="tabs is-medium is-boxed is-centered">
                <ul>
                    <li className={this.state.activeTab === "Übersicht" ? 'is-active' : undefined} onClick={(eve) => { this.changeTab(eve) }}><a href="#!">Übersicht</a>
                    </li>
                    <li className={this.state.activeTab === "Eigene Anzeigen" ? 'is-active' : undefined} onClick={(eve) => { this.changeTab(eve) }}><a href="#!">Eigene Anzeigen</a>
                    </li>
                    {sucheErgebnis}
                    <li className={this.state.activeTab === "Anzeige Aufgeben" ? 'is-active' : undefined} onClick={(eve) => { this.changeTab(eve) }}><a href="#!" >Anzeige Aufgeben</a>
                    </li>
                    <li className={this.state.activeTab === "Gespeicherte Anzeigen" ? 'is-active' : undefined} onClick={(eve) => { this.changeTab(eve) }}>
                        <a href="#!">Gespeicherte Anzeigen</a>
                    </li>
                    <li className={this.state.activeTab === "Message Center" ? 'is-active' : undefined} onClick={(eve) => { this.changeTab(eve) }}>
                        <a href="#!">Message Center</a>
                    </li>
                    <li className={this.state.activeTab === "Account-Info" ? 'is-active' : undefined} onClick={(eve) => { this.changeTab(eve) }}>
                        <a href="#!">Account-Info</a>
                    </li>
                </ul>
            </div>
            <main>
                {maincontent}
            </main>
        </>
        )
    }
}

class GuestPage extends React.Component {
    constructor(props) {
        super(props);
        this.changeTab = changeTab.bind(this);
        this.searchFunction = searchFunction.bind(this);
        this.updateRoutineBasic = updateRoutineBasic.bind(this);
        this.state = {
            activeTab: "Übersicht",
            sortedAd: null,
            singleAd: null,
            searchedAds: null
        }
    }
    componentDidMount() {
        this.updateRoutineBasic();
    };

    register(eve) {
        eve.preventDefault();
        console.log(eve.target)
        let body = {
            name: eve.target[0].value,
            email: eve.target[1].value,
            password: eve.target[2].value
        }
        this.props.postData("user/register", "", body)
            .then((res) => {
                if (res.id) {
                    this.setState({
                        userInfo: res
                    });
                    this.setState({
                        activeTab: "Registrieren Erfolgreich"
                    });
                }
                else {
                    this.setState({
                        userInfo: res
                    });
                    this.setState({
                        activeTab: "Registrieren Fehlgeschlagen"
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    activeTab: "Registrieren Fehlgeschlagen"
                })
            })
    }
    selectAd(id) {
        console.log(id)
        this.setState({
            singleAd: this.state.sortedAd.get(id)
        })
        this.setState({
            activeTab: "Einzelartikel"
        })
    }

    render() {
        let maincontent;
        let sucheErgebnis;
        let content = new Map([
            ['Übersicht', <DisplayBox ads={this.state.sortedAd} origin="Übersicht" selectAd={(id) => this.selectAd(id)} />],
            ["Suche Ergebnis", <DisplayBox ads={this.state.searchedAds} origin="Suche Ergebnis" selectAd={(id) => this.selectAd(id)} />],
            ['Anzeige Aufgeben', <PostAdForm name={"Gast"} submitHandler={this.props.submitHandler} />],
            ['Registrieren', <RegistryForm onSubmit={(eve) => { this.register(eve) }} />],
            ['Registrieren Erfolgreich', <RegistrySuccess userInfo={this.state.userInfo} />],
            ['Registrieren Fehlgeschlagen', <RegistryFail />],
            ["Einzelartikel", <SingleAd singleAd={this.state.singleAd} saveAd={() => { this.saveAd() }} token={this.props.token} />]
        ])

        maincontent = content.get(this.state.activeTab);

        if (this.state.searchedAds) {
            sucheErgebnis =
                <li className={this.state.activeTab === "Suche Ergebnis" ? "is-active" : undefined} onClick={(eve) => { this.changeTab(eve, "Suche Ergebnis") }}><a href="#!">Suche Ergebnis ({this.state.searchedAds.length})</a>
                </li>
        }

        return (
            <>
                <SearchBar searchFunction={(eve) => this.searchFunction(eve)} />

                <div className="tabs is-medium is-boxed is-centered">
                    <ul>
                        <li className={this.state.activeTab === "Übersicht" && 'is-active'} onClick={(eve) => { this.changeTab(eve) }}><a href="#!">Übersicht</a>
                        </li>
                        {sucheErgebnis}
                        <li className={this.state.activeTab === "Anzeige Aufgeben" && 'is-active'} onClick={(eve) => { this.changeTab(eve) }}><a href="#!">Anzeige Aufgeben</a>
                        </li>
                        <li className={this.state.activeTab === "Registrieren" && 'is-active'} onClick={(eve) => { this.changeTab(eve) }}><a href='#!'>Registrieren</a>
                        </li>
                    </ul>
                </div>
                <main>
                    {maincontent}
                </main>
            </>
        )
    }
}

function SearchBar(props) {
    return (
        <>
            <form className="section columns" onSubmit={(eve) => { props.searchFunction(eve) }}>
                <input className="input column" type="text" id="searchLocation" placeholder="Ort" />
                <input className="input column" type="text" id="searchTitle" placeholder="Titel" />
                <input className="input column" type="text" id="searchDescription" placeholder="Beschreibung" />
                <div className="column is-paddingless">
                    <button className="button is-fullwidth is-link" type="submit">Suche</button>
                </div>
            </form>
        </>
    )
}


// ----- Components and Functions need to sort





function SingleAd(props) {
    let button;
    if (props.token) {
        if (props.savedAds.get(props.singleAd.id)) {
            button =
                <>
                    <button className="button is-info is-light is-small"> ! Bereits Gespeichert !</button><br />
                    <button className="button is-danger"> Anzeige aus Merkliste löschen</button>
                </>

        } else {
            button = <button className="button is-success" onClick={props.saveAd}>Anzeige speichern</button>
        }
    } else {
        button = null;
    }

    function daysOld(date) {
        const day = 1000 * 60 * 60 * 24;
        const oldDate = new Date(date).getTime();
        const newDate = new Date().getTime();

        return Math.ceil((newDate - oldDate) / day)
    }

    const days = daysOld(props.singleAd.createdAt);

    return (
        <section className="section">
            <article className="box container has-text-centered column is-three-fifths is-offset-one-fifth">
                <h2 className="title is-size-3"> {props.singleAd.title}</h2>
                <p className="subtitle is-size-6"> {days} {days > 1 ? 'Tage' : 'Tag'} alt</p>
                <div className="content">
                    <p className="title is-size-5">Beschreibung</p><p>{props.singleAd.description}</p>
                    <p><b>Email:</b> {props.singleAd.email}</p>
                    <p><b>Ort:</b> {props.singleAd.location}</p>
                    <p><b>Ansprechpartner:</b> {props.singleAd.name}</p>
                    <p><b>Preis:</b> {props.singleAd.price} € {props.singleAd.priceNegotiable && <span class="tag is-info">VB</span>}</p>
                </div>
                {button}
            </article>
        </section>
    )
}

function RegistrySuccess(props) {
    console.log(props)
    return (
        <>
            <h3>Registrierung erfolgreich</h3>
            <p>Du kannst dich nun einloggen !</p>
            <br />
            <p>Deine ID: {props.userInfo.id}</p>
            <p>Dein Name: {props.userInfo.name}</p>
            <p>Deine Email: {props.userInfo.email}</p>
        </>
    )
}

function RegistryFail() {
    return (
        <>
            <h3>Fehlgeschlagen</h3>
            <p>Passwort muss mindestens 6 Seichen haben</p>
            <p>Bitte überprüfe deine Daten und versuche es erneut</p>
        </>
    )
}

function LoginBar(props) {
    return (
        <>
            <form className="section" onSubmit={props.userLogin}>
                <div className="field has-addons has-addons-centered is-three-fifths is-offset-one-fifth">
                    <div className="columns is-mobile">
                        <div className="column">
                            <input className="input is-small is-rounded" type="email" id="name" name="email" placeholder="Email" />
                            <input className="input is-small is-rounded" type="password" id="password" name="password" placeholder="Passwort" />
                        </div>
                        <div className="column">
                            <label className="label is-small" htmlFor="rememberLogin"><input className="is-small" type="checkbox" id="rememberLogin" onChange={props.rememberLogin} /> Eingelogt Bleiben
                    </label>
                            <button className="button is-link is-small" type="submit">Login</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

function LogoutBar(props) {
    return (
        <button className="button is-fullwidth is-link is-small" onClick={props.logout}>Logout</button>
    )
}
function Header(props) {
    return (
        <>
            <Hero className="is-info">
                <div className="hero-body">
                    <h1 className="is-size-1 has-text-centered">DaPaTi</h1>
                    <h2 className="is-size-5 has-text-centered">Hallo {props.name}</h2>
                </div>
            </Hero>
        </>
    );
}


// ! Component block sticks together
function DisplayBox(props) {
    let title;
    if (props.origin === "Übersicht") {
        title = "DaPaTi Anzeigen";
        return (

            <section className="section has-background-light">
                <h1 className="title has-text-centered">{title}</h1>
                <div className="hero-body">
                    {props.ads && [...props.ads.values()].map(ad => <Ad key={ad.id} ad={ad} selectAd={(id) => { props.selectAd(id) }} />)}
                </div>
            </section>
        )
    } else if (props.origin === "Suche Ergebnis") {
        title = "Gesuchte Anzeigen";
        return (

            <section className="section has-background-light">
                <h1 className="title has-text-centered">{title}</h1>
                <div className="hero-body">
                    {props.ads && [...props.ads.values()].map(ad => <Ad key={ad.id} ad={ad} selectAd={(id) => { props.selectAd(id) }} />)}
                </div>
            </section>
        )
    } else if (props.origin === "Gespeicherte Anzeigen") {
        return (
            <section className="section">
                <div className="hero-body">
                    {props.ads && [...props.ads.values()].map(ad => <SavedAd key={ad.id} ad={ad} />)}
                </div>
            </section>
        )
    } else if (props.origin === "Eigene Anzeigen") {
        return (
            <section className="section">
                <div className="hero-body">
                    {props.ads && [...props.ads.values()].map(ad => <SavedAd key={ad.id} ad={ad} meineId={props.meineId}/>)}
                </div>
            </section>
        )
    }
}

function Ad(props) {

    return (
        <article className="box column is-three-fifths is-offset-one-fifth">
            <h3 className="title is-size-4">{(props.ad.title.length>80) ? props.ad.title.substring(0, 80)+'...':props.ad.title}</h3>
            <p className="content">{(props.ad.description.length>80) ? props.ad.description.substring(0, 80)+'...':props.ad.description}</p>
            <button className="button is-info" onClick={() => { props.selectAd(props.ad.id) }}>Details</button>
        </article>
    )
}

function SavedAd(props) {

    if (props.ad.userId === props.meineId) {
        return (
            <article className="box container has-text-centered">
                <h2 className="title is-size-3"> {props.ad.title}</h2>
                <p className="subtitle is-size-7"> {new Date(props.ad.createdAt).toLocaleDateString()}</p>
                <div className="content">
                    <p className="title is-size-5">Beschreibung</p><p>{props.ad.description}</p>
                    <p><b>Email:</b> {props.ad.email}</p>
                    <p><b>Ort:</b> {props.ad.location}</p>
                    <p><b>Ansprechpartner:</b> {props.ad.name}</p>
                    <p><b>Preis:</b> {props.ad.price} € {props.ad.priceNegotiable && <span class="tag is-info">VB</span>}</p>
                </div>
                <button className="button is-warning">Anzeige bearbeiten</button>
                <button className="button is-danger">Anzeige löschen</button>
                <p>{props.meineId}</p>
            </article>
        )
    } else {
        return (
            <article className="box container has-text-centered">
                <h2 className="title is-size-3"> {props.ad.title}</h2>
                <p className="subtitle is-size-7"> {new Date(props.ad.createdAt).toLocaleDateString()}</p>
                <div className="content">
                    <p className="title is-size-5">Beschreibung</p><p>{props.ad.description}</p>
                    <p><b>Email:</b> {props.ad.email}</p>
                    <p><b>Ort:</b> {props.ad.location}</p>
                    <p><b>Ansprechpartner:</b> {props.ad.name}</p>
                    <p><b>Preis:</b> {props.ad.price} € {props.ad.priceNegotiable && <span class="tag is-info">VB</span>}</p>
                </div>
                <button className="button is-warning">Anzeige aus Merkliste löschen</button>
            </article>
        )
    }
}
// ! Component block sticks together END


//? UserForms
function PostAdForm(props) {
    let username = props.name;
    if (props.name === 'Gast') {
        username = "";
    }
    return (
        <form id="postadform" onSubmit={props.submitHandler}>
            <div className="box column has-background-light is-three-fifths is-offset-one-fifth">
                <h1 className="title has-text-centered">Neue Anzeige</h1>
                <div className="field">
                    <label className="label">Titel</label>
                    <div className="control">
                        <input className="input" type="text" name="title" placeholder="Tolles Product Zur Verkaufen!" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Namen</label>
                    <div className="control">
                        <input className="input" type="text" name="name" defaultValue={username} placeholder={props.name} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Ort</label>
                    <div className="control">
                        <input className="input" type="text" name="location" placeholder="Hamburg" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input regemail" type="email" name="email" placeholder="mein@email.com" defaultValue={props.email} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Beschreibung</label>
                    <div className="control">
                        <textarea className="textarea" name="description" placeholder="Mein product ist toll, weil..." ></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Preis</label>
                    <div className="control">
                        <input className="input" type="number" name="price" placeholder="00.00 €" min="0" step="0.01" />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label htmlFor="negoYes" className="radio">
                            <input type="radio" id="negoYes" name="priceNegotiable" /> Verhandelbar
                    </label>
                        <label htmlFor="negoNo" className="radio">
                            <input type="radio" id="negoNo" name="priceNegotiable" /> Festpreis
                    </label>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">Aufgeben</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Abrechen</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
function RegistryForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <div id="registryform" className="box column is-three-fifths is-offset-one-fifth has-background-light">
                <h1 className="title has-text-centered">Register</h1>

                <div className="field">
                    <label className="label">Namen</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Mein Name" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input regemail" type="email" placeholder="mein@email.com" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Passwort</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Passwort" />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input type="checkbox" /> Ich stimme die {" "}
                            <a href="https://policies.google.com/terms?hl=en-US">Datenschutzbedinungen</a> zu
                        </label>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">Register</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Abrechen</button>
                    </div>
                </div>
            </div>
        </form>
    );
}
//? UserForms END

export default Dapati