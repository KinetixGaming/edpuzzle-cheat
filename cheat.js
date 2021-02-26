// ==UserScript==
// @name         Edpuzzle Cheats REAL
// @version      1
// @description  Gets Ed Puzzle awnsers
// @author       Kinetix
// @match        *://edpuzzle.com/assignments/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

let tries = 0;
let worked = false;

function retrieveAssignmentID() {
    return new URL(document.URL).pathname.split('/')[2]
}

function xmlRequest() {
    const XML = new XMLHttpRequest();
    XML.open('GET', `${'https://edpuzzle.com/api/v3/assignments/'}${retrieveAssignmentID()}${''}`, true);
    XML.onerror = (Filler) => {
        worked = false;
        tries++;
        xmlRequest()
    };
    XML.onload = (Filler) => {
        jsonData(XML.response)
    };
    XML.send()
}

function jsonData(Data) {
    let i = 0;
    let json = JSON.parse(Data);
    json['medias'][0]['questions'].forEach((questions) => {
        i++;
        if (questions.type === 'multiple-choice') {
            questions['choices'].forEach((choices) => {
            if(choices['isCorrect'] == true) {
                var textFinal = choices['body'][0]['html'];
                console.log(`Q${i} - ` + textFinal.replaceAll(/<[^>]*>/ig, ""));
            }
        })
       } else {
           console.log(`Q${i} - Written response`);
       }

    })
    console.info("Sometimes the question order is randomized, look at each question and match it with an answer in the console.")
    alert('Answers are in the console. Open it via Inspect Element. - Kinetix');
}

setTimeout(() => {
    console.clear();
    xmlRequest()
}, 1000)
