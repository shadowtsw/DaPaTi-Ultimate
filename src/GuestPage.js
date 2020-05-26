import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import DisplayBox from './components/DisplayBox';
import PostAdForm from './components/PostAdForm';
import RegistryForm from './components/RegistryForm';
import RegistrySuccess from './components/RegistrySuccess';
import RegistryFail from './components/RegistryFail';
import SingleAd from './components/SingleAd';
import SearchBar from './components/SearchBar';
import {selectAd, updateRoutineBasic, searchFunction, changeTab} from './components/functions/user-and-guest-page-functions';



export default class GuestPage extends React.Component {
    constructor(props) {
        super(props);
        this.changeTab = changeTab.bind(this);
        this.searchFunction = searchFunction.bind(this);
        this.updateRoutineBasic = updateRoutineBasic.bind(this);
        this.selectAd = selectAd.bind(this);
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
        // console.log(eve.target)
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

    render() {
        let maincontent;
        let sucheErgebnis;
        let content = new Map([
            ['Übersicht', <DisplayBox ads={this.state.sortedAd} origin="Übersicht" selectAd={(id) => this.selectAd(id)} />],
            ["Suche Ergebnis", <DisplayBox ads={this.state.searchedAds} origin="Suche Ergebnis" selectAd={(id) => this.selectAd(id, "Suche Ergebnis")} />],
            ['Anzeige Aufgeben', <PostAdForm new={true} name={"Gast"} submitHandler={this.props.submitHandler} />],
            ['Registrieren', <RegistryForm onSubmit={(eve) => { this.register(eve) }} />],
            ['Registrieren Erfolgreich', <RegistrySuccess userInfo={this.state.userInfo} />],
            ['Registrieren Fehlgeschlagen', <RegistryFail />],
            ["Einzelartikel", <SingleAd singleAd={this.state.singleAd} savedAds={this.state.savedAds} saveAd={() => { this.saveAd() }} token={this.props.token} />]
        ])

        maincontent = content.get(this.state.activeTab);

        if (this.state.searchedAds) {
            sucheErgebnis =
                <li className={this.state.activeTab === "Suche Ergebnis" ? "is-active" : undefined} onClick={(eve) => { this.changeTab(eve, "Suche Ergebnis") }}><a href="#!">Suche Ergebnis {`(${this.state.searchedAds.length})`}</a>
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