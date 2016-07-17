var test = require('ava');
var directLineAPI = require('../');
var conf = require('./conf.json');
var fs = require('fs');

test.cb('DirectLineAPI#getToken', t => {
    // t.deepEqual([1, 2], [1, 2]);
    directLineAPI.getToken(conf.DIRECT_LINE_SECRET)
        .then(function(token) {
            console.log(JSON.stringify(token));
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
    directLineAPI.createConversation(conf.DIRECT_LINE_TOKEN)
        .then(function(result) {
            // { conversationId: '6HE3lR5Hgh8',
            // token: 'snoZV1MiBEA.dAA.NgBIAEUAMwBsAFIANQBIAGcAaAA4AA.Hyg15uvf0QE.T7nOaFFEZCQ.bKVNlRmfCd3uH1Ump-CYJQQGmPU9aSCVhF7b1mQLJEk' }
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        })
});

test.cb('DirectLineAPI#postMessage', t => {
    // t.deepEqual([1, 2], [1, 2]);
    directLineAPI.postMessage(conf.DIRECT_LINE_TOKEN, '6HE3lR5Hgh8', 'foo222')
        .then(function(result) {
            // { conversationId: '6HE3lR5Hgh8',
            // token: 'snoZV1MiBEA.dAA.NgBIAEUAMwBsAFIANQBIAGcAaAA4AA.Hyg15uvf0QE.T7nOaFFEZCQ.bKVNlRmfCd3uH1Ump-CYJQQGmPU9aSCVhF7b1mQLJEk' }
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        })
});


test.cb('DirectLineAPI#getMessages', t => {
    directLineAPI.getMessages(conf.DIRECT_LINE_TOKEN, 'BOqaXkXeNTL', 0)
        .then(function(result) {
            console.log(result)
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

test.cb('DirectLineAPI#renewConversationToken', t => {
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

test.only.cb('DirectLineAPI#postFileMessage', t => {
    // check out form data format
    // https://www.npmjs.com/package/request#multipartform-data-multipart-form-uploads
    directLineAPI.postFileMessage(conf.DIRECT_LINE_TOKEN, 'Epjln04DMUM', {
            my_file: fs.createReadStream(__dirname + '/unicycle.jpeg'),
        })
        .then(function(result) {
            console.log(result);
            t.pass();
            t.end();
        })
        .fail(function(err) {
            t.fail();
            t.end();
        })
});
