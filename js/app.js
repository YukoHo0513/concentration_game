const baseAPI = "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH";
let cardsArr = [];
const firstRow = $(".first-row");
const secondRow = $(".second-row");
const thirdRow = $(".third-row");
const fourthRow = $(".fourth-row");
const fifthRow = $(".fifth-row");
const sixthRow = $(".sixth-row");
const startButton = $(".btn-outline-info");
const bigOverlay = $(".big-overlay");

startButton.on("click", function() {
    $(this).hide();
    bigOverlay.hide();
    let hour = 0;
    let minute = 0;
    let second = 0;
    start();
    function start() {
        setInterval(() => { 
            second++;
            timer();
        }, 1000);
    }
    function timer() {
        if (second == 60) {
            second = 0;
            minute++;
        }
        if (minute == 60) {
            minute = 0;
            hour++;
        }
        $("#hour").html(returnData(hour));
        $("#minute").html(returnData(minute));
        $("#second").html(returnData(second));
    }
    function returnData(input) {
        return input > 10 ? input : `0${input}`;
    }

})

$.get(baseAPI, function(data) {
    $.get(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=24`, function(cardsData) {
        displayCards(cardsData);
        const overlayCards = $(".clicked-div");
        let count = 0;
        let storedNum = 0;
        let previousIndex = 0;
        let box = $(".box");
        overlayCards.on("click", function() {
            $(this).removeClass("overlay");
            count += 1;
            const indexNum = parseInt($(this).parent().attr("data-index"));
            if (count % 2 !== 0) {
                storedNum = cardsArr[indexNum].value;
                previousIndex = indexNum;
                if (typeof storedNum === 'string') {
                    if (storedNum === "JACK") {
                        storedNum = 11;
                    } else if (storedNum === "QUEEN") {
                        storedNum = 12;
                    }
                }
                console.log(storedNum);
            } else if (count % 2 === 0) {
                let secondNum = cardsArr[indexNum].value;
                if (typeof storedNum === 'string') {
                    if (secondNum === "JACK") {
                        secondNum = 11;
                    } else if (storedNum === "QUEEN") {
                        secondNum = 12;
                    }
                }
                if (storedNum === secondNum) {
                    console.log("Matched!");
                } else {
                    const target = $(this);
                    const addOverlay = function() {
                        target.addClass('overlay');
                        for (let j = 0; j < box.length; j++) {
                            if (parseInt($(box[j]).attr("data-index")) === previousIndex) {
                                $(box[j]).children().last().addClass("overlay");
                            }
                        }
                    }
                    setTimeout(addOverlay, 2000)
                }

                if ($(box).children().last().attr('class') === "clicked-div") {

                }
            } 
            console.log("count", count);
        })
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
                <div class="col-2 mb-4">
                    <div class="box" data-index="${index}">
                        <img src="${card.image}" alt="${card.value} of ${card.suit}">
                        <div class="overlay clicked-div"></div>
                    </div>
                </div>
            `
        } else if (index >= 6 && index <= 11) {
            secondRowHtml += `
                <div class="col-2 mb-4">
                    <div class="box" data-index="${index}">
                        <img src="${card.image}" alt="${card.value} of ${card.suit}">
                        <div class="overlay clicked-div"></div>
                    </div>
                </div>
            `
        } else if (index >= 12 && index <= 17) {
            thirdRowHtml += `
                <div class="col-2 mb-4">
                    <div class="box" data-index="${index}">
                        <img src="${card.image}" alt="${card.value} of ${card.suit}">
                        <div class="overlay clicked-div"></div>
                    </div>
                </div>
            `
        } else if (index >= 18 && index <= 23) {
            fourthRowHtml += `
                <div class="col-2 mb-4">
                    <div class="box" data-index="${index}">
                        <img src="${card.image}" alt="${card.value} of ${card.suit}">
                        <div class="overlay clicked-div"></div>
                    </div>
                </div>
            `
        }
    });
    firstRow.html(firstRowHtml);
    secondRow.html(secondRowHtml);
    thirdRow.html(thirdRowHtml);
    fourthRow.html(fourthRowHtml);
}


