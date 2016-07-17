# Microsoft Botframework Direct Line API library
The Direct Line API is a simple REST API for connecting directly to a single bot. This API is intended for developers writing their own client applications, web chat controls, or mobile apps that will talk to their bot.

https://docs.botframework.com/en-us/restapi/directline/

## API

```
var client = require('directline-api');
client.getToken(secret);

client.createConversation(token);

client.postMessage(token, conversationId, message);

client.postFileMessage(token, conversationId, formData);

client.getMessages(token, conversationId, [watermark]);

client.generateConversationAndToken(secret);

client.renewConversationToken(token, conversationId);

```

> Check out test/test.js for samples.

## Run Test
```
npm install
touch test/conf.json # ADD secret as 'DIRECT_LINE_SECRET'
npm test
```