let MessagingHub = require('messaginghub-client');
let WebSocketTransport = require('lime-transport-websocket');
let Lime = require('lime-js');
const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('./credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

// Messaging HUB do BLIP
let client = new MessagingHub.ClientBuilder()
    .withIdentifier('nodebot2')
    .withAccessKey('ZEpZZWNsQUQ3ejZOUkpnR2NmTDA=')
    .withTransportFactory(() => new WebSocketTransport())
    .build();

// Recebendo a mensagem do CHAT
client.addMessageReceiver(true, function (message) {
    console.log(message);
});

client.addMessageReceiver(true, function (message) {
    if (message) {
        switch (message.content) {
            case 'Hi':
                message.content = "Hello, what would you like to know about?";
                SendMessage(message);
                break;
            case 'hi':
                message.content = "Hello, what would you like to know about?";
                SendMessage(message);
                break;                
            case 'Hello':
                message.content = "Hello, what would you like to know about?";
                SendMessage(message);
                break;
            case 'hello':
                message.content = "Hello, what would you like to know about?";
                SendMessage(message);
                break;                
            case 'Bye':
                message.content = "Good-bye";
                SendMessage(message);
                break;     
            case 'bye':
                message.content = "Good-bye";
                SendMessage(message);
                break;                           
            default:
                robot(message);
        }
    }
});

async function robot(message) {
    await fetchContentFromWikipedia(message)
    sanitizeContent(message)
    breakContentIntoSentences(message)
    limitMaximumSentences(message)
    JoinSentences(message);
    SendMessage(message);
}

async function fetchContentFromWikipedia(message) {
    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
    const wikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2?timeout=300")
    const wikipediaResponse = await wikipediaAlgorithm.pipe(message.content)
    const wikipediaContent = wikipediaResponse.get()

    message.sourceWikipediaOriginal = wikipediaContent.content;
}

function sanitizeContent(message) {
    const withoutBlankLinesandMarkdown = removeBlankLinesAndMarkdown(message.sourceWikipediaOriginal)
    const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesandMarkdown)

    message.sourceWikipediaSanitized = withoutDatesInParentheses
    function removeBlankLinesAndMarkdown(text) {
        const allLines = text.split('\n')

        const withoutBlankLinesandMarkdown = allLines.filter((line) => {
            if (line.trim().length === 0 || line.trim().startsWith('=')) {
                return false;
            }
            return true;
        })

        return withoutBlankLinesandMarkdown.join(' ')
    }

    function removeDatesInParentheses(text) {
        //return text.replace(/\((?:\([^()]*/)|[^()])*|)/gm, '').replace(/  /g, ' ')
        //return text.replace(/[^a-zA-Z0-9]/g,' ');
        return text.replace(/\ /g, ' ')
    }
}

function breakContentIntoSentences(message) {
    message.sentences = []

    const sentences = sentenceBoundaryDetection.sentences(message.sourceWikipediaSanitized)
    sentences.forEach((sentence) => {
        message.sentences.push({
            text: sentence,
            keywords: [],
            images: []
        })
    })
}

function limitMaximumSentences(message) {
    message.sentences = message.sentences.slice(0, 4);
}

function JoinSentences(message) {
    var str1 = message.sentences[0].text.concat(' ');
    var str2 = message.sentences[1].text.concat(' ');
    var resp = " Would you like to know anything else?";

    var aux = str1.concat(str2);
    text = aux.concat(resp);
    message.content = text;
}

function SendMessage(message) {
    var msg = { type: "text/plain", content: message.content, to: message.from, id: Lime.Guid() };
    console.log(msg);
    client.sendMessage(msg);
    return false;
};

client.connect()
    .then(function (session) {
        console.log('Connected');
    })
    .catch(function (err) {
        console.log(err);
    });