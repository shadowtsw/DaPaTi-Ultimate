import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import DisplayBox from './components/DisplayBox';
import PostAdForm from './components/PostAdForm';
import SingleAd from './components/SingleAd';
import SearchBar from './components/SearchBar';
import { selectAd, updateRoutineBasic, searchFunction, changeTab, submitHandler } from './components/functions/user-and-guest-page-functions';
import { patchCreatedAd, deleteCreatedAd, getAccountInfo, updateRoutineUser, messageUpdater, updateRoutineMessageCenter } from './components/functions/user-page-functions';
import MessageBoxWrapper from './components/MessageBoxWrapper';

//! MainComponent LoggedIn
export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.changeTab = changeTab.bind(this);
        this.submitHandler = submitHandler.bind(this);
        this.searchFunction = searchFunction.bind(this);
        this.updateRoutineBasic = updateRoutineBasic.bind(this);
        this.updateRoutineUser = updateRoutineUser.bind(this);
        this.getAccountInfo = getAccountInfo.bind(this);
        this.deleteCreatedAd = deleteCreatedAd.bind(this);
        this.patchCreatedAd = patchCreatedAd.bind(this);
        this.selectAd = selectAd.bind(this);
        this.messageUpdater = messageUpdater.bind(this);
        this.updateRoutineMessageCenter = updateRoutineMessageCenter.bind(this);
        this.state = {
            activeTab: "Übersicht",
            savedAds: null,
            searchedAds: null,
            userAds: null,
            messageCenter: null,
            sortedAd: null,
            singleAd: null,
            messages: {},
            userInfo: {
                id: "",
                name: "",
                email: ""
            }
        }
    }
    componentDidMount() {
        this.updateRoutineBasic();
        this.updateRoutineUser()
        this.getAccountInfo();
        this.updateRoutineMessageCenter();
    };
    saveAd() {
        if (this.state.savedAds.get(this.state.singleAd.id)) {
            alert("Anzeige wurde bereits gespeichert, schau in deine Merkliste")
            this.updateRoutineBasic()
            this.updateRoutineUser()
            return;
        }
        this.props.postData(`user/me/saved-ad/${this.state.singleAd.id}`, this.props.token, "")
            .then((res) => {
                // console.log('res saveAd', res)
            })
            .then(() => {
                this.updateRoutineUser()
            })
            .catch((err) => {
                console.log('err saveAd', err)
            })
    }
    deleteSavedAd(adId) {
        this.props.deleteData(`user/me/saved-ad/${adId}`, this.props.token, false)
            .then((res) => {
                // console.log('res deleteSavedAd', res)
            })
            .then(() => {
                this.updateRoutineUser()
            })
            .catch((err) => {
                console.log('err deleteSavedAd', err)
            })
    }
    editAd(id) {
        this.setState({
            editAd: this.state.userAds.get(id)
        })
        this.setState({
            activeTab: "Anzeige bearbeiten"
        })
    }
    sendMessage(eve, adId, userId) {
        eve.preventDefault();

        console.log(adId)
        console.log(userId)
        console.log(eve.target[0].value)

        this.props.postData(`ad/${adId}/message/${userId}/`, this.props.token, { text: eve.target[0].value })
            .then((res) => {
                console.log(res)
            })
            .then(()=>{
                alert("Nachricht erfolgreich abgeschickt")
                this.updateRoutineMessageCenter()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    writeMessage(adId,userId){

        let x = prompt()

        this.props.postData(`ad/${adId}/message/${userId}/`, this.props.token, { text: x })
            .then((res) => {
                console.log(res)
            })
            .then(()=>{
                alert("Nachricht erfolgreich abgeschickt")
                this.updateRoutineMessageCenter()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        let maincontent;
        let sucheErgebnis;
        let content = new Map([
            ["Übersicht", <DisplayBox ads={this.state.sortedAd} origin="Übersicht" selectAd={(id) => this.selectAd(id)} />],
            ["Suche Ergebnis", <DisplayBox ads={this.state.searchedAds} origin="Suche Ergebnis" selectAd={(id) => this.selectAd(id, "Suche Ergebnis")} />],
            ["Anzeige Aufgeben", <PostAdForm new={true} name={this.props.name} email={this.props.email} submitHandler={this.submitHandler} />],
            ["Eigene Anzeigen", <div className="box has-background-light has-text-centered"><h3 className="title">Eigene Anzeigen</h3><DisplayBox ads={this.state.userAds} origin="Eigene Anzeigen" meineId={this.props.id} deleteCreatedAd={(id) => { this.deleteCreatedAd(id) }} editAd={(id) => { this.editAd(id) }} /> </div>],
            ["Gespeicherte Anzeigen", <div className="box has-background-light has-text-centered"><h3 className="title">Gespeicherte Anzeigen</h3><DisplayBox ads={this.state.savedAds} origin="Gespeicherte Anzeigen" meineId={this.props.id} deleteSavedAd={(id) => { this.deleteSavedAd(id) }} writeMessage={(adId,userId) => { this.writeMessage(adId,userId) }} /> </div>],
            ["Message Center", <div className="box has-background-light has-text-centered"><h3 className="title">Message Center</h3> <MessageBoxWrapper meineId={this.props.id} conversation={this.state.messages} sendMessage={(eve, adId, userId)=>this.sendMessage(eve, adId, userId)} /> </div>], //<DisplayBox origin="Message Center" ads={this.state.messages}/>
            ["Account-Info", <div className="box has-background-light"><h3 className="title">Account-Info</h3><p className="subtitle">ID: {this.state.userInfo.id}</p><p>Name: {this.state.userInfo.name}</p><p>Email: {this.state.userInfo.email}</p></div>],
            ["Einzelartikel", <SingleAd singleAd={this.state.singleAd} savedAds={this.state.savedAds} saveAd={() => { this.saveAd() }} token={this.props.token} deleteSavedAd={(id) => { this.deleteSavedAd(id) }} />],
            ["Anzeige bearbeiten", <PostAdForm editAd={this.state.editAd} new={false} name={this.props.name} email={this.props.email} submitHandler={this.props.submitHandlerUpdate} />],
        ])
        maincontent = content.get(this.state.activeTab)

        if (this.state.searchedAds) {
            sucheErgebnis =
                <li className={this.state.activeTab === "Suche Ergebnis" ? "is-active" : undefined} onClick={(eve) => { this.changeTab(eve, "Suche Ergebnis") }}><a href="#!">Suche Ergebnis {this.state.searchedAds.length}</a>
                </li>
        }

        return (<>

            <SearchBar searchFunction={(eve) => this.searchFunction(eve)} />
            <div className="tabs is-medium is-boxed is-centered">
                <ul>
                    <li className={this.state.activeTab === "Übersicht" ? 'is-active' : undefined} onClick={(eve) => { this.changeTab(eve); this.updateRoutineBasic() }}><a href="#!">Übersicht</a>
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