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
            this.updateRoutineUser()
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

export {selectAd, updateRoutineBasic, searchFunction, changeTab}