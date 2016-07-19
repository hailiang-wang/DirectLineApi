/**
 * Direct Line API
 * https://docs.botframework.com/en-us/restapi/directline/
 */
const baseUrl = "https://directline.botframework.com/api";
var request = require('request');
var Q = require('q');
var leftpad = require('leftpad');
var debug = require('debug')('directline-api');

function DirectLineClient() {}

/**
 * Get token
 * @param  {[type]} secret [description]
 * @return {[type]}        [description]
 */
DirectLineClient.prototype.getToken = function(secret) {
    var defer = Q.defer();
    request({
        method: 'GET',
        uri: baseUrl + '/tokens',
        headers: {
            'Authorization': 'BotConnector ' + secret
        }
    }, function(err, response, body) {
        if (err) return defer.reject({
            rc: 1,
            error: err
        });
        if (response.statusCode === 200) {
            return defer.resolve(body.slice(1, -1));
        } else {
            return defer.reject({
                rc: 2,
                error: 'wrong status code.'
            });
        }
    });

    return defer.promise;
};

/**
 * Create a conversation
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
DirectLineClient.prototype.createConversation = function(token) {
    var defer = Q.defer();
    request({
        method: 'POST',
        uri: baseUrl + '/conversations',
        headers: {
            'Authorization': 'BotConnector ' + token,
            'Accept': 'application/json'
        }
    }, function(err, response, body) {
        if (err) return defer.reject({
            rc: 1,
            error: err
        });
        if (response.statusCode === 200) {
            return defer.resolve(JSON.parse(body));
        } else {
            return defer.reject({
                rc: 2,
                error: 'wrong status code.'
            });
        }
    });

    return defer.promise;
};

/**
 * Post a message for a conversation
 * @param  {[type]} token          [description]
 * @param  {[type]} conversationId [description]
 * @param  {[type]} message        [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.postMessage = function(token, conversationId, body) {
    var defer = Q.defer();
    request({
        method: 'POST',
        uri: baseUrl + '/conversations/' + conversationId + '/messages',
        headers: {
            'Authorization': 'BotConnector ' + token,
            'Content-Type': 'application/json'
        },
        json: true,
        body: body
    }, function(err, response) {
        if (err) return defer.reject({
            rc: 1,
            error: err
        });
        if (response.statusCode === 204) {
            return defer.resolve();
        } else {
            return defer.reject({
                rc: 2,
                error: 'wrong status code.'
            });
        }
    });

    return defer.promise;
};

/**
 * upload file
 * @param  {[type]} token          [description]
 * @param  {[type]} conversationId [description]
 * @param  {[type]} file           [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.postFileMessage = function(token, conversationId, formData) {
    var defer = Q.defer();
    request({
        method: 'POST',
        uri: baseUrl + '/conversations/' + conversationId + '/upload',
        headers: {
            'Authorization': 'BotConnector ' + token,
            'Content-Type': 'multipart/form-data'
        },
        formData: formData
    }, function(err, response, body) {
        if (err) return defer.reject({
            rc: 1,
            error: err
        });
        if (response.statusCode === 204) {
            return defer.resolve();
        } else {
            return defer.reject({
                rc: 2,
                error: 'wrong status code.'
            });
        }
    });

    return defer.promise;
};


/**
 * Get Messages for a conversation
 * @param  {[type]} token          [description]
 * @param  {[type]} conversationId [description]
 * @param  {[type]} watermark      [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.getMessages = function(token, conversationId, watermark) {
    var defer = Q.defer();
    var watermarkStr = watermark ? 'watermark=' + watermark : '';
    request({
        method: 'GET',
        uri: baseUrl + '/conversations/' + conversationId + '/messages/?' + watermarkStr,
        headers: {
            'Authorization': 'BotConnector ' + token,
            'Accept': 'application/json'
        }
    }, function(err, response, body) {
        if (err) return defer.reject({
            rc: 1,
            error: err
        });
        if (response.statusCode === 200) {
            return defer.resolve(JSON.parse(body));
        } else {
            return defer.reject({
                rc: 2,
                error: 'wrong status code.'
            });
        }
    });

    return defer.promise;
};

/**
 * generate a token for a new conversation.
 * #TODO what difference with GET /tokens ?
 * @param  {[type]} token          [description]
 * @param  {[type]} conversationId [description]
 * @param  {[type]} message        [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.generateConversationAndToken = function(secret) {
    var defer = Q.defer();
    request({
        method: 'POST',
        uri: baseUrl + '/tokens/conversation',
        headers: {
            'Authorization': 'BotConnector ' + secret
        }
    }, function(err, response, body) {
        if (err) return defer.reject({
            rc: 1,
            error: err
        });
        if (response.statusCode === 200) {
            return defer.resolve(body);
        } else {
            return defer.reject({
                rc: 2,
                error: 'wrong status code.'
            });
        }
    });

    return defer.promise;
};

/**
 * renew token by conversationId
 * @param  {[type]} secret         [description]
 * @param  {[type]} conversationId [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.renewConversationToken = function(token, conversationId) {
    var defer = Q.defer();

    request({
        method: 'GET',
        uri: baseUrl + '/tokens/' + conversationId + '/renew',
        headers: {
            'Authorization': 'BotConnector ' + token
        }
    }, function(err, response, body) {
        if (err) return defer.reject({
            rc: 1,
            error: err
        });
        if (response.statusCode === 200) {
            // there are "" in the body for token
            return defer.resolve(body.slice(1, -1));
        } else {
            return defer.reject({
                rc: 2,
                error: 'wrong status code.'
            });
        }
    });

    return defer.promise;
};

/**
 * [resolveNextConversationMessageId description]
 * @param  {[type]} watermark [description]
 * @return {[type]}           [description]
 */
function resolveNextConversationMessageId(conversationId, watermark) {
    return conversationId + '|' + leftpad(watermark + 2, 18);
}

/**
 * [ask description]
 * @param  {[type]} conversationId [description]
 * @param  {[type]} token          [description]
 * @param  {[type]} content        [description]
 * @return {[type]}                [description]
 */
DirectLineClient.prototype.ask = function(token, conversationId, body) {
    var defer = Q.defer();
    var self = this;
    var data = {};
    self.getMessages(token, conversationId)
        .then(function(result) {
            data.watermark = parseInt(result.watermark) | 0;
            data.nextId = resolveNextConversationMessageId(conversationId, data.watermark);
            return self.postMessage(token, conversationId, body);
        })
        .then(function() {

            function waitForResponse(callback) {
                setTimeout(function() {
                    self.getMessages(token, conversationId, data.watermark)
                        .then(function(result) {
                            var isDone = false;
                            result.messages.forEach(function(val, index) {
                                if (val.id === data.nextId) {
                                    isDone = true;
                                    return callback(null, val);
                                }
                            });

                            if (!isDone)
                                waitForResponse(callback);
                        }, function(err) {
                            return callback(err);
                        });
                }, 500);
            }

            waitForResponse(function(err, response) {
                if (err) return defer.reject(err);
                debug('get response %j', JSON.stringify(response));
                return defer.resolve(response);
            });

        })
        .fail(function(err) {
            defer.reject(err);
        });

    return defer.promise;
}


exports = module.exports = new DirectLineClient();
