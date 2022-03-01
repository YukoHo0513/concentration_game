const baseAPI = "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH";
let cardsArr = [];
const firstRow = $(".first-row");
const secondRow = $(".second-row");
const thirdRow = $(".third-row");
const fourthRow = $(".fourth-row");
const fifthRow = $(".fifth-row");
const sixthRow = $(".sixth-row");

$.get(baseAPI, function(data) {
    $.get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=24`, function(cardsData) {
        displayCards(cardsData);
    })
})

function displayCards(data) {
    cardsArr = data.cards;
    let firstRowHtml = "";
    let secondRowHtml = "";
    let thirdRowHtml = "";
    let fourthRowHtml = "";

    cardsArr.forEach((card, index) => {
        if (index >= 0 && index <= 5 ) {
            firstRowHtml += `
                <div class="col-2">
                    <img src="${card.image}" alt="${card.value} of ${card.suit}">
                </div>
            `
        } else if (index >= 6 && index <= 11) {
            secondRowHtml += `
                <div class="col-2">
                    <img src="${card.image}" alt="${card.value} of ${card.suit}">
                </div>
            `
        } else if (index >= 12 && index <= 17) {
            thirdRowHtml += `
                <div class="col-2">
                    <img src="${card.image}" alt="${card.value} of ${card.suit}">
                </div> 
            `
        } else if (index >= 18 && index <= 23) {
            fourthRowHtml += `
                <div class="col-2">
                    <img src="${card.image}" alt="${card.value} of ${card.suit}">
                </div> 
            `
        }
    });
    firstRow.html(firstRowHtml);
    secondRow.html(secondRowHtml);
    thirdRow.html(thirdRowHtml);
    fourthRow.html(fourthRowHtml);
}

