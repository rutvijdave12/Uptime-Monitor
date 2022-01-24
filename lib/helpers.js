/*
Helpers for various tasks
*/

// Dependencies
const crypto = require("crypto");
const config = require('./config');
const querystring = require("querystring");
const https = require('https');
const path = require("path");
const fs = require("fs");
const { type } = require("os");


// Container for all helpers
const helpers = {};

// Sample for testing that simply returns a number
helpers.getNumber = function(){
    return 1;
}

// Create a sha256 hash
helpers.hash = function(str){
    if(typeof(str) == 'string' && str.length){
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex'); // hashing the password with sha256
        return hash;        
    }
    else{
        return false;
    }
}

// Parse a json string to an object in all cases without throwing
helpers.parseJsonToObject = function(str){
    try{
        const obj = JSON.parse(str);
        return obj;
    }
    catch(e){
        return {};
    }
}

// Create a string of random alphanumeric characters of a given length
helpers.createRandomString = function(stringLength){
    stringLength = typeof(stringLength) == "number" && stringLength;
    if(stringLength){
        // Define all possible characters that could go into a string
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

        // Start the final string
        let str = '';
        for(let i=0; i<stringLength; i++){
            str += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
        }
        // Return the final string
        return str;
    }
    else{
        return false;
    }
}


// Send an sms via twilio
helpers.sendTwilioSms = function(phone, msg, callback){
    // Validate parameters
    phone = typeof(phone) == "string" && phone.trim().length == 10 && phone.trim();
    msg = typeof(msg) == "string" && msg.trim().length > 0 && msg.trim().length <= 1600 && msg.trim();
    if(phone && msg){
        // Configure the request payload
        const payload = {
            From: config.twilio.fromPhone,
            To: `+91${phone}`,
            Body: msg
        }

        // Stringify the payload
        const stringPayload = querystring.stringify(payload);

        // Configure the request details
        const requestDetails = {
            protocol: 'https:',
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${config.twilio.accountSid}/Messages.json`,
            auth: `${config.twilio.accountSid}:${config.twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // the content-type is not json rather it is more traditional i.e. form post and that is why we have used querystring to stringify the object and not json
                'Content-Length': Buffer.byteLength(stringPayload)
            }
        }

        const req = https.request(requestDetails, function(res){
            // Grab the status of the sent request
            const status = res.statusCode;
            // callback successfully if the request went through
            if(status == 200 || status == 201){
                callback(false);
            }
            else{
                callback(`Status code returned was ${status}`);
            }
        });

        // Bind to the error event so it doesn't get thrown
        req.on('error', function(e){
            callback(e);
        });

        // Add the payload to the request
        req.write(stringPayload);

        // End the request
        req.end();
    }
    else{
        callback('Given parameters were missing or invalid');
    }
}

// Get the string content of a template
helpers.getTemplate = function(templateName, data, callback){
    templateName = typeof(templateName) == 'string' && templateName.length > 0 && templateName;
    data = typeof(data) == 'object' && data !== null ? data : {};
    if(templateName){
        const templatesDir = path.join(__dirname, '/../templates/');
        fs.readFile(`${templatesDir}${templateName}.html`, 'utf-8', function(err, str){
            if(!err && str){
                // Do interpolation on the string
                const finalString = helpers.interpolate(str, data);
                callback(false, finalString);
            }
            else{
                callback('No template could be found');
            }
        })
    }
    else{
        callback('A valid template name was not specified');
    }
}

// Add the universal header and footer to a string and pass provided data object to the header and footer for interpolation
helpers.addUniversalTemplates = function(str, data, callback){
    str = typeof(str) == "string" && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};
    // Get the header
    helpers.getTemplate('_header', data, function(err, headerString){
        if(!err && headerString){
            // Get the footer
            helpers.getTemplate('_footer', data, function(err, footerString){
                if(!err && footerString){
                    // Add them all together
                    const fullString = headerString+str+footerString;
                    callback(false, fullString); 
                }
                else{
                   callback("Could not find the footer template"); 
                }
            })
        }
        else{
            callback("Could not find the header template");
        }
    })

}

// Take a given string and a data object and find/replace all the keys within it
helpers.interpolate = function(str, data){
    str = typeof(str) == "string" && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};

    // Add the templateGlobals to the global object, prepending their key with "global"

    for(const keyName in config.templateGlobals){
        if(config.templateGlobals.hasOwnProperty(keyName)){
            data[`global.${keyName}`] = config.templateGlobals[keyName];
        }
    }

    // For each key in the data object, insert value into the string at the corresponding placeholder
    for(const key in data){
        if(data.hasOwnProperty(key) && typeof(data[key]) == 'string'){
            const replace = data[key];
            const find = `{${key}}`;
            str = str.replace(find, replace);
        }
    }
    return str;
}


// Get the contents of a static (public) asset
helpers.getStaticAsset = function(fileName, callback){
    fileName = typeof(fileName) == 'string' && fileName.length > 0 && fileName;
    if(fileName){
        const publicDir = path.join(__dirname, '/../public/');
        fs.readFile(`${publicDir}${fileName}`, function(err, data){
            if(!err && data){
                callback(false, data);
            }
            else{
                callback('No file could be found');
            }
        })
    }
    else{
        callback('A valid file name was not specified');
    }
}



// Export the module
module.exports = helpers;