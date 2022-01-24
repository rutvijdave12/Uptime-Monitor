/*
Request handlers
*/

// Dependencies
const config = require("./config");
const _data = require("./data");
const helpers = require("./helpers");
const _url = require("url");
const dns = require("dns");
const _performance = require('perf_hooks').performance;
const util = require('util');
const debug = util.debuglog('performance');

// Define the handlers
const handlers = {};

/**
 * 
 * HTML handlers
 * 
 */


// Index handler
handlers.index = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Uptime Monitoring',
            'head.description': "We offer free, simple uptime monitoring for HTTP/HTTPS sites of all kinds. When your site goes down we'll send you a text to let you know",
            'body.class': 'index'
        }



        // Read in a template as a string
        helpers.getTemplate('index', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }

}

// Create account
handlers.accountCreate = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Create an Account',
            'head.description': "Sign up is easy and only takes a few seconds",
            'body.class': 'accountCreate'
        }



        // Read in a template as a string
        helpers.getTemplate('accountCreate', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }
}



// Create New Session
handlers.sessionCreate = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Login to your Account',
            'head.description': "Please enter your phone number and password to access your account",
            'body.class': 'sessionCreate'
        }



        // Read in a template as a string
        helpers.getTemplate('sessionCreate', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }
}


// Session has been deleted
handlers.sessionDeleted = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Logged Out',
            'head.description': "You have been logged out of your account.",
            'body.class': 'sessionDeleted'
        }



        // Read in a template as a string
        helpers.getTemplate('sessionDeleted', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }
}

// Edit your account
handlers.accountEdit = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Account Settings',
            'body.class': 'accountEdit'
        }



        // Read in a template as a string
        helpers.getTemplate('accountEdit', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }
}


// Account has been deleted
handlers.accountDeleted = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Account Deleted',
            'head.description': 'Your account has been deleted',
            'body.class': 'accountDeleted'
        }



        // Read in a template as a string
        helpers.getTemplate('accountDeleted', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }
}


// Create a new check
handlers.checksCreate = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Create a new Check',
            'body.class': 'checksCreate'
        }



        // Read in a template as a string
        helpers.getTemplate('checksCreate', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }
}



// Dashboard (view all checks)
handlers.checksList = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Dashboard',
            'body.class': 'checksList'
        }



        // Read in a template as a string
        helpers.getTemplate('checksList', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }
}



// Edit a check
handlers.checksEdit = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Prepare data for interpolation
        const templateData = {
            'head.title': 'Check Details',
            'body.class': 'checksEdit'
        }



        // Read in a template as a string
        helpers.getTemplate('checksEdit', templateData, function(err, str){
            if(!err && str){
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str){
                    if(!err && str){
                        // Return that page as html
                        callback(200, str, 'html'); 
                    }
                    else{
                        callback(500, undefined, 'html');
                    }
                });
            }
            else{
                callback(500, undefined, 'html');
            }
        })
    }
    else{
        callback(405, undefined, 'html');
    }
}



// Favicon
handlers.favicon = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Read in the favicon's data
        helpers.getStaticAsset('favicon.ico', function(err, data){
            if(!err && data){
                // Callback the data
                callback(200, data, 'favicon');
            }
            else{
            callback(500);
            }
        })
    }
    else{
        callback(405);
    }
}

// Public assets
handlers.public = function(data, callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
        // Get the filename being requested
        const trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
        if(trimmedAssetName){
            // Read in the asset's data
            helpers.getStaticAsset(trimmedAssetName, function(err, data){
                if(!err && data){
                    // Determine the content type (default to plain text)
                    let contentType = 'plain';
                    if(trimmedAssetName.indexOf('.css') > -1){
                        contentType = 'css';
                    }
                    if(trimmedAssetName.indexOf('.png') > -1){
                        contentType = 'png';
                    }
                    if(trimmedAssetName.indexOf('.jpg') > -1){
                        contentType = 'jpg';
                    }
                    if(trimmedAssetName.indexOf('.ico') > -1){
                        contentType = 'favicon';
                    }

                    // Callback the data
                    callback(200, data, contentType);
                }
                else{
                callback(404);
                }
            })
        }
        else{
            callback(404);
        }
    }
    else{
        callback(405);
    }
}




/**
 * 
 * JSON API handlers
 * 
 */

// Example error
handlers.exampleError = function(data, callback){
    const err = new Error("This is an example error");
    throw err;
}




// ================= User handlers =================

// users handler
handlers.users = function(data, callback){
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if(acceptableMethods.includes(data.method)){
        // pass it to a sub handler
        handlers._users[data.method](data, callback);
    }
    else{
        callback(405); // 405 means method not allowed. So we are only allowing these 4 methods
    }
}

// container for users sub methods
handlers._users = {};

// On this object we are going to create 4 methods - get, post, put, delete

// users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback){
    // check all required fields are filled out
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim(); 
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim();
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 && data.payload.phone.trim();
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim();
    const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement;
    if(firstName && lastName && phone && password && tosAgreement){
        // Make sure that the user doesn't already exist - we will check this by checking if there is already a file existing by the name <phone>.json i.e 9876543210.json. If it exists then the user exists. We are going to assume that every user will have a unique phone number. If we get an error reading the file that means the file doesn;t exist hence the user doesn't exist
        _data.read('user', phone, function(err, data){
            if(err){
                // hash the password
                const hashedPassword = helpers.hash(password);
                if(hashedPassword){
                    // create the user object
                    const userObject = {
                        firstName,
                        lastName,
                        phone,
                        hashedPassword,
                        tosAgreement
                    }

                    // Store the user
                    _data.create('users', phone, userObject, function(err){
                        if(!err){
                            callback(200);
                        }
                        else{
                            console.log(err);
                            callback(500, {error: "Could not create the new user"});
                        }
                    });
                }
                else{
                    callback(500, {error: "Could not hash the user's password"});
                }

            }
            else{
                // User already exists
                callback(400, {error: "A user with that phone number already exists"});
            }
        })
    }
    else{
        callback(400, {error: 'Missing required fields'});
    }
}

// users - get
// Required data: phone
// Optional data: none
// @TODO only let an authenticated user access their object. DOn't let them acess anyone else's - DONE
handlers._users.get = function(data, callback){
    // check that the phone number provided is valid
    const phone = typeof(data.queryStringObject.phone) == "string" && data.queryStringObject.phone.trim().length == 10 && data.queryStringObject.phone;
    if(phone){
        // Get the token from headers
        const token = typeof(data.headers.token) == "string" && data.headers.token;
        // Verify that the given token is valid for the given phone number
        handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
            if(tokenIsValid){
                // Lookup the user
                _data.read("users", phone, function(err, data){
                    if(!err && data){
                        // Remove the hashedPassword from the user object before returning to the requester
                        delete data.hashedPassword;
                        callback(200, data);
                    }
                    else{
                        callback(404);
                    }
                });
            }
            else{
                callback(403, {error: "Missing required token in header, or token is invalid"});
            }
        });
    }
    else{
        callback(400, {error: "Missing required field"});
    }
}

// users - put
// Required data: Phone
// Optional data: firstName, lastName, password (At least one must be specified)
// @TODO Only let an authenticated user update their own object. Don't let them update anyone else's - DONE
handlers._users.put = function(data, callback){
    // Check for the required field
    const phone = typeof(data.payload.phone) == "string" && data.payload.phone.trim().length == 10 && data.payload.phone;

    // Check for the optional fields
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim() && data.payload.firstName.trim(); 
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim() && data.payload.lastName.trim();
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim() && data.payload.password;

    // Error if the phone is invalid
    if(phone){
        // Error if nothing is sent to update
        if(firstName || lastName || password){
            // Get the token from headers
        const token = typeof(data.headers.token) == "string" && data.headers.token;
        // Verify that the given token is valid for the given phone number
        handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
            if(tokenIsValid){
                // Lookup the user
                _data.read('users',phone,function(err,userData){
                    if(!err && userData){
                      // Update the fields if necessary
                      if(firstName){
                        userData.firstName = firstName;
                      }
                      if(lastName){
                        userData.lastName = lastName;
                      }
                      if(password){
                        userData.hashedPassword = helpers.hash(password);
                      }
                      // Store the new updates
                      _data.update('users',phone,userData,function(err){
                        if(!err){
                          callback(200);
                        } else {
                          callback(500,{'Error' : 'Could not update the user.'});
                        }
                      });
                    } else {
                      callback(400,{'Error' : 'Specified user does not exist.'});
                    }
                  });
            }
            else{
                callback(403, {error: "Missing required token in header, or token is invalid"});
            }
        });
        }
        else{
            callback(400, {error: "Missing fields to update"});
        }
    }
    else{
        callback(400, {error: "Missing required fields"});
    }
}


// users - delete
// Required fields: phone
// @TODO only let an authenticated user delete their object. Don't let them delete anyone else's - DONE
// @TODO Cleanup (delete) any other data files associated with this user - DONE
handlers._users.delete = function(data, callback){
    // check that the phone number provided is valid
    const phone = typeof(data.queryStringObject.phone) == "string" && data.queryStringObject.phone.trim().length == 10 && data.queryStringObject.phone;
    if(phone){
        // Get the token from headers
        const token = typeof(data.headers.token) == "string" && data.headers.token;
        // Verify that the given token is valid for the given phone number
        handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
            if(tokenIsValid){
                // Lookup the user
                _data.read("users", phone, function(err, userData){
                    if(!err && data){
                        _data.delete("users", phone, function(err){
                            if(!err){
                                // Delete each of the checks associated with the user
                                const userChecks = typeof(userData.checks) == "object" && userData.checks instanceof Array ? userData.checks : [];
                                const checksToDelete = userChecks.length;
                                if(checksToDelete > 0){
                                    let checksDeleted = 0;
                                    let deletionErrors = false;
                                    // Loop through the checks
                                    userChecks.forEach(function(checkId){
                                        // Delete the check
                                        _data.delete('checks', checkId, function(err){
                                            if(err){
                                                deletionErrors = true;
                                            }
                                            checksDeleted++;
                                            if(checksDeleted == checksToDelete){
                                                if(!deletionErrors){
                                                    callback(200);
                                                }
                                                else{
                                                    callback(500, {error: "Errors encountered while attempting to delete all of the users checks. All checks may not have been deleted from the system successfully"});
                                                }
                                            }
                                        })
                                    })
                                }
                                else{
                                    callback(200);
                                }
                            }
                            else{
                                callback(500, {error: "Could not delete the specified user"});
                            }
                        })
                    }
                    else{
                        callback(400, {error: "Could not find the specified user"});
                    }
                })
            }
            else{
                callback(403, {error: "Missing required token in header, or token is invalid"});
            }
        });
    }
    else{
        callback(400, {error: "Missing required field"});
    }
}


// ================== token handlers ===============

handlers.tokens = function(data, callback){
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if(acceptableMethods.includes(data.method)){
        // pass it to a sub handler
        handlers._tokens[data.method](data, callback);
    }
    else{
        callback(405); // 405 means method not allowed. So we are only allowing these 4 methods
    }
}


// Container for all tokens sub methods
handlers._tokens = {};

// Tokens - Post
// Require data: phone and password
// Optional data: none
handlers._tokens.post = function(data, callback){
    _performance.mark('Entered function');
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 && data.payload.phone.trim();
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim() && data.payload.password;
    _performance.mark('Inputs validated');
    if(phone && password){
        // Lookup the user who matches that phone number
        _performance.mark('Beginning user lookup');
        _data.read("users", phone, function(err, userData){
            _performance.mark('User lookup complete');
            if(!err && userData){
                // hash the sent password and compare it to the password stored in the user password
                _performance.mark('Beginning password hashing');
                const hashedPassword = helpers.hash(password);
                _performance.mark('Password hashing complete');
                if(hashedPassword === userData.hashedPassword){
                    // If valid, create a new token with a set expiration date 1 hour in the future
                    _performance.mark('Creating data for token');
                    const tokenId = helpers.createRandomString(20);
                    const expires = Date.now() + 60*60*1000;
                    const tokenObject = {
                        phone,
                        id: tokenId,
                        expires
                    }

                    // Store the token
                    _performance.mark('Beginning storing token');
                    _data.create("tokens", tokenId, tokenObject, function(err){
                        _performance.mark('Storing token complete');
                        // Gather all the measurements
                        _performance.measure('Beginning to end', 'Entered function', 'Storing token complete');
                        _performance.measure('Validating user input', 'Entered function', 'Inputs validated');
                        _performance.measure('User lookup', 'Beginning user lookup', 'User lookup complete');
                        _performance.measure('Password hashing', 'Beginning password hashing', 'Password hashing complete');
                        _performance.measure('Token data creation', 'Creating data for token', 'Beginning storing token');
                        _performance.measure('Token storing', 'Beginning storing token', 'Storing token complete');

                        // Log out all the measurements
                        const measurements = _performance.getEntriesByType('measure');
                        measurements.forEach(function(measurement){
                            debug('\x1b[33m%s\x1b[0m', `${measurement.name} ${measurement.duration}`);
                        })
                        if(!err){
                            callback(200, tokenObject);
                        }
                        else{
                            callback(500, {error: "Could not create the new token"});
                        }
                    })
                }
                else{
                    callback(400, {error: "Password did not match the specified user's stored password"});
                }
            }
            else{
                callback(400, {error: "Could not find the specified user"});
            }
        })
    }
    else{
        callback(400, {error: "Missing required field(s)"});
    }
}

// Tokens - get
// Required data: Id
// Optional data: None
handlers._tokens.get = function(data, callback){
    // check that the id provided is valid
    const id = typeof(data.queryStringObject.id) == "string" && data.queryStringObject.id.trim().length == 20 && data.queryStringObject.id.trim();
    if(id){
        // Lookup the token
        _data.read("tokens", id, function(err, tokenData){
            if(!err && tokenData){
                callback(200, tokenData);
            }
            else{
                callback(404);
            }
        })
    }
    else{
        callback(400, {error: "Missing required field"});
    }
}

// Tokens - put
// Require data: id, extend (if extend = true then extend the expiration time of the token by 1 hour)
// Optional data: none
handlers._tokens.put = function(data, callback){
    // check that the id provided is valid
    const id = typeof(data.payload.id) == "string" && data.payload.id.trim().length === 20 && data.payload.id.trim();
    const extend = typeof(data.payload.extend) == "boolean" && data.payload.extend;
    if(id && extend){
        _data.read("tokens", id, function(err, tokenData){
            if(!err && tokenData){
                // Check to make sure if the token isn't already expired
                if(tokenData.expires > Date.now()){
                    // set the expiration an hour from now
                    tokenData.expires = Date.now() + 60 * 60 * 1000;
                    // Store the new updates
                    _data.update("tokens", id, tokenData , function(err){
                        if(!err){
                            callback(200);
                        }               
                        else{
                            callback(500, {error: "Could not update token's expirations"});
                        }
                    })
                }
                else{
                    callback(400, {error: "The token has already expired and cannot be extended"});
                }
            }
            else{
                callback(400, {error: "Specified token does not exist"});
            }
        });
    }
    else{
        callback(400, {error: "Missing required field(s) or field(s) are invalid"});
    }
}

// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data, callback){
    // Check that the id is valid
    const id = typeof(data.queryStringObject.id) == "string" && data.queryStringObject.id.trim().length == 20 && data.queryStringObject.id;
    if(id){
        // Lookup the user
        _data.read("tokens", id, function(err, tokenData){
            if(!err && tokenData){
                _data.delete("tokens", id, function(err){
                    if(!err){
                        callback(200);
                    }
                    else{
                        callback(500, {error: "Could not delete the specified token"});
                    }
                })
            }
            else{
                callback(400, {error: "Could not find the specified token"});
            }
        })
    }
    else{
        callback(400, {error: "Missing required field"});
    }
}

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id, phone, callback){
    // Lookup the token
    _data.read("tokens", id, function(err, tokenData){
        // Check that the token is for the given user and has not expired
        if(!err && tokenData){
            if(tokenData.phone === phone && tokenData.expires > Date.now()){
                callback(true);
            }
            else{
                callback(false);
            }
        }
        else{
            callback(false);
        }
    })
}


// ================ checks handler ======================

handlers.checks = function(data, callback){
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if(acceptableMethods.includes(data.method)){
        // pass it to a sub handler
        handlers._checks[data.method](data, callback);
    }
    else{
        callback(405); // 405 means method not allowed. So we are only allowing these 4 methods
    }
}


// Container for all tokens sub methods
handlers._checks = {};

// checks - post
// Required data: protocol (http or https), url, method, success codes, timeout seconds
// optional data: none
handlers._checks.post = function(data, callback){
    // validate inputs
    const protocol = typeof(data.payload.protocol) == 'string' && ['http', 'https'].includes(data.payload.protocol) && data.payload.protocol;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim();
    const method = typeof(data.payload.method) == 'string' && ['post', 'get', 'put', 'delete'].includes(data.payload.method) && data.payload.method;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 && data.payload.timeoutSeconds;

    if(protocol && url && method && successCodes && timeoutSeconds){
        // Get the token from the headers
        const token = typeof(data.headers.token) == "string" && data.headers.token;

        // Lookup the user by reading the token
        _data.read("tokens", token, function(err, tokenData){
            if(!err && tokenData){
                const userPhone = tokenData.phone;

                // Lookup user's data
                _data.read("users", userPhone, function(err, userData){
                    if(!err && userData){
                        const userChecks = typeof(userData.checks) == "object" && userData.checks instanceof Array ? userData.checks : [];
                        // verify that the user has less than the number of maxChecks per user
                        if(userChecks.length < config.maxChecks){
                            // create a random id for the check
                            // Verify that the URL given has DNS entries (and therefore can resolve)
                            const parsedUrl = _url.parse(`${protocol}://${url}`, true);
                            const hostname = typeof(parsedUrl.hostname) == 'string' && parsedUrl.hostname.length > 0 && parsedUrl.hostname;
                            dns.resolve(hostname, function(err, records){
                                console.log("Records", records);
                                if(!err && records){
                                    // Create a random id for the check
                                    const checkId = helpers.createRandomString(20);

                                    // create the check object, and include the user's phone
                                    const checkObject = {
                                        id : checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeoutSeconds
                                    }

                                    // Save the object to the disk
                                    _data.create("checks", checkId, checkObject, function(err){
                                        if(!err){
                                            // Add the check id to the user's object
                                            userData.checks = userChecks;
                                            userData.checks.push(checkId);

                                            // save the new user data
                                            _data.update("users", userPhone, userData, function(err){
                                                if(!err){
                                                    callback(200, checkObject);
                                                }
                                                else{
                                                    callback(500, {error: "Could not update the user with the new check"});
                                                }
                                            })
                                        }
                                        else{
                                            callback(500, {error: "Could not create the new check"});
                                        }
                                    })
                                }
                                else{
                                    callback(400, {error: "The hostname of the URL entered did not resolve to any DNS entries"});
                                }
                            })
                        }
                        else{
                            callback(400, {error: `The user already has the maxmum number of checks (${config.maxChecks})`});
                        }
                    }
                    else{
                        callback(403);
                    }
                })
            }
            else{
                callback(403);
            }
        })
    }
    else{
        callback(400, {error:  "Missing required inputs, or inputs are invalid"});
    }


}


// checks - get
// Required data: id
// optional data: none
handlers._checks.get = function(data, callback){
    // check that the phone number provided is valid
    const id = typeof(data.queryStringObject.id) == "string" && data.queryStringObject.id.trim().length == 20 && data.queryStringObject.id;
    if(id){
        // Lookup the check
        _data.read('checks', id, function(err, checkData){
            if(!err && checkData){
                // Get the token from headers
                const token = typeof(data.headers.token) == "string" && data.headers.token;
                // Verify that the given token is valid and belongs to the user who created the check
                handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenIsValid){
                    if(tokenIsValid){
                        // Return the check data
                        callback(200, checkData);
                    }
                    else{
                        callback(403);
                    }
                });
            }
            else{
                callback(404);
            }
        })
    }
    else{
        callback(400, {error: "Missing required field"});
    }
}


// checks - put
// Required data - id
// optional data - protocol, url, method, successcodes, timeoutSeconds (one must be set)
handlers._checks.put = function(data, callback){
    // Check for the required field
    const id = typeof(data.payload.id) == "string" && data.payload.id.trim().length == 20 && data.payload.id;

    // Check for the optional fields
    const protocol = typeof(data.payload.protocol) == 'string' && ['http', 'https'].includes(data.payload.protocol) && data.payload.protocol;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim();
    const method = typeof(data.payload.method) == 'string' && ['post', 'get', 'put', 'delete'].includes(data.payload.method) && data.payload.method;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 && data.payload.timeoutSeconds;
    
    // Check to make sure id is valid
    if(id){
        // Check ot make sure one or more optional fields has been sent
        if(protocol || url || method || successCodes || timeoutSeconds){
            // Lookup the check
            _data.read('checks', id, function(err, checkData){
                if(!err && checkData){
                    if(!err && checkData){
                        // Get the token from headers
                        const token = typeof(data.headers.token) == "string" && data.headers.token;
                        // Verify that the given token is valid and belongs to the user who created the check
                        handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenIsValid){
                            if(tokenIsValid){
                                // Update the check where necessary
                                if(protocol){
                                    checkData.protocol = protocol;
                                }
                                if(url){
                                    checkData.url = url;
                                }
                                if(method){
                                    checkData.method = method;
                                }
                                if(successCodes){
                                    checkData.successCodes = successCodes;
                                }
                                if(timeoutSeconds){
                                    checkData.timeoutSeconds = timeoutSeconds;
                                }

                                // Store the new updates
                                _data.update('checks', id, checkData, function(err){
                                    if(!err){
                                        callback(200);
                                    }
                                    else{
                                        callback(500, {error: "Could not update the check"});
                                    }
                                })
                            }
                            else{
                                callback(403);
                            }
                        });
                    }
                }
                else{
                    callback(400, {error: "Check ID did not exist"});
                }
            })
        }
        else{
            callback(400, {error: "Missing fields to update"});
        }
    }
    else{
        callback(400,{error: "Missing required field"});
    }
}


// Checks - delete
// Required data: id
// Optional data: none
handlers._checks.delete = function(data, callback){
    // check that the phone number provided is valid
    const id = typeof(data.queryStringObject.id) == "string" && data.queryStringObject.id.trim().length == 20 && data.queryStringObject.id;
    if(id){
        // Lookup the check
        _data.read("checks", id, function(err, checkData){
            if(!err && checkData){
                // Get the token from headers
                const token = typeof(data.headers.token) == "string" && data.headers.token;

                // Verify that the given token is valid for the given phone number
                handlers._tokens.verifyToken(token, checkData.userPhone, function(tokenIsValid){
                    if(tokenIsValid){
                        // Delete the check data
                        _data.delete('checks', id, function(err){
                            if(!err){
                                // Lookup the user
                                _data.read("users", checkData.userPhone, function(err, userData){
                                    if(!err && userData){
                                        const userChecks = typeof(userData.checks) == "object" && userData.checks instanceof Array ? userData.checks : [];
                                        // Remove the delete check from their list of checks
                                        const checkPosition = userChecks.indexOf(id);
                                        console.log(checkPosition);
                                        if(checkPosition > -1){
                                            userChecks.splice(checkPosition, 1);
                                            console.log(userChecks, userData.phone);
                                            console.log(userData);
                                            // Re-save the user's data
                                            _data.update("users", checkData.userPhone, userData, function(err){
                                                console.log(userData, err);
                                                if(!err){
                                                    callback(200);
                                                }
                                                else{
                                                    callback(500, {error: "Could not update the specified user"});
                                                }
                                            })
                                        }
                                        else{
                                            callback(500, {error: "Could not find the check on the users object, so could not remove it"});
                                        }
                                    }
                                    else{
                                        callback(500, {error: "Could not find the specified user who created the check, so could not remove the check from the list of checks"});
                                    }
                                })
                            }
                            else{
                                callback(500, {error: "Could not delete the check data"});
                            }
                        })
                    }
                    else{
                        callback(403);
                    }
                });
            }
            else{
                callback(400, {error: "The specified check ID does not exist"});
            }
        })
    }
    else{
        callback(400, {error: "Missing required field"});
    }
}




// Ping handler
handlers.ping = function(data, callback){
    console.log(data);
    callback(200);
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

module.exports = handlers;