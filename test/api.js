/**
 * API Tests
 */

// 

// Dependencies
const app = require("./../index");
const assert = require("assert");
const http = require("http");
const config = require("./../lib/config");


// Create a holder for the test
const api = {};

// Helpers
const helpers = {};
helpers.makeGetRequest = function(path, callback){
    // Configure the request details
    const requestDetails = {
        protocol: 'http:',
        hostname: 'localhost',
        port: config.httpPort,
        method: 'GET',
        path: path,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // Send the request
    const req = http.request(requestDetails, function(res){
        callback(res);
    });
    req.end();
}

// The main init() function should be able to run without throwing
api['app.init should start without throwing'] = function(done){
    assert.doesNotThrow(function(){
        app.init(function(err){
            done();
        })
    }, TypeError);
}

// Nake a request to /ping
api['/ping should respond to GET with 200'] = function(done){
    helpers.makeGetRequest('/ping', function(res){
        assert.equal(res.statusCode, 200);
        done();
    })
}

// Make a request to /users
api['/api/users should respond to GET with 400'] = function(done){
    helpers.makeGetRequest('/api/users', function(res){
        assert.equal(res.statusCode, 400);
        done();
    })
}

// Make a request to a random path
api['a random path should respond to GET with 404'] = function(done){
    helpers.makeGetRequest('/this/path/shouldn\'t/exist', function(res){
        assert.equal(res.statusCode, 404);
        done();
    })
}

// Export the test to the runner
module.exports = api;