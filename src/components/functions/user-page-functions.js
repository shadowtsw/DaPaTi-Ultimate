//? Used by UserPage only
function updateRoutineUser() {

    const filterParam = encodeURIComponent(JSON.stringify({ offset: 0, where: { userId: this.props.id } }));
    this.props.getData("ad?filter=" + filterParam, this.props.token)
        .then((res) => {
            let userAds = new Map();
            res.forEach((article) => {
                userAds.set(article.id, article)
            })
            this.setState({ userAds: userAds })
        })
        .catch((err)=>{
            console.log(err)
        })

    this.props.getData("user/me/saved-ad", this.props.token)
        .then((res) => {
            let sortedAds = new Map();
            res.forEach((article) => {
                sortedAds.set(article.id, article)
            })
            this.setState({ savedAds: sortedAds })
        })
        .catch((err)=>{
            console.log(err)
        })
    this.props.getData("user/me/conversations", this.props.token)
        .then((res) => {
            this.setState({ messageCenter: res })
        })
    this.setState({
        lastEdit: new Date()
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
    this.props.deleteData(`ad/${adId}`, this.props.token, false)
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
//? Used by UserPage
function patchCreatedAd(adId) {
    this.props.patchData(`ad/${adId}`, this.props.token, { id: adId }, false)
        .then((res) => {
            console.log('res patchData', res)
            alert("Anzeige erfolgreich geändert")
        })
        .catch((err) => {
            console.log('err patchData', err)
            alert("Check Log for Details")
        })
    this.updateRoutineUser()
}
 export {patchCreatedAd, deleteCreatedAd, getAccountInfo, updateRoutineUser}