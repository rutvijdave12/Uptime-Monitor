/*
*Create and export configuration variables
*/

// Container for all the environments

const environments = {};

// Staging (default) environment
environments.staging = {
    httpPort: 3000,
    httpsPort: 3001,
    envName: "staging",
    hashingSecret: "thisIsASecret",
    maxChecks: 5,
    twilio : { 
        accountSid : 'ACb32d411ad7fe886aac54c665d25e5c5d',
        authToken : '9455e3eb3109edc12e3d8c92768f7a67',
        fromPhone : '+15005550006'
    },
    // The twilio credentials used here are staging credentials, so it will only tell us if the msg can be sent or not. If the error is false that means if it were production credentials twilio would've sent the msg to the number
    templateGlobals: {
        appName: 'UptimeChecker',
        companyName: 'Company',
        yearCreated: '2022',
        baseUrl: 'http://localhost:3000/'
    }
}

// testing environment
environments.testing = {
    httpPort: 4000,
    httpsPort: 4001,
    envName: "testing",
    hashingSecret: "thisIsASecret",
    maxChecks: 5,
    twilio : { 
        accountSid : 'ACb32d411ad7fe886aac54c665d25e5c5d',
        authToken : '9455e3eb3109edc12e3d8c92768f7a67',
        fromPhone : '+15005550006'
    },
    // The twilio credentials used here are staging credentials, so it will only tell us if the msg can be sent or not. If the error is false that means if it were production credentials twilio would've sent the msg to the number
    templateGlobals: {
        appName: 'UptimeChecker',
        companyName: 'Company',
        yearCreated: '2022',
        baseUrl: 'http://localhost:3000/'
    }
}


// Production environment
environments.production = {
    httpPort: 5000,
    httpsPort: 5001,
    envName: "production",
    hashingSecret: "thisIsAlsoASecret",
    maxChecks: 5,
    twilio : {
        accountSid : '',
        authToken : '',
        fromPhone : ''
    },
    templateGlobals: {
        appName: 'UptimeChecker',
        companyName: 'Company',
        yearCreated: '2022',
        baseUrl: 'http://localhost:5000/'
    }
}

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : ''; // NODE_ENV is going to be the variable name so we can access it using proces.env.NODE_ENV

// Check that current environment is one of the environments above, if not, default to staging
const environmentToExport = environments[currentEnvironment] ?? environments.staging;

// Export the module
module.exports = environmentToExport;