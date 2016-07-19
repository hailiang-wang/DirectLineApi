var test = require('ava');
var directLineAPI = require('../');
var conf = require('./conf.json');
var fs = require('fs');
var shortid = require('shortid');

test.cb('DirectLineAPI#getToken', t => {
    // t.deepEqual([1, 2], [1, 2]);
    directLineAPI.getToken(conf.DIRECT_LINE_SECRET)
        .then(function(token) {
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        })
});

test.cb('DirectLineAPI#createConversation', t => {
    // t.deepEqual([1, 2], [1, 2]);
    directLineAPI.getToken(conf.DIRECT_LINE_SECRET)
        .then(function(token) {
            return directLineAPI.createConversation(token);
        })
        .then(function(result) {
            // { conversationId: '6HE3lR5Hgh8',
            // token: 'snoZV1MiBEA.dAA.NgBIAEUAMwBsAFIANQBIAGcAaAA4AA.Hyg15uvf0QE.T7nOaFFEZCQ.bKVNlRmfCd3uH1Ump-CYJQQGmPU9aSCVhF7b1mQLJEk' }
            t.pass();
            t.end();
        })
        .fail(function(err) {
            console.log('createConversation>>', err);
            t.fail();
            t.end();
        })
});

test.cb('DirectLineAPI#postMessage', t => {
    directLineAPI.getToken(conf.DIRECT_LINE_SECRET)
        .then(function(token) {
            return directLineAPI.createConversation(token);
        })
        .then(function(result) {
            return directLineAPI.postMessage(result.token, result.conversationId, {
                text: 'message'
            });
        })
        .then(function(result) {
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        });
});


test.skip.cb('DirectLineAPI#getMessages', t => {
    directLineAPI.getMessages(conf.DIRECT_LINE_TOKEN, 'BOqaXkXeNTL', 0)
        .then(function(result) {
            // {                                                                                                                                                   [19/1989]  "messages": [
            //     {
            //       "id": "6HE3lR5Hgh8|000000000000000001",
            //       "conversationId": "6HE3lR5Hgh8",
            //       "created": "2016-07-17T05:04:36.8465036Z",
            //       "from": "Dm7wEZR41W2",
            //       "text": "foo222",
            //       "images": [],
            //       "attachments": [],
            //       "eTag": "W/\"datetime'2016-07-17T05%3A04%3A36.7612077Z'\""
            //     },
            //     {
            //       "id": "6HE3lR5Hgh8|000000000000000002",
            //       "conversationId": "6HE3lR5Hgh8",
            //       "created": "2016-07-17T05:04:45.7492655Z",
            //       "from": "dagama_rebecca",
            //       "text": "Tell me about it...\n",
            //       "images": [],
            //       "attachments": [],
            //       "eTag": "W/\"datetime'2016-07-17T05%3A04%3A45.7684626Z'\""
            //     }
            //   ],
            //   "watermark": "2"
            // }
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        })
});

test.cb('DirectLineAPI#generateConversationAndToken', t => {
    directLineAPI.generateConversationAndToken(conf.DIRECT_LINE_SECRET)
        .then(function(result) {
            // snoZV1MiBEA.dAA.MgBGAFAAcQB5AEIAZABaAGMANwBBAA.8pwJs_Df0QE.2LhLaujkxCY.xkcPpjgnK3iPmqiMmo7g6KSNsI4FiD-SXzFzrkUWXiw
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        })
});

test.skip.cb('DirectLineAPI#renewConversationToken', t => {
    directLineAPI.renewConversationToken(conf.DIRECT_LINE_TOKEN, 'BOqaXkXeNTL')
        .then(function(result) {
            // snoZV1MiBEA.dAA.MgBGAFAAcQB5AEIAZABaAGMANwBBAA.8pwJs_Df0QE.2LhLaujkxCY.xkcPpjgnK3iPmqiMmo7g6KSNsI4FiD-SXzFzrkUWXiw
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        })
});

test.cb('DirectLineAPI#postFileMessage', t => {
    // check out form data format
    // https://www.npmjs.com/package/request#multipartform-data-multipart-form-uploads
    directLineAPI.getToken(conf.DIRECT_LINE_SECRET)
        .then(function(token) {
            return directLineAPI.createConversation(token);
        })
        .then(function(result) {
            // console.log('postFileMessage>> ' + JSON.stringify(result));
            return directLineAPI.postFileMessage(result.token, result.conversationId, {
                my_file: fs.createReadStream(__dirname + '/unicycle.jpeg'),
            })
        })
        .then(function(result) {
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        });
});

test.cb('DirectLineAPI#ask', t => {
    // check out form data format
    // https://www.npmjs.com/package/request#multipartform-data-multipart-form-uploads
    directLineAPI.getToken(conf.DIRECT_LINE_SECRET)
        .then(function(token) {
            return directLineAPI.createConversation(token);
        })
        .then(function(result) {
            console.log('ask>> ' + JSON.stringify(result));
            return directLineAPI.ask(result.token, result.conversationId, "sss");
        })
        .then(function(result) {
            console.log(result);
            t.pass();
            t.end();
        })
        .fail(function(err) {
            console.log(err);
            t.fail();
            t.end();
        });
});

test.only.cb('DirectLineAPI#dialog', t => {
    // check out form data format
    // https://www.npmjs.com/package/request#multipartform-data-multipart-form-uploads
    var data = {};
    var fromUser = shortid.generate();
    directLineAPI.getToken(conf.DIRECT_LINE_SECRET)
        .then(function(token) {
            return directLineAPI.createConversation(token);
        })
        .then(function(result) {
            console.log('ask>> ' + JSON.stringify(result));
            data.token = result.token;
            data.conversationId = result.conversationId;
            return directLineAPI.ask(result.token, result.conversationId, { text: 'bar', from: fromUser });
        })
        .then(function(result) {
            console.log('dialog-1', JSON.stringify(result));
            console.log('dialog-1:data', JSON.stringify(data))
            return directLineAPI.ask(data.token, data.conversationId, { text: 'foo', from: fromUser });
        })
        .then(function(result) {
            console.log('dialog-2', JSON.stringify(result));
            t.pass();
            t.end();
        })
        .fail(function(err) {
            console.log(err);
            t.fail();
            t.end();
        });
});
