/*
* Primary file for API
*/

// 1. STARTING A SERVER

// Node has a nice library to create a server called "http"

/*

// Dependencies
const http = require("http");

// The server should respond to all requests with a string
const server = http.createServer(function(req, res){
    res.end("hello world\n");
});

// Start the server, and have it listen on port 3000
server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
});
// Once the server is up and running check it using the command "curl localhost:3000" we will see the string "hello world"

*/

// 2. PARSING REQUEST PATHS

// The next thing we need to do turn this into an api is to figure out which resources people are requesting in order to turn this into an api i.e. we need to parse the url the people are requesting for
// Node has a helper library for all things related to url functions called "url"

/*

// Dependencies
const http = require("http");
const url = require("url");


// The server should respond to all requests with a string
const server = http.createServer(function(req, res){
    console.log(req);
    console.log("RES");
    console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); // 1st argument is the url we want ot parse and the 2nd argument is a queryString boolean which if true then the queryproperty will always be set to an objectreturned by the querystring module's (another module) parse() method. If false, the query property on the returned URL object will be an unparsed, undecoded string. The default value is false
    // So if set true the url module also calls the querymodule to set the query property of the parsedUrl to the object and if false then the querymodule is not called and the query string isn't parsed and remains the string as it is
    // For true - curl "localhost:3000/a/b/c?abc=1&b=2" -> query: [Object: null prototype] { abc: '1', b: '2' }
    // For false - curl "localhost:3000/a/b/c?abc=1&b=2" -> query: 'abc=1&b=2'
    // So we will set the value as true
    console.log(parsedUrl);
    // Output
    // Url {
    //     protocol: null,
    //     slashes: null,
    //     auth: null,
    //     host: null,
    //     port: null,
    //     hostname: null,
    //     hash: null,
    //     search: '?abc=1&b=2',
    //     query: 'abc=1&b=2',
    //     pathname: '/a/b/c',
    //     path: '/a/b/c?abc=1&b=2',
    //     href: '/a/b/c?abc=1&b=2'
    //   }

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // trims the "/" (slashes) from left and right but not in the middle

    // Send the response
    res.end("hello world\n");

    // Log the request path
    console.log(`Request received on this path: ${trimmedPath}`); // Request received on this path: a/b/c 
});


// Start the server, and have it listen on port 3000
server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
});
// Once the server is up and running check it using the command "curl localhost:3000" we will see the string "hello world"

*/


// 3. PARSING HTTP METHODS
// 4. PARSING QUERY STRINGS
// 5. PARSING REQUEST HEADERS

// We also want to see which http method has the user asked for, the query string and process the headers that user has sent

/*

// Dependencies
const http = require("http");
const url = require("url");


// The server should respond to all requests with a string
const server = http.createServer(function(req, res){
    console.log(req);
    console.log("RES");
    console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // trims the "/" (slashes) from left and right but not in the middle

    // Get the query string as an object
    const queryString = parsedUrl.query;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Send the response
    res.end("hello world\n");

    // Log the request path
    console.log(`Request received on this path: ${trimmedPath} with ${method} method with`, queryString ,`query object`); // Request received on this path: a/b with get method with [Object: null prototype] { foo: 'bar', zoo: 'car' } query object
    console.log('Request received with these headers', headers);
    // Output - We get the additional headers for what we passed in when sending a get request using postman
    // Request received with these headers {
    //     foo: 'bar',
    //     zoo: 'car',
    //     fizz: 'buzz',
    //     red: 'blue',
    //     'user-agent': 'PostmanRuntime/7.28.4',
    //     accept: '*"\"/*', // - the "\" is not present we are just using it so that we can use the /* comment
    //     'postman-token': '80c0c575-9ae8-436d-9537-bea170a9587f',
    //     host: 'localhost:3000',
    //     'accept-encoding': 'gzip, deflate, br',
    //     connection: 'keep-alive'
    //   }
});


// Start the server, and have it listen on port 3000
server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
});
// Once the server is up and running check it using the command "curl localhost:3000" we will see the string "hello world"

*/


// 6. PARSING PAYLOADS

//  The last thing we want to do before routing the requests is handle the payload ("body") that the users send
// For this we are going to use another library that is built into node called string_decoder
// For passing payloads we need to make a request anything other than "GET" so we are going to use "POST" method here

/*


// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)


// The server should respond to all requests with a string
const server = http.createServer(function(req, res){
    console.log(req);
    console.log("RES");
    console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // trims the "/" (slashes) from left and right but not in the middle

    // Get the query string as an object
    const queryString = parsedUrl.query;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    // Creating a new StringDecoder
    const decoder = new StringDecoder('utf-8'); // When we create a new String decoder we need to pass what kind of new charset or decoding it must accept

    // There is something called streams in nodejs which lets us to write data read data to a source in a continous fashion (meaning they are bits of information that coming in at a time when we read or bits of information that we write as opposed at all at once). In nodejs there are 4 types of streams
    //1. Readable − Stream which is used for read operation.
    //2. Writable − Stream which is used for write operation.
    //3. Duplex − Stream which can be used for both read and write operation.
    //4. Transform − A type of duplex stream where the output is computed based on input.

    // Each type of stream is an event handler and throws several events at different instances of times
    // 1. data - data event is fired when there is data available to read
    // 2. end - end event is fired when there is no more data to read
    // 3. error - error event is fired when there is error reading or writing data
    // 4. finish - finish event is called when all the data has been flushed to the underlying system
    // Basically end and finish are almost the same the only difference is
    // stream.Readable (readable event) fires ONLY end and NEVER finish event
    // stream.writable (writable event) fired ONLY finish and NEVER end event

    // So payloads that come as part of an http request come in to the http server as a stream and so we need to collect the stream as it comes in and then when the stream tells us we are at the end coalesce that into one coherent thing so we can figure out what that payload is because as we receive this payload in bits we might only know a few characters at a time but we want to know the whole payload
    // So let us create a string that can hold the whole payload
    let buffer = '';
    // Now as the data comes in we are going to append it to this string
    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); // decode the data received as a stream and append it to the buffer variable
        console.log(`${buffer}\n`); // This is the body we are sending - This comes as a whole
        // Another output
        // {
        //     "name": "rutvij",
        //     "surname": "dave"
        // }
    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); // This will append any input stored in the internal buffer as a string

        // Now that the request is finished we want to do things that we were doing before
        // Sending response and logging the request path

        // Send the response
        res.end("hello world\n");

        // Log the request path
        console.log(`Request was received with this payload: ${buffer}`); // Request was received with this payload: This is the body we are sending
        // Another output
        // Request was received with this payload: {
        //     "name": "rutvij",
        //     "surname": "dave"
        // }

        // Without body i.e. GET request
        // Request was received with this payload: 

        // Not all request is going to have payloads but the "end" event is always going to be called irrespective of the payload. But the data event really depends on the payload so if the payload is passed by the user then only it will get called but if not then the data event won't be called on the other end the end event will always be called
        // When the payload isn't there the data event is never going to get called so our buffer string will remain empty but then the end event is going to get called and there the buffer is going to get ended and then our normal response and log is going to happen so the end event will always occur
    });   
});
// This is how streams are handled in nodejs we just don't simply grab the value of a stream we must bind to the data event of a stream or the ending event of the stream so that we can grab the little pieces of information that the stream is sending along and then end the stream when it is finished


// Start the server, and have it listen on port 3000
server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
});
// Once the server is up and running check it using the command "curl localhost:3000" we will see the string "hello world"

*/


// 7. ROUTING REQUESTS
// 8. RETURNING JSON

// Now let's add routing to this server
// We are going to create a router object which will contain all the routes which will be handled and also functons which will handle them. We will also create a handler when the requested route isn't present

/*


// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)


// The server should respond to all requests with a string
const server = http.createServer(function(req, res){
    console.log(req);
    console.log("RES");
    console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8'); 
    
    let buffer = '';

    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); 
        console.log(`${buffer}\n`);

    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); 

        // choose the handler this request should go to. If one is not found, use the not found handler
        const chosenHandler = router[trimmedPath] ?? handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: buffer
        }

        // Route the request to the handler specified in the router 
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default
            statusCode = statusCode ?? 200;

            // use the payload called back by the handler or default to empty object {}
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            // Return the response
            // res.setHeader('Content-Type', 'application/json'); // If we are using the setHeader method we must make sure that we write it before the writeHead as the writeHead sends the header so we must set the header before sending the header
            // To tell the browser or postman that we are returning a json we must set the header's content-type to application/json. We can either do that by the below method or by using the setHeader method on the response object
            res.writeHead(statusCode, {'content-type': 'application/json'}); // We are using the writeHead function which is present in the response object to write the response header
            // res.writeHead(statusCode); // writeHead sends the header so anything we want to set in the header we must do that before the writeHead method
            res.end(payloadString); // The argument here should always be a string even though we are sending JSON we must stringify it and then send it

             // Log the request path
            console.log(`Returning this response: ${statusCode} ${payloadString}`); 


        })
    });   
});


// Start the server, and have it listen on port 3000
server.listen(3000, function(){
    console.log("The server is listening on port 3000 now");
});

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback){
    // callback a http status code and a payload object
    callback(406, {'name': 'sample handler'});
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

// Defining a request router
const router = {
    'sample': handlers.sample
}

*/


// 9. ADDING CONFIGURATION

// Now we are going to add a config.js which will contain a staging environment and a production environment which we are going to pass everytime in the terminal
// Whenever we startup the app it should by default work with staging environment. If we use pass NODE_ENV=production then we should switch it to production environment
// Remember the environment variables that we pass as the argument in the command line are available through process.env.variableName

/*

// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)
const config = require("./config");

// The server should respond to all requests with a string
const server = http.createServer(function(req, res){
    console.log(req);
    console.log("RES");
    console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8'); 
    
    let buffer = '';

    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); 
        console.log(`${buffer}\n`);

    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); 

        // choose the handler this request should go to. If one is not found, use the not found handler
        const chosenHandler = router[trimmedPath] ?? handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: buffer
        }

        // Route the request to the handler specified in the router 
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default
            statusCode = statusCode ?? 200;

            // use the payload called back by the handler or default to empty object {}
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            // Return the response
            // res.setHeader('Content-Type', 'application/json'); // If we are using the setHeader method we must make sure that we write it before the writeHead as the writeHead sends the header so we must set the header before sending the header
            // To tell the browser or postman that we are returning a json we must set the header's content-type to application/json. We can either do that by the below method or by using the setHeader method on the response object
            res.writeHead(statusCode, {'content-type': 'application/json'}); // We are using the writeHead function which is present in the response object to write the response header
            // res.writeHead(statusCode); // writeHead sends the header so anything we want to set in the header we must do that before the writeHead method
            res.end(payloadString); // The argument here should always be a string even though we are sending JSON we must stringify it and then send it

             // Log the request path
            console.log(`Returning this response: ${statusCode} ${payloadString}`); 


        })
    });   
});


// Start the server
server.listen(config.port, function(){
    console.log(`The server is listening on port ${config.port} in ${config.envName} now`);
});

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback){
    // callback a http status code and a payload object
    callback(406, {'name': 'sample handler'});
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

// Defining a request router
const router = {
    'sample': handlers.sample
}

*/



// 10. ADDING HTTPS SUPPORT

// We are adding https support so that we have created a https folder inside which we have generated a key and a certificate using openssl
// Also we have now added httpsPort along with the httpPort.
// We are now going to refactor this file by creating a support for also https i.e. https.createServer and pass the same function that we have done in the http.createServer

/*

// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)
const config = require("./config");
const https = require("https");
const fs = require("fs"); 

// Instantiating the HTTP server
const httpServer = http.createServer(function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
});

// Start the server
httpServer.listen(config.httpPort, function(){
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} now`);
});


// Instantiate the https server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'), // Each node api has 2 kinds of function, sync functions and async functions. Most of the time we use the async function. The async function for readFile is "readFile" itself
    cert: fs.readFileSync('./https/cert.pem')
}
// The https server takes options related to https ssl i.e. certificate and key. The key and the certificate allow the encryption and decryption to happen so if we don't specify those we can't really create an encrypted server

const httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
}); // This method takes an options object and a callback.

// Start the https server
httpsServer.listen(config.httpsPort, function(){
    console.log(`The server is listening on port ${config.httpsPort} in ${config.envName} now`);
});

// All the server logic for both http and https server
const unifiedServer = function(req, res){
    console.log(req);
    console.log("RES");
    console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8'); 
    
    let buffer = '';

    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); 
        console.log(`${buffer}\n`);

    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); 

        // choose the handler this request should go to. If one is not found, use the not found handler
        const chosenHandler = router[trimmedPath] ?? handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: buffer
        }

        // Route the request to the handler specified in the router 
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default
            statusCode = statusCode ?? 200;

            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode, {'content-type': 'application/json'}); 
            res.end(payloadString); 

             // Log the request path
            console.log(`Returning this response: ${statusCode} ${payloadString}`); 


        })
    });  
}

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback){
    // callback a http status code and a payload object
    callback(406, {'name': 'sample handler'});
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

// Defining a request router
const router = {
    'sample': handlers.sample
}

// Now whenever we will start the server we will create 2 servers running on 2 different ports. So if any client wants to connect on the http/https server port then they can do so individually whenever they want to

*/

// 11. SERVICE 1 PING

// Now we will add a /ping route so that any uptime monitoring application monitors our application it can do so using this route without really thwarting the performance of the application
// /ping is used to check if the server is live or dead
// So let's remove the previously defined sample route and add a /ping route

/*

// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)
const config = require("./config");
const https = require("https");
const fs = require("fs"); 

// Instantiating the HTTP server
const httpServer = http.createServer(function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
});

// Start the server
httpServer.listen(config.httpPort, function(){
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} now`);
});


// Instantiate the https server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'), // Each node api has 2 kinds of function, sync functions and async functions. Most of the time we use the async function. The async function for readFile is "readFile" itself
    cert: fs.readFileSync('./https/cert.pem')
}
// The https server takes options related to https ssl i.e. certificate and key. The key and the certificate allow the encryption and decryption to happen so if we don't specify those we can't really create an encrypted server

const httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
}); // This method takes an options object and a callback.

// Start the https server
httpsServer.listen(config.httpsPort, function(){
    console.log(`The server is listening on port ${config.httpsPort} in ${config.envName} now`);
});

// All the server logic for both http and https server
const unifiedServer = function(req, res){
    console.log(req);
    console.log("RES");
    console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const { query: queryStringObject } = parsedUrl;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const { headers } = req;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8'); 
    
    let buffer = '';

    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); 
        console.log(`${buffer}\n`);

    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); 

        // choose the handler this request should go to. If one is not found, use the not found handler
        const chosenHandler = router[trimmedPath] ?? handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: buffer
        }

        // Route the request to the handler specified in the router 
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default
            statusCode = statusCode ?? 200;

            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode, {'content-type': 'application/json'}); 
            res.end(payloadString); 

             // Log the request path
            console.log(`Returning this response: ${statusCode} ${payloadString}`); 


        })
    });  
}

// Define the handlers
const handlers = {};

// Ping handler
handlers.ping = function(data, callback){
    callback(200);
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

// Defining a request router
const router = {
    'ping': handlers.ping
}

*/

// 12. STORING DATA
// create a .data folder and a lib folder inside which we will create a data.js which will contain all the CRUD operations

/*

// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)
const config = require("./config");
const https = require("https");
const fs = require("fs"); 
const _data = require('./lib/data');

// Instantiating the HTTP server
const httpServer = http.createServer(function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
});

// Start the server
httpServer.listen(config.httpPort, function(){
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} now`);
});


// Instantiate the https server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'), // Each node api has 2 kinds of function, sync functions and async functions. Most of the time we use the async function. The async function for readFile is "readFile" itself
    cert: fs.readFileSync('./https/cert.pem')
}
// The https server takes options related to https ssl i.e. certificate and key. The key and the certificate allow the encryption and decryption to happen so if we don't specify those we can't really create an encrypted server

const httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
}); // This method takes an options object and a callback.

// Start the https server
httpsServer.listen(config.httpsPort, function(){
    console.log(`The server is listening on port ${config.httpsPort} in ${config.envName} now`);
});

// All the server logic for both http and https server
const unifiedServer = function(req, res){
    console.log(req);
    console.log("RES");
    console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const { query: queryStringObject } = parsedUrl;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const { headers } = req;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8'); 
    
    let buffer = '';

    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); 
        console.log(`${buffer}\n`);

    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); 

        // choose the handler this request should go to. If one is not found, use the not found handler
        const chosenHandler = router[trimmedPath] ?? handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: buffer
        }

        // Route the request to the handler specified in the router 
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default
            statusCode = statusCode ?? 200;

            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode, {'content-type': 'application/json'}); 
            res.end(payloadString); 

             // Log the request path
            console.log(`Returning this response: ${statusCode} ${payloadString}`); 


        })
    });  
}

// Define the handlers
const handlers = {};

// Ping handler
handlers.ping = function(data, callback){
    callback(200);
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

// Defining a request router
const router = {
    'ping': handlers.ping
}


// Let's test by adding data to the test folder inside the .data folder
// _data.create('test', 'newFile', {foo: 'bar'}, function(err){
//     if(err){
//         console.log(err);
//     }
// });
// When we run this file we won't get any error and if we look at the .data/test folder we will see that we have a newFile.json file which contains our data which was json that is stringified.
// If we run this same thing once more. we will get an error "Could not create a new file, it may already exist". This is because we are using the "wx" flag. "wx" flag means open file for writing but it will fail if the path already exists

// Let's test by reading the data 
_data.read('test', 'newFile', function(err, data){
    if(err){ // err -> null
        return console.log(err);
        // If the file isn't found then we get the followung error
        // [Error: ENOENT: no such file or directory, open '/Users/rutvij/Documents/Ubuntu/Documents/udemy_courses/[CourseClub.NET] Pirple - The Node.js Master Class – No Frameworks, No NPM/Code/1. Building a RESTful API/app/.data/test/newFile1.json'] {
        //     errno: -2,
        //     code: 'ENOENT',
        //     syscall: 'open',
        //     path: '/Users/rutvij/Documents/Ubuntu/Documents/udemy_courses/[CourseClub.NET] Pirple - The Node.js Master Class – No Frameworks, No NPM/Code/1. Building a RESTful API/app/.data/test/newFile1.json'
        //   }
    }
    console.log(data); // {"foo":"bar"}
});


// Let's test by updating the data
_data.update('test', 'newFile', {fizz: 'buzz'}, function(err){
    if(err){
        console.log(err);
    }
});

// After running this if we open the newFile.json we will see the newly updated object {fizz: 'buzz'}


// Let's test deleting the file
_data.delete('test', 'newFile', function(err){
    if(err){
        console.log(err);
    }
});

// We see that the file newFile has been successfully deleted
// So now we have a library ready to do all the crud operations

*/


// 13. SERVICE 2 USERS

/*

// Now that we have our library ready we will create more routers such as users, tokens,etc.
// For that we will need to create handlers for each type of function and those handlers would be much more complex than the current handlers and so let's first refactor our code and put all our handlers inside a separate file

// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)
const config = require("./lib/config");
const https = require("https");
const fs = require("fs"); 
const handlers = require("./lib/handlers");
const helpers = require("./lib/helpers");

// Instantiating the HTTP server
const httpServer = http.createServer(function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
});

// Start the server
httpServer.listen(config.httpPort, function(){
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} now`);
});


// Instantiate the https server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'), // Each node api has 2 kinds of function, sync functions and async functions. Most of the time we use the async function. The async function for readFile is "readFile" itself
    cert: fs.readFileSync('./https/cert.pem')
}
// The https server takes options related to https ssl i.e. certificate and key. The key and the certificate allow the encryption and decryption to happen so if we don't specify those we can't really create an encrypted server

const httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
}); // This method takes an options object and a callback.

// Start the https server
httpsServer.listen(config.httpsPort, function(){
    console.log(`The server is listening on port ${config.httpsPort} in ${config.envName} now`);
});

// All the server logic for both http and https server
const unifiedServer = function(req, res){
    // console.log(req);
    // console.log("RES");
    // console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const { query: queryStringObject } = parsedUrl;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const { headers } = req;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8'); 
    
    let buffer = '';

    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); 
        console.log(`${buffer}\n`);

    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); 

        // choose the handler this request should go to. If one is not found, use the not found handler
        const chosenHandler = router[trimmedPath] ?? handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: helpers.parseJsonToObject(buffer)
        }

        // Route the request to the handler specified in the router 
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default
            statusCode = statusCode ?? 200;

            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode, {'content-type': 'application/json'}); 
            res.end(payloadString); 

             // Log the request path
            console.log(`Returning this response: ${statusCode} ${payloadString}`); 


        })
    });  
} 

// Defining a request router
const router = {
    'ping': handlers.ping,
    'users': handlers.users
}

*/



// 14. SERVICE 3 - TOKENS

/*

// Now we are going to make tokens for all users so that they don't have to provide phone numbers everytime in order to authenticate them. So we will generate a token with the users phone number and password and then use that token to authenticate

// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)
const config = require("./lib/config");
const https = require("https");
const fs = require("fs"); 
const handlers = require("./lib/handlers");
const helpers = require("./lib/helpers");

// Instantiating the HTTP server
const httpServer = http.createServer(function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
});

// Start the server
httpServer.listen(config.httpPort, function(){
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} now`);
});


// Instantiate the https server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'), // Each node api has 2 kinds of function, sync functions and async functions. Most of the time we use the async function. The async function for readFile is "readFile" itself
    cert: fs.readFileSync('./https/cert.pem')
}
// The https server takes options related to https ssl i.e. certificate and key. The key and the certificate allow the encryption and decryption to happen so if we don't specify those we can't really create an encrypted server

const httpsServer = https.createServer(httpsServerOptions, function(req, res){
    unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
}); // This method takes an options object and a callback.

// Start the https server
httpsServer.listen(config.httpsPort, function(){
    console.log(`The server is listening on port ${config.httpsPort} in ${config.envName} now`);
});

// All the server logic for both http and https server
const unifiedServer = function(req, res){
    // console.log(req);
    // console.log("RES");
    // console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    
    console.log(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const { query: queryStringObject } = parsedUrl;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const { headers } = req;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8'); 
    
    let buffer = '';

    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); 
        console.log(`${buffer}\n`);

    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); 

        // choose the handler this request should go to. If one is not found, use the not found handler
        const chosenHandler = router[trimmedPath] ?? handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: helpers.parseJsonToObject(buffer)
        }

        // Route the request to the handler specified in the router 
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler, or default
            statusCode = statusCode ?? 200;

            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            res.writeHead(statusCode, {'content-type': 'application/json'}); 
            res.end(payloadString); 

             // Log the request path
            console.log(`Returning this response: ${statusCode} ${payloadString}`); 
        })
    });  
} 

// Defining a request router
const router = {
    'ping': handlers.ping,
    'users': handlers.users,
    'tokens': handlers.tokens
}

*/


// 15. SERVICE 4 - CHECKS

// This is going to be the meat of our application
// A check is a task that tells our system to go check this url every x seconds and tell the creater of the check if it is up or down 

// Dependencies
const http = require("http");
const url = require("url");
const {StringDecoder} = require("string_decoder"); // The string_decoder library has all other useful things and the thing we want is just the StringDecoder function (constructor function - It is a class)
const config = require("./config");
const https = require("https");
const fs = require("fs"); 
const handlers = require("./handlers");
const helpers = require("./helpers");
const path = require("path");
const util = require("util");
const debug = util.debuglog('server');


// Instantiate the server module object
const server = {}


// @TODO - get rid of this
// helpers.sendTwilioSms('8104731794', 'Hello!', function(err){
//     debug(`This was the error ${err}`);
// });

// Instantiating the HTTP server
server.httpServer = http.createServer(function(req, res){
    server.unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
});




// Instantiate the https server
server.httpsServerOptions = {
    key: fs.readFileSync(path.join(__dirname, '/../https/key.pem')), // Each node api has 2 kinds of function, sync functions and async functions. Most of the time we use the async function. The async function for readFile is "readFile" itself
    cert: fs.readFileSync(path.join(__dirname, '/../https/cert.pem')) 
}
// The https server takes options related to https ssl i.e. certificate and key. The key and the certificate allow the encryption and decryption to happen so if we don't specify those we can't really create an encrypted server

server.httpsServer = https.createServer(server.httpsServerOptions, function(req, res){
    server.unifiedServer(req, res); // We are writing this inside a callback is because we have defined the function using an expression and so the hoisting doesn't work here. Therefore we will get an error. When we write the function expression inside a callback it works because the callback will first get registered and then when the time comes then only it will be called after the synchronous code has been executed (and that is why during the execution of the synchronous code the function expression gets deifned) whereas when we directly write the unifiedServer JS first searches for the unifiedServer which is still undefined as it is a functional expression and so for that we need to defined the unifiedServer function before using them in the servers but it is better to write all our helper functions at the end
});  // This method takes an options object and a callback.



// All the server logic for both http and https server
server.unifiedServer = function(req, res){
    // console.log("RES");
    // console.log(res);
    // Get the url and parse it
    const parsedUrl = url.parse(req.url, true); 
    debug(parsedUrl);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const { query: queryStringObject } = parsedUrl;

    // Get the http method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const { headers } = req;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8'); 
    
    let buffer = '';

    // We will do so when the request object will emit the event whenever a new stream has been sent and that event is called "data" which leaves on the request object
    req.on('data', function(data){
        buffer += decoder.write(data); 
        debug(`${buffer}\n`);

    });

    // When the streaming is done the request object will emit another event called "end"
    req.on("end", function(){
        buffer += decoder.end(); 

        // choose the handler this request should go to. If one is not found, use the not found handler
        let chosenHandler = server.router[trimmedPath] ?? handlers.notFound;
        
        // If the request is within the public directoru, use the public handler instead
        chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;

        // Construct the data object to send to the handler
        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: helpers.parseJsonToObject(buffer)
        }

        // Route the request to the handler specified in the router 
        try{
            chosenHandler(data, server.processHandlerResponse.bind(undefined, res, method, trimmedPath));
        }
        catch(e){
            debug(e);
            server.processHandlerResponse(res, method, trimmedPath, 500, {Error: "An unknown error has occured"}, 'json');
        }
    });  
} 

// Process the response from the handler
server.processHandlerResponse = function(res, method, trimmedPath, statusCode, payload, contentType = 'json'){
    // Use the status code called back by the handler, or default
    statusCode = statusCode ?? 200;           

    // Return the response-parts that are content-specific
    let payloadString = '';
    if(contentType == 'json'){
        res.setHeader('content-type', 'application/json');
        payload = typeof(payload) == 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
    }
    if(contentType == 'html'){
        res.setHeader('content-type', 'text/html');
        payloadString = typeof(payload) == 'string' ? payload : '';
    }
    if(contentType == 'favicon'){
        res.setHeader('content-type', 'image/x-icon');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if(contentType == 'css'){
        res.setHeader('content-type', 'text/css');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if(contentType == 'png'){
        res.setHeader('content-type', 'img/png');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if(contentType == 'jpg'){
        res.setHeader('content-type', 'img/jpeg');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }
    if(contentType == 'plain'){
        res.setHeader('content-type', 'text/plain');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
    }

    // Return the response-parts that are common to all content-types
    res.writeHead(statusCode); 
    res.end(payloadString); 
    

    // If the response is 200, print green otherwise print red
    if(statusCode == 200){
        debug('\x1b[32m%s\x1b[0m', `${method.toUpperCase()} /${trimmedPath} ${statusCode}`);
    } 
    else{
        debug('\x1b[32m%s\x1b[0m', `${method.toUpperCase()} /${trimmedPath} ${statusCode}`);

    }
}

// Defining a request router
server.router = {
    '': handlers.index,
    'account/create': handlers.accountCreate,
    'account/edit': handlers.accountEdit,
    'account/deleted': handlers.accountDeleted,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'checks/all': handlers.checksList,
    'checks/create': handlers.checksCreate,
    'checks/edit': handlers.checksEdit,
    'ping': handlers.ping,
    'api/users': handlers.users,
    'api/tokens': handlers.tokens,
    'api/checks': handlers.checks,
    'favicon.ico': handlers.favicon,
    'public': handlers.public,
    'examples/error': handlers.exampleError
}

// Init script
server.init = function(){
    // Start the server
    server.httpServer.listen(config.httpPort, function(){
        console.log('\x1b[36m%s\x1b[0m', `The server is listening on port ${config.httpPort} in ${config.envName} now`);
    });

    // Start the https server
    server.httpsServer.listen(config.httpsPort, function(){
        console.log('\x1b[35m%s\x1b[0m', `The server is listening on port ${config.httpsPort} in ${config.envName} now`);

    });
}

// Export the module
module.exports = server;
