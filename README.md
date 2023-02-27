# Chatbot with NodeJs and Blip.io
Chatbot created with NodeJS, integrated with the BLIP platform and that uses Algorithmia to search Wikipedia.

# How does Chatbot work?
The chatbot filters the received message and sends it to Wikipedia, the response undergoes content sanitization, the same content is broken into sentences that best define the received message, and these sentences are returned to the user as a response.


# Installing the dependencies
$ npm install

# Creating the Bot
Access blip.ai
Register and create bot.
Get the bot's credentials.
Adding Bot Credentials in Code
Add blip identifier and access key in index.js file

# running the bot
$ node index.js
