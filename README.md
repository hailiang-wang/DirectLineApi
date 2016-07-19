# Microsoft Botframework Direct Line API library
The Direct Line API is a simple REST API for connecting directly to a single bot. This API is intended for developers writing their own client applications, web chat controls, or mobile apps that will talk to their bot.

https://docs.botframework.com/en-us/restapi/directline/

## API

```
var client = require('directline-api');
// get a token
client.getToken(secret);
// create a conversation
client.createConversation(token);
// post a message in a conversation
client.postMessage(token, conversationId, message);
// post a file in a conversation
client.postFileMessage(token, conversationId, formData);
// get messages in a conversation
client.getMessages(token, conversationId, [watermark]);
// generate a new conversation and token
client.generateConversationAndToken(secret);
// renew a token for a conversation
client.renewConversationToken(token, conversationId);
// request with a text and get response
client.ask(token, conversationId, content);

```

> Check out test/test.js for samples.

## Run Test
```
npm install
touch test/conf.json # ADD secret as 'DIRECT_LINE_SECRET'
npm test
```