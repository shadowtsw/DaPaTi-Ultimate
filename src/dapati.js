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
            test: ''
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
        this.getData('ad');
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

    rembemberLogin(eve) {
        if (this.state.loggedIn === "true") {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("token", this.state.token);
            this.setState({ loggedIn: "false" });
            this.setState({ logButtonToggle: "Login" });
            this.setState({ regButtonToggle: "Register" });
            this.setState({ token: "" })
        } else {
            if (this.state.token === "" || this.state.token === null || this.state.token === undefined) {
                alert("Keine gültigen Userdaten vorhanden ! Bitte neu einloggen")
            }
            else {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("token", this.state.token);
                this.setState({ loggedIn: "true" });
                this.setState({ logButtonToggle: "Logout" });
                this.setState({ regButtonToggle: "Un-Register" })
            }
        }
    }

    getData = (endpoint, token = "", container = "getWaste") => {
        API.apiAccessGet(this.state.serverUrl, endpoint, "GET", token)
            .then((res) => { this.setState({ serverResponseGet: res }); this.setState({ [container]: res }); /*console.log(res)*/ }) //commented bcs that console.log was annoying
            .catch((err) => { return err })
    }
    postData = (endpoint, token, body = {}, container = "postWaste") => {
        API.apiAccessPost(this.state.serverUrl, endpoint, "POST", token, body)
            .then((res) => { this.setState({ serverResponsePost: res }); this.setState({ [container]: res }); console.log(res) })
            .catch((err) => { return err })
    }
    userLogin = (userInformation, container = "userWaste") => {
        API.userLogin(this.state.serverUrl, userInformation)
            .then((res) => { this.setState({ token: res.token }); this.setState({ [container]: res }); console.log(res) })
            .then(()=>{this.rembemberLogin()})
            .catch((err) => { return err })
    }

    onSubmit = (eve) => {
        eve.preventDefault();
        let body = {
            email : eve.target[0].value,
            password : eve.target[1].value.toString()
        }
        if (eve.target[0].value && eve.target[1].value) {
            this.userLogin(body,"userLoginResponse")
            console.log(body)
        }
    }

    showForm(param) {
        let dummy = {...this.state.showForm}; //dummy obj for sorting
        dummy[param]=!dummy[param]; //toggles value of the showForm state (equivalent)
        let forms = Object.keys(dummy).filter((item) => item!==param); //lists other states in showForm (equivalent)
        forms.forEach(key => dummy[key]=false); //sets all others to false (so no two forms are open at the same time)
        this.setState(({ showForm: dummy })); //sets the (actual) showForm state to that of the updated dummy
      }

    render() {
        return (
            <>
                <Header update={this.showForm} logButtonToggle={this.state.logButtonToggle} regButtonToggle={this.state.regButtonToggle}/>
                <button onClick={() => { this.getData(this.state.endpoints.getAd, "", "waste") }}>Waste</button>
                <button onClick={() => { this.getData(this.state.endpoints.getAd, "", "somewhere") }}>Somewhere</button>
                <button onClick={() => { this.userLogin({ email: "", password: "" }) }}>Login</button>
                <SearchArea />
                <LoginForm showForm={this.state.showForm.login} onSubmit={(eve)=>{this.onSubmit(eve)}}/>
                <PostAdForm showForm={this.state.showForm.newad} show={this.formValues} submitHandler={this.submitHandler} />
                <RegistryForm showForm={this.state.showForm.reg}/>
                <DisplayBox ads={this.state.serverResponseGet} />
            </>
        )
    }
}

export default Dapati