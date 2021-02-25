let tries = 0;
let worked = false;

function retrieveAssignmentID() {
    return new URL(document.URL).pathname.split('/')[2]
}

function xmlRequest() {
    const XML = new XMLHttpRequest();
    XML.open(('GET', `${'https://edpuzzle.com/api/v3/assignments/'}${getAssignment()}${''}`, true));
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
        questions['choices'].forEach((choices) => {
            if(choices['isCorrect'] == true) {
                var textFinal = choices['body'][0]['html'];
                console.log(`Q${i} - ` + textFinal.replaceAll(/<[^>]*>/ig, ""));
            }
        })

    })
    alert('Answers are in the console. Open it via Inspect Element. - Kinetix');
}

setTimeout(() => {
    console.clear();
    xmlRequest()
}, 1000)
