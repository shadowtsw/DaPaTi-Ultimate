import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import DisplayBox from './components/DisplayBox';
import PostAdForm from './components/PostAdForm';
import SingleAd from './components/SingleAd';
import SearchBar from './components/SearchBar';
import { selectAd, updateRoutineBasic, searchFunction, changeTab } from './components/functions/user-and-guest-page-functions';
import { patchCreatedAd, deleteCreatedAd, getAccountInfo, updateRoutineUser } from './components/functions/user-page-functions';

//! MainComponent LoggedIn
export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.changeTab = changeTab.bind(this);
        this.searchFunction = searchFunction.bind(this);
        this.updateRoutineBasic = updateRoutineBasic.bind(this);
        this.updateRoutineUser = updateRoutineUser.bind(this);
        this.getAccountInfo = getAccountInfo.bind(this);
        this.deleteCreatedAd = deleteCreatedAd.bind(this);
        this.patchCreatedAd = patchCreatedAd.bind(this);
        this.selectAd = selectAd.bind(this);
        this.state = {
            activeTab: "Übersicht",
            savedAds: null,
            searchedAds: null,
            userAds: null,
            messageCenter: null,
            sortedAd: null,
            singleAd: null,
            messages: null,
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
                alert("Anzeige erfolgreich gespeichert")
            })
            .then(()=>{
                this.updateRoutineUser()
            })
            .catch((err) => {
                console.log('err saveAd', err)
                alert("Check Log for Details???")
            })
    }
    deleteSavedAd(adId) {
        this.props.deleteData(`user/me/saved-ad/${adId}`, this.props.token, false)
            .then((res) => {
                // console.log('res deleteSavedAd', res)
                alert("Anzeige erfolgreich gelöscht")
            })
            .then(()=>{
                this.updateRoutineUser()
            })
            .catch((err) => {
                console.log('err deleteSavedAd', err)
                alert("Check Log for Details")
            })        
    }
    editAd(id) {
        this.setState({
            editAd: this.state.userAds.get(id)
        })
        this.setState({
            activeTab: "Anzeige bearbeiten"
        })
        .then(()=>{
            this.updateRoutineUser()
        })
    }
    messageHandler(eve) {
        this.setState({
            messageText: eve.target.value
        })
    }
    writeMessage(ad) {

        console.log(ad)

        // if (!this.state.messages.get(ad.id)) {

        // }

        let newArray
        let layout =
            <>
                <h3>Message Test</h3>
                <h4>Zu Artikel {ad.title}</h4>
                <h4>Empfänger {ad.userId}</h4>
                <h4>Von</h4>
                <input type="text" name="message" onChange={(eve) => { this.messageHandler(eve) }} />
                <button onClick={() => { this.sendMessage(ad.id, ad.userId, this.state.messageText) }}>Send</button>
            </>

        newArray = new Map();
        newArray.set(ad.id, layout)

        this.setState({
            messages: newArray
        })

    }
    sendMessage(adId, userId, usertext) {
        this.props.postData(`/ad/${adId}/message/${userId}`, this.props.token, { text: usertext })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // updateMessages(){
    //     this.messageCenter.forEach((conversation)=>{
    //         this.props.getData(`/ad/${conversation.adId}/message/${conversation.userId}`, this.props.token)
    //         .then((res)=>{
    //             this.messages.set(conversation.adId, res)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    //     })
    // }

    render() {
        let maincontent;
        let sucheErgebnis;
        let content = new Map([
            ["Übersicht", <DisplayBox ads={this.state.sortedAd} origin="Übersicht" selectAd={(id) => this.selectAd(id)} />],
            ["Suche Ergebnis", <DisplayBox ads={this.state.searchedAds} origin="Suche Ergebnis" selectAd={(id) => this.selectAd(id, "Suche Ergebnis")} />],
            ["Anzeige Aufgeben", <PostAdForm new={true} name={this.props.name} email={this.props.email} submitHandler={this.props.submitHandler} />],
            ["Eigene Anzeigen", <div className="box has-background-light"><h3 className="title">Eigene Anzeigen</h3><DisplayBox ads={this.state.userAds} origin="Eigene Anzeigen" meineId={this.props.id} deleteCreatedAd={(id) => { this.deleteCreatedAd(id) }} editAd={(id) => { this.editAd(id) }} /> </div>],
            ["Gespeicherte Anzeigen", <div className="box has-background-light"><h3 className="title">Gespeicherte Anzeigen</h3><DisplayBox ads={this.state.savedAds} origin="Gespeicherte Anzeigen" meineId={this.props.id} deleteSavedAd={(id) => { this.deleteSavedAd(id) }} writeMessage={(ad) => { this.writeMessage(ad) }} /> </div>],
            ["Message Center", <div className="box has-background-light"><h3 className="title">Message Center</h3><DisplayBox origin="Message Center" ads={this.state.messages}/></div>],
            ["Account-Info", <div className="box has-background-light"><h3 className="title">Account-Info</h3><p className="subtitle">ID: {this.state.userInfo.id}</p><p>Name: {this.state.userInfo.name}</p><p>Email: {this.state.userInfo.email}</p></div>],
            ["Einzelartikel", <SingleAd singleAd={this.state.singleAd} savedAds={this.state.savedAds} saveAd={() => { this.saveAd() }} token={this.props.token} deleteSavedAd={(id) => { this.deleteSavedAd(id) }} />],
            ["Anzeige bearbeiten", <PostAdForm editAd={this.state.editAd} new={false} name={this.props.name} email={this.props.email} submitHandler={this.props.submitHandlerUpdate} />],
        ])
        maincontent = content.get(this.state.activeTab)

        if (this.state.searchedAds) {
            sucheErgebnis =
                <li className={this.state.activeTab === "Suche Ergebnis" ? "is-active" : undefined} onClick={(eve) => { this.changeTab(eve, "Suche Ergebnis") }}><a href="#!">Suche Ergebnis</a>
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