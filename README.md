# Microsoft Botframework Direct Line API library
![](https://camo.githubusercontent.com/ae91a5698ad80d3fe8e0eb5a4c6ee7170e088a7d/687474703a2f2f37786b6571692e636f6d312e7a302e676c622e636c6f7564646e2e636f6d2f61692f53637265656e25323053686f74253230323031372d30342d30342532306174253230382e32302e3437253230504d2e706e67)

# welcome
The Direct Line API is a simple REST API for connecting directly to a single bot. This API is intended for developers writing their own client applications, web chat controls, or mobile apps that will talk to their bot.

https://docs.botframework.com/en-us/restapi/directline/

## Install
```
npm install directline-api
```

## API

> Check out test/test.js for samples.

```
var client = require('directline-api');
// get a token
client.getToken(secret);

// create a conversation
client.createConversation(token);

// post a message in a conversation
client.postMessage(token, conversationId, {
                text: 'YOUR_TEXT'
            });

// post a message with an userId, userId is your unique id for message sender.
client.ask(token, conversationId, {
                        text: 'YOUR_TEXT',
                        from: 'FROM_USERID'
                    });

// post a file in a conversation
client.postFileMessage(token, conversationId, formData);

// get messages in a conversation
client.getMessages(token, conversationId, [watermark]);

// generate a new conversation and token
client.generateConversationAndToken(secret);

// renew a token for a conversation
client.renewConversationToken(token, conversationId);

// request with a text and get response
// https://docs.botframework.com/en-us/restapi/directline/#!/Conversations/Conversations_PostMessage
client.ask(token, conversationId, body);

```

## Run Test
```
npm install
touch test/conf.json # ADD secret as 'DIRECT_LINE_SECRET'
npm test
```