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
// var Perf = require('react-addons-perf'); // ES5 with npm

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
        this.state = {
            activeTab: "Übersicht",
            ubersicht: null,
            savedAds: null,
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
        this.updateRoutine();
        this.props.getData("user/me", this.props.token).then((res) => {
            this.setState({
                userInfo: res
            })
        })
    };
    componentDidUpdate() {
    }
    updateRoutine() {
        const filterParam = encodeURIComponent(JSON.stringify({ limit: 20, offset: 0 }))
        this.props.getData("ad?filter=" + filterParam, this.props.token)
            .then((res) => {

                let sortedAds = new Map();
                res.forEach((article) => {
                    sortedAds.set(article.id, article)
                })
                this.setState({ sortedAd: sortedAds })
                this.setState({ ubersicht: res })
            })
        this.props.getData("user/me/saved-ad", this.props.token)
            .then((res) => {
                this.setState({ savedAds: res })
            })
        this.props.getData("user/me/conversations", this.props.token)
            .then((res) => {
                this.setState({ messageCenter: res })
            })
    }
    changeTab(eve) {
        console.log(eve.target.textContent)
        this.setState({
            activeTab: eve.target.textContent
        })
        if (eve.target.textContent === "Übersicht") {
            this.updateRoutine()
        }
    }
    chooseSingleAd(id) {
        console.log(id)
        this.setState({
            singleAd: this.state.sortedAd.get(id)
        })
        this.setState({
            activeTab: "Einzelartikel"
        })
    }
    saveAd() {
        this.props.postData(`user/me/saved-ad/${this.state.singleAd.id}`, this.props.token, { id: this.state.singleAd.id })
            .then((res) => {
                console.log('res saveAd', res)
            })
            .catch((err) => {
                console.log('err saveAd', err)
            })
        this.updateRoutine()
    }
    searchFunction(eve) {
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
    }
    render() {
        let maincontent;
        let content = new Map([
            ["Übersicht", <DisplayBox ads={this.state.ubersicht} chooseSingleAd={(id) => this.chooseSingleAd(id)} />],
            ["Anzeige aufgeben", <PostAdForm name={this.props.name} email={this.props.email} submitHandler={this.props.submitHandler} />],
            ["Eigene Anzeigen", <h3>Eigene Anzeigen</h3>],
            ["Gespeicherte Anzeigen", <SavedAdsView ads={this.state.savedAds} />],
            ["Message Center", <h3>Message Center</h3>],
            ["Account-Info", <><h3>Account-Info</h3><p>ID: {this.state.userInfo.id}</p><p>Name: {this.state.userInfo.name}</p><p>Email: {this.state.userInfo.email}</p></>],
            ["Einzelartikel", <SingleAd singleAd={this.state.singleAd} saveAd={() => { this.saveAd() }} token={this.props.token} />]
        ])
        maincontent = content.get(this.state.activeTab)

        return (
            <>
                <nav className="navbar has-text-centered">
                <ul className="is-flex-desktop-only">
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>Übersicht
                        </li>
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>Anzeige aufgeben
                        </li>
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>Eigene Anzeigen
                        </li>
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>
                            Gespeicherte Anzeigen
                        </li>
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>
                            Message Center
                        </li>
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>
                            Account-Info
                        </li>
                    </ul>
                </nav>
                <SearchBar searchFunction={(eve)=>{this.searchFunction(eve)}}/>
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
        this.state = {
            activeTab: "Übersicht",
            ubersicht: null,
            sortedAd: null,
            singleAd: null
        }
    }
    componentDidMount() {
        const filterParam = encodeURIComponent(JSON.stringify({ limit: 20, offset: 0 }))
        this.props.getData("ad?filter=" + filterParam).then((res) => {
            let sortedAds = new Map();
            res.forEach((article) => {
                sortedAds.set(article.id, article)
            })
            this.setState({ sortedAd: sortedAds })
            this.setState({ ubersicht: res })
        })
    };
    changeTab(eve) {
        console.log(eve.target.textContent)
        this.setState({
            activeTab: eve.target.textContent
        })
    }
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
                        activeTab: "Registrieren erfolgreich"
                    });
                }
                else {
                    this.setState({
                        userInfo: res
                    });
                    this.setState({
                        activeTab: "Registrieren fehlgeschlagen"
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    activeTab: "Registrieren fehlgeschlagen"
                })
            })
    }
    chooseSingleAd(id) {
        console.log(id)
        this.setState({
            singleAd: this.state.sortedAd.get(id)
        })
        this.setState({
            activeTab: "Einzelartikel"
        })
    }
    searchFunction(eve) {
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
    }
    render() {
        let maincontent;
        let content = new Map([
            ['Übersicht', <DisplayBox ads={this.state.ubersicht} chooseSingleAd={(id) => this.chooseSingleAd(id)} />],
            ['Anzeige aufgeben', <PostAdForm name={"Gast"} submitHandler={this.props.submitHandler} />],
            ['Registrieren', <RegistryForm onSubmit={(eve) => { this.register(eve) }} />],
            ['Registrieren erfolgreich', <RegistrySuccess userInfo={this.state.userInfo} />],
            ['Registrieren fehlgeschlagen', <RegistryFail />],
            ["Einzelartikel", <SingleAd singleAd={this.state.singleAd} saveAd={() => { this.saveAd() }} token={this.props.token} />]
        ])

        maincontent = content.get(this.state.activeTab);

        return (
            <>
                <nav className="navbar has-text-centered is-light">
                    <ul className="is-flex-desktop-only">
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>
                            Übersicht
                        </li>
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>
                            Anzeige aufgeben
                        </li>
                        <li className="navbar-link" onClick={(eve) => { this.changeTab(eve) }}>
                            Registrieren
                        </li>
                    </ul>
                </nav>
                <SearchBar searchFunction={(eve)=>this.searchFunction(eve)}/>
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
            <form onSubmit={(eve) => { props.searchFunction(eve) }}>
                <input type="text" id="searchLocation" placeholder="Ort" />
                <input type="text" id="searchTitle" placeholder="Titel" />
                <input type="text" id="searchDescription" placeholder="Beschreibung" />
                <button type="submit">Suche </button>
            </form>
        </>
    )
}


// ----- Components and Functions need to sort


function SavedAdsView(props) {
    return (
        <section className="section">
            <div className="hero-body">
                {props.ads && props.ads.map(ad => <SavedAd ad={ad} />)};
            </div>
        </section>
    )
}

function SavedAd(props) {
    return (
        <article className="box">
            <h3 className="title" >{props.ad.title}</h3>
            <p><b>erstellt:</b> {props.ad.createdAt}</p>
            <p><b>Email:</b> {props.ad.email}</p>
            <p><b>ID:</b> {props.ad.id}</p>
            <p><b>Ort:</b> {props.ad.location}</p>
            <p><b>Ansprechpartner:</b> {props.ad.name}</p>
            <p><b>Preis:</b> {props.ad.price}</p>
            <p><b>Verhandelbar:</b> {props.ad.priceNegotiable}</p>
            <br />
            <p>{props.ad.description}</p>
        </article>
    )
}

function SingleAd(props) {
    let button;
    if (props.token) {
        button = <button className="button is-success" onClick={props.saveAd}>Anzeige speichern</button>
    } else {
        button = null;
    }
    return (
        <article className="box container has-text-centered">
            <h2 className="title is-size-3"> {props.singleAd.title}</h2>
            <p className="subtitle is-size-7"> {new Date(props.singleAd.createdAt).toLocaleDateString()}</p>
            <div className="content">
                <p className="title is-size-5">Beschreibung</p><p>{props.singleAd.description}</p>
            <p><b>Email:</b> {props.singleAd.email}</p>
            <p><b>Ort:</b> {props.singleAd.location}</p>
            <p><b>Ansprechpartner:</b> {props.singleAd.name}</p>
                <p><b>Preis:</b> {props.singleAd.price} € {props.singleAd.priceNegotiable && <span class="tag is-info">VB</span>}</p>
            </div>
            {/* <p><b>Verhandelbar:</b> {props.singleAd.priceNegotiable}</p> */}
            {button}
        </article>
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
                    <label className="label is-small" htmlFor="rememberLogin"><input className="is-small" type="checkbox" id="rememberLogin" onChange={props.rememberLogin} /> Remember Login
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

function DisplayBox(props) {
    return (

        <section className="section has-background-light">
            <div className="hero-body">
                {props.ads && props.ads.map(ad => <Ad key={ad.id} ad={ad} chooseSingleAd={(id) => { props.chooseSingleAd(id) }} />)}
            </div>
        </section>
    )
}

function Ad(props) {

    return (
        <article className="box">
            <h3 className="title">{props.ad.title}</h3>
            <p className="content">{props.ad.description}</p>
            <button className="button is-info" onClick={() => { props.chooseSingleAd(props.ad.id) }}>Details</button>
        </article>
    )
}

function PostAdForm(props) {
    let username = props.name;
    if (props.name==='Gast') {
        username = "";
    }
    return (
        <form id="postadform" onSubmit={props.submitHandler}>
            <div className="box column is-three-fifths is-offset-one-fifth">
                <h1 className="title has-text-centered">New Ad</h1>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input className="input" type="text" name="title" placeholder="Awesome Product For Sale!" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" name="name" defaultValue={username}placeholder={props.name} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Location</label>
                    <div className="control">
                        <input className="input" type="text" name="location" placeholder="Hamburg" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input regemail" type="email" name="email" placeholder="my@email.com" defaultValue={props.email} />
                    </div>
                    <p className="help emailalert"></p>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea className="textarea" name="description" placeholder="My awesome product is awesome because..." ></textarea>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Price</label>
                    <div className="control">
                        <input className="input" type="number" name="price" placeholder="00.00 €" min="0" />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <label htmlFor="negoYes" className="radio">
                            <input type="radio" id="negoYes" name="priceNegotiable" /> Negotiable
                    </label>
                        <label htmlFor="negoNo" className="radio">
                            <input type="radio" id="negoNo" name="priceNegotiable" /> Fixed Price
                    </label>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
function RegistryForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <div id="registryform" className="box column is-three-fifths is-offset-one-fifth">
                <h1 className="title has-text-centered">Register</h1>

                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" />
                    </div>
                    <p className="help usernamealert"></p>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input regemail" type="email" placeholder="Email input" />
                    </div>
                    <p className="help emailalert"></p>
                </div>

                <div className="field">
                    <label className="label">Passwort</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Passwort" />
                    </div>
                    <p className="help usernamealert"></p>
                </div>

                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input type="checkbox" /> I agree to the{" "}
                            <a href="https://policies.google.com/terms?hl=en-US">terms and conditions</a>
                        </label>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export async function userLogin(url = "", data = {}) {

    const endpoint = "/user/login"
    url += endpoint;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });


    return response.json();
}
export async function apiAccessGet(url = "", endpoint = "", implementMethod = "", token = "") {

    url += endpoint;

    let response;

    if (implementMethod === "GET" && token === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            // body: data
        });
    }
    else if (implementMethod === "GET" && token !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // body: data
        });
    }
    // else if (implementMethod === "GET" && token !== ""){

    // }


    // if (data !== {}) {
    //     data = JSON.stringify(data)
    // }

    return response.json();
}

export async function apiAccessPost(url = "", endpoint = "", implementMethod = "", token = "", data = {}) {

    url += endpoint;

    let response;

    if (implementMethod === "POST" && token === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    else if (implementMethod === "POST" && token !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    }

    return response.json();
}

export async function apiAccessPatch(url = "", endpoint = "", implementMethod = "", token = "", data = {}) {

    url += endpoint;

    let response;

    if (implementMethod === "PATCH" && token === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    else if (implementMethod === "PATCH" && token !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    }

    return response.json();
}

export async function apiAccessDelete(url = "", endpoint = "", implementMethod = "", token = "") {

    url += endpoint;

    let response;

    if (implementMethod === "DELETE" && token === "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    else if (implementMethod === "DELETE" && token !== "") {
        response = await fetch(url, {
            method: implementMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    }

    return response.json();
}

export default Dapati