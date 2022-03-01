const baseAPI = "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH";

fetch(baseAPI) 
    .then(response => response.json())
    .then(data => data["deck_id"])
    .then(createDeckAPI)
    .catch(error => console.log("There was a problem:", error))

function createDeckAPI(data) {
    const deckAPI = `https://deckofcardsapi.com/api/deck/${data}/draw/?count=24`;
    return fetch(deckAPI)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log("There was an error", error))
}


