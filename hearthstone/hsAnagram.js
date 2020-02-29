const fs = require('fs');
const axios = require('axios')

const hsUrl = 'https://api.hearthstonejson.com/v1/31353/enUS/cards.json';
//get cards database from url
let cards = [];

async function getCards() {
    try {
        const response = await axios.get(hsUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    cards = await getCards()
    console.log("Finish loading cards")
})();



module.exports = anagram => {
    //let anagrams = [];
    if (cards.length === 0) {
        return "Cards are not ready"
    }
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].name)
            continue;
        card1 = cards[i].name.toLowerCase().split("").sort().join("").split(" ").join("");
        card2 = anagram.toLowerCase().split("").sort().join("").split(" ").join("");
        if (card1 === card2)
            // anagrams.push(cards[i].name);
            return cards[i].name;
    }
    // if (anagrams.length === 0)
    //     return "No such card";
    // return anagrams.join(" ");
    return "No such card";
}