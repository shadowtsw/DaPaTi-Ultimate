import React from 'react';
import Header from './components/header';
import SearchArea from './components/search-area';
import RegistryForm from './components/registry-form';
import DisplayBox from './components/displaybox';
import LoginForm from './components/login-form';
import PostAdForm from './components/PostAdForm';
import API from './API/fetch_methods';


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
                getAd: "ad",
                user: "user"
            },
            serverResponseGet: null,
            serverResponsePost: null,
            apiAccessParam: {
                data: {},
                token: null,
                implementMethod: "GET"
            },
            formValues: {
            },
            showForm: {
                reg: false,
                login: false,
                newad: false
            },
            test: '',
            userMeInfo: null,
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            id: localStorage.getItem('id'),
        }
        this.showForm = this.showForm.bind(this); //makes sure every time showForm is invoked, the 'this' links to the Dapati class
    }


    submitHandler = (eve) => {
        eve.preventDefault();
        console.log(eve.target)
        const adData = {
            title: eve.target[0].value,
            name: eve.target[1].value,
            location: eve.target[2].value,
            email: eve.target[3].value,
            description: eve.target[4].value,
            price: +eve.target[5].value,
            priceNegotiable: eve.target[6].checked ? true : false
        }

        this.setState({
            formValues: adData
        })

        const token = this.state.token
        this.postData('ad', token, adData);



    }

    componentDidMount() {
        this.getData('ad',this.state.token).then((res)=>{this.setState({serverResponseGet: res})});

        if (this.state.loggedIn === "true" && (this.state.token !== "" || this.state.token !== undefined || this.state.token !== null)) {
            this.setState({ logButtonToggle: "Logout" })
            this.setState({ regButtonToggle: "Un-Register" })
            console.log('eingeloggt')
        } else {
            this.setState({ logButtonToggle: "Login" })
            this.setState({ regButtonToggle: "Register" })
            console.log('ausgeloggt')
        }
    }

    componentDidUpdate() {
    }

    logout(eve) {
        if (eve.target.name === "logout" || eve.target.name === "Logout") {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            this.setState({ loggedIn: "false" });
            this.setState({ logButtonToggle: "Login" });
            this.setState({ regButtonToggle: "Register" });
            this.setState({ token: "" });
            this.setState({ name: "" });
            this.setState({ email: "" });
            this.setState({ id: "" });
        }
    }

    getData = (endpoint, token = "") => {
        return API.apiAccessGet(this.state.serverUrl, endpoint, "GET", token)
        // .then((res) => { this.setState({ [container]: res }); return "successful" }) //commented bcs that console.log was annoying || //removed this.setState({ serverResponseGet: res }); 
        // .catch((err) => { return err })
    }

    postData = (endpoint, token, body = {}) => {
        return API.apiAccessPost(this.state.serverUrl, endpoint, "POST", token, body)
            // .then((res) => { this.setState({ [container]: res }); console.log(res) }) //removed this.setState({ serverResponsePost: res }); 
            // .catch((err) => { return err })
    }

    userLogin = (userInformation, container = "userWaste") => {

        API.userLogin(this.state.serverUrl, userInformation)
            .then((res) => {
                if (res.token === "" || res.token === null || res.token === undefined) {
                    alert("Keine gültigen Userdaten vorhanden ! Bitte neu einloggen")
                    return;
                }
                else {
                    this.setState({ token: res.token });
                    this.setState({ [container]: res });
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("token", this.state.token);
                    this.setState({ loggedIn: "true" });
                    this.setState({ logButtonToggle: "Logout" });
                    this.setState({ regButtonToggle: "Un-Register" });
                    console.log(res)
                }
                this.getData("user/me", this.state.token, "userMeInfo")
                    .then((ress) => {
                        this.setState({ name: ress.name });
                        this.setState({ email: ress.email });
                        this.setState({ id: ress.id });
                        localStorage.setItem("name", this.state.name);
                        localStorage.setItem("email", this.state.email);
                    })
            })
            .catch((err) => { return err });
    }

    onSubmit = (eve) => {
        eve.preventDefault();
        let body = {
            email: eve.target[0].value,
            password: eve.target[1].value.toString()
        }
        if (eve.target[0].value && eve.target[1].value) {
            this.userLogin(body, "userLoginResponse")
            console.log(body)
        }
    }

    showForm(param) {
        let dummy = { ...this.state.showForm }; //dummy obj for sorting
        dummy[param] = !dummy[param]; //toggles value of the showForm state (equivalent)
        let forms = Object.keys(dummy).filter((item) => item !== param); //lists other states in showForm (equivalent)
        forms.forEach(key => dummy[key] = false); //sets all others to false (so no two forms are open at the same time)
        this.setState(({ showForm: dummy })); //sets the (actual) showForm state to that of the updated dummy
    }

    render() {
        return (
            <>
                <Header update={this.showForm} logButtonToggle={this.state.logButtonToggle} regButtonToggle={this.state.regButtonToggle} onLogin={this.toggleLogin} />
                {/* <button onClick={() => { this.getData("ad", this.state.token, "waste") }}>Waste</button>
                <button onClick={() => { this.getData("ad", this.state.token, "somewhere") }}>Somewhere</button> */}
                <button onClick={() => { this.userLogin({ email: "shadow_tsw@web.de", password: "654321" }) }}>Login</button>
                <button name="logout" onClick={(eve) => { this.logout(eve) }}>Logout</button>
                <SearchArea />
                <LoginForm showForm={this.state.showForm.login} onSubmit={(eve) => { this.onSubmit(eve) }} />
                <PostAdForm showForm={this.state.showForm.newad} show={this.formValues} submitHandler={this.submitHandler} />
                <RegistryForm showForm={this.state.showForm.reg} />
                <DisplayBox ads={this.state.serverResponseGet} />
            </>
        )
    }
}

export default Dapati