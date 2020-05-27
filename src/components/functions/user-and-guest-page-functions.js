//? Used by UserPage and GuestPage
function changeTab(eve, add = "") {
    // console.log(eve.target.textContent)
    if (add === "") {
        this.setState({
            activeTab: eve.target.textContent
        })
    } else {
        this.setState({
            activeTab: add
        })
    }

    if (this.state.activeTab === "Eigene Anzeigen" || this.state.activeTab === "Gespeicherte Anzeigen") {
        this.updateRoutineBasic()
        this.updateRoutineUser()
    }
}
//? Used by UserPage and GuestPage
function searchFunction(eve) {
    eve.preventDefault();
    // console.log(eve.target)

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
            // console.log(res)
            let sortedAds = new Map();
            res.forEach((article) => {
                sortedAds.set(article.id, article)
            })
            this.setState({ searchedAds: sortedAds })
        })
        .then(()=>{
            this.updateRoutineBasic()
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
        .catch((err)=>{
            console.log(err)
        })
    this.setState({
        lastEdit: new Date()
    })
}
//? Used by UserPage and GuestPage
function selectAd(id, origin = "") {
    // console.log(id)
    if (origin === "Suche Ergebnis") {
        this.setState({
            singleAd: this.state.searchedAds.get(id)
        })
    } else {
        this.setState({
            singleAd: this.state.sortedAd.get(id)
        })
    }
    this.setState({
        activeTab: "Einzelartikel"
    })
}

function submitHandler(eve)  {
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

    if (this.props.tokenAvailable === true) {
        // console.log(this.state.token);
        // console.log(typeof (this.state.token))
        this.props.postData('user/me/ad', this.props.token, adDataUser)
            .then((res) => {
                console.log('mit token', res)
                // this.postData(`user/me/saved-ad/${res.id}`, this.state.token, { id: res.id })
                //     .then((ress) => {
                //         console.log('save-ad-response', ress)
                //     })
                //     .catch((err) => {
                //         console.log('save-ad-error', err)
                //     })
            }).then(() => {
                this.updateRoutineBasic()
                this.updateRoutineUser()
            })
            .catch((err) => {
                console.log('mit-token', err)
            })
    }
    else {
        this.props.postData('ad', this.props.token, adData).then((res) => {
            // console.log('else ohne token', res)
        }).then(() => {
            this.updateRoutineBasic()
        }).catch((err) => {
            console.log('alles kaputt');
        });
    }
    this.setState({activeTab: 'Übersicht'});
    
}

export {selectAd, updateRoutineBasic, searchFunction, changeTab, submitHandler}