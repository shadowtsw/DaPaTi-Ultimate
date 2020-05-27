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
        .catch((err) => {
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
        .catch((err) => {
            console.log(err)
        })
    this.setState({
        lastEdit: new Date()
    })
}
function updateRoutineMessageCenter() {
    this.props.getData("user/me/conversations", this.props.token)
    .then((resss) => {
        this.setState({ messageCenter: resss })

        let messageAufbau = {}
        this.state.messageCenter.forEach((conversation) => {
            
            


            this.props.getData(`/ad/${conversation.adId}/message/${conversation.userId}`, this.props.token)
                .then((res) => {

                    if(Array.isArray(res)) {
                        messageAufbau[conversation.adId] = res
                    }
           
                    
                })
                .catch((err) => {
                    // console.log(err)
                })
        })
        this.setState({ messages: messageAufbau })

    })
    .catch((err) => {
        console.log(err)
    })
}
function messageUpdater(adId,userId) {
    let messageAufbau = {}
    this.props.getData(`/ad/${adId}/message/${userId}`, this.props.token)
        .then((res) => {
            messageAufbau[adId] = res
            // newMap.set(conversation.adId, res)
            this.setState({ messages: messageAufbau })
        })
        .catch((err) => {
            console.log(err)
        })
}
//? Used by UserPage only
function getAccountInfo() {
    this.props.getData("user/me", this.props.token).then((res) => {
        this.setState({
            userInfo: res
        })
    })
    this.setState({
        lastEdit: new Date()
    })
}
//? Used by UserPage
function deleteCreatedAd(adId) {
    let confMsg = window.confirm("Möchten Sie es tatsächlich löschen?");
    if (confMsg === true) {
        this.props.deleteData(`ad/${adId}`, this.props.token, false)
        .then((res) => {
            console.log('res deleteSavedAd', res)
            alert("Anzeige erfolgreich gelöscht");
        })
        .then(() => {
            this.updateRoutineUser()
        })
        .catch((err) => {
            console.log('err deleteSavedAd', err)
            alert("Check Log for Details")
        })
    } else {
        alert("Nichts gelöscht");
    }
    
    this.updateRoutineUser()
}
//? Used by UserPage
function patchCreatedAd(adId) {
    this.props.patchData(`ad/${adId}`, this.props.token, { id: adId }, false)
        .then((res) => {
            console.log('res patchData', res)
            alert("Anzeige erfolgreich geändert")
        })
        .then(() => {
            this.updateRoutineUser()
        })
        .catch((err) => {
            console.log('err patchData', err)
            alert("Check Log for Details")
        })
}
export { patchCreatedAd, deleteCreatedAd, getAccountInfo, updateRoutineUser, messageUpdater, updateRoutineMessageCenter }