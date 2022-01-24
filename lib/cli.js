/**
 * CLI related tasks
 */


// Dependencies
const readline = require("readline");
const util = require("util");
const debug = util.debuglog("cli");
const events = require("events");
const os = require("os");
const v8 = require("v8");
const _data = require('./data');
const _logs = require("./logs");
const helpers = require('./helpers');
const childProcess = require('child_process');

class _events extends events{};
const e = new _events();
e.setMaxListeners(100);


// Instantiate the CLI module object
const cli = {}


// Input handlers
e.on("man", function(str){
    cli.responders.help();
})

e.on("help", function(str){
    cli.responders.help();
})

e.on("exit", function(str){
    cli.responders.exit();
})

e.on("stats", function(str){
    cli.responders.stats();
})
e.on("list users", function(str){
    cli.responders.listUsers();
})
e.on("more user info", function(str){
    cli.responders.moreUserInfo(str);
})
e.on("list checks", function(str){
    cli.responders.listChecks(str);
})
e.on("more check info", function(str){
    cli.responders.moreCheckInfo(str);
})
e.on("list logs", function(str){
    cli.responders.listLogs();
})
e.on("more log info", function(str){
    cli.responders.moreLogInfo(str);
})

// Responders object
cli.responders = {}

// Help/Man
cli.responders.help = function(){
    const commands = {
        'exit': 'Kill the CLI (and the rest of the application).',
        'man': 'Show the help page.',
        'help': 'Alias of the "man" command.',
        'stats': 'Get statistics on the underlying operating system and resource utilization.',
        'list users': 'Show a list of all the registered users in the system.',
        'more user info --{userId}': 'Show details of a specific user.',
        'list checks --up --down': 'Show a list of all the active checks in the system, including their state. The "--up" and the "--down" flags are both optional.',
        'more check info --{checkId}': 'Show details of a specified check.',
        'list logs': 'Show a list of all the log files available to be read.',
        'more log info --{fileName}': 'Show details of a specified log file'
    }

    // Show a header for the help page that is as wide as the screen
    cli.horizontalLine();
    cli.centered('CLI COMMANDS')
    cli.horizontalLine();
    cli.verticalSpace(2);

    // Show each command followed by its explanation, in white and yelloe respectively
    for(const key in commands){
        if(commands.hasOwnProperty(key)){
            const value = commands[key];
            let line = `\x1b[33m${key}\x1b[0m'`;
            const padding = 60 - line.length;
            for(i=0; i<padding; i++){
                line += ' ';
            }
            line += value;
            console.log(line);
            cli.verticalSpace();
        }
    }
    cli.verticalSpace(1);

    // End with another horizontal line
    cli.horizontalLine();
}

// Create a vertical space
cli.verticalSpace = function(lines){
    lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
    for(i = 0; i < lines; i++){
        console.log('');
    }
}

// Create a horizontal line across the screen
cli.horizontalLine = function(){
    // Get the available screen size
    const width = process.stdout.columns;
    let line = '';
    for(i = 0; i < width; i++){
        line += '-';
    }
    console.log(line);
}

// Create centered text on the screen
cli.centered = function(str){
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';

    // Get the available screen size
    const width = process.stdout.columns;

    // Calculate the left padding there should be
    const leftPadding = Math.floor((width - str.length)/2);

    // Put in left padded spaces before the string itself
    let line = '';
    for(i = 0; i < leftPadding; i++){
        line += ' ';
    }
    line += str;
    console.log(line);
}

// exit
cli.responders.exit = function(){
    process.exit(0);
}

// stats
cli.responders.stats = function(){
    // Compile an object of stats
    const stats = {
        'Load Average': os.loadavg().join(' '),
        'CPU Count': os.cpus().length,
        'Free Memory': os.freemem(),
        'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
        'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
        'Allocated Heap Used (%)': Math.round((v8.getHeapStatistics().used_heap_size/v8.getHeapStatistics().total_heap_size) * 100),
        'Available Heap Allocated (%)': Math.round((v8.getHeapStatistics().total_heap_size/v8.getHeapStatistics().heap_size_limit) * 100),
        'Uptime': `${os.uptime()} Seconds` 
    }

    // Show a header for the stats page that is as wide as the screen
    cli.horizontalLine();
    cli.centered('SYSTEM STATISTICS');
    cli.horizontalLine();
    cli.verticalSpace(2);

    // Logout each stat
    for(const key in stats){
        if(stats.hasOwnProperty(key)){
            const value = stats[key];
            let line = `\x1b[33m${key}\x1b[0m'`;
            const padding = 60 - line.length;
            for(i=0; i<padding; i++){
                line += ' ';
            }
            line += value;
            console.log(line);
            cli.verticalSpace();
        }
    }
    cli.verticalSpace(1);

    // End with another horizontal line
    cli.horizontalLine(); 


}

// list users
cli.responders.listUsers = function(){
    _data.list('users', function(err, userIds){
        if(!err && userIds){
            cli.verticalSpace();
            userIds.forEach(function(userId){
                _data.read('users', userId, function(err, userData){
                    if(!err && userData){
                        let line = `Name: ${userData.firstName} ${userData.lastName} Phone: ${userData.phone} Checks: `;
                        const numberOfChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array && userData.checks.length > 0 ? userData.checks.length : 0;
                        line += numberOfChecks;
                        console.log(line);
                        cli.verticalSpace();
                    }
                })
            })
        }
    })
}

// more user info
cli.responders.moreUserInfo = function(str){
    // Get the id from the string
    const arr = str.split('--');
    const userId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(userId){
        // Look the user up
        _data.read('users', userId, function(err, userData){
            if(!err && userData){
                // Remove the hashed password
                delete userData.hashedPassword;

                // Print the JSON with text highlighting
                cli.verticalSpace();
                console.dir(userData, {'colors': true});
                cli.verticalSpace();
            }
        })
    }
    else{
        console.log("Please pass check ID as a flag");
    }
}

// list checks
cli.responders.listChecks = function(str){
    _data.list('checks', function(err, checkIds){
        if(!err && checkIds?.length > 0){
            cli.verticalSpace();
            checkIds.forEach(function(checkId){
                _data.read('checks', checkId, function(err, checkData){
                    let includeCheck = false;
                    const lowerString = str.toLowerCase();

                    // Get the state of the check, default to down
                    const state = typeof(checkData.state) == 'string' ? checkData.state : 'down';
                    // Get the state default to unknown
                    const stateOrUnknown = typeof(checkData.state) == 'string' ? checkData.state : 'unknown';

                    // If the user has specified the state, or hasn't specified any state, include the current check accordingly
                    if(lowerString.indexOf(`--${state}`) > -1 || (lowerString.indexOf('--down') == -1 && lowerString.indexOf('--up') == -1)){
                        let line = `ID: ${checkData.id} ${checkData.method.toUpperCase()} ${checkData.protocol}://${checkData.url} State: ${stateOrUnknown}`;
                        console.log(line);
                        cli.verticalSpace();
                    }
                })
            })
        }
    })
}

// more check info
cli.responders.moreCheckInfo = function(str){
    const arr = str.split('--');
    const checkId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(checkId){
        // Look the check up
        _data.read('checks', checkId, function(err, checkData){
            if(!err && checkData){
                // Print the JSON with text highlighting
                cli.verticalSpace();
                console.dir(checkData, {'colors': true});
                cli.verticalSpace();
            }
        })
    }
    else{
        console.log("Please pass check ID as a flag");
    }
}

// list logs
cli.responders.listLogs = function(){
    const ls = childProcess.spawn('ls', ['./.logs/']);
    ls.stdout.on('data', function(dataObject){
        // Explode into separate lines
        const dataStr = dataObject.toString();
        const logFileNames = dataStr.split('\n');
        cli.verticalSpace();
        logFileNames.forEach(function(logFileName){
            if(typeof(logFileName) == 'string' && logFileName.length > 0 && logFileName.indexOf('-') > -1){
                console.log(logFileName.trim().split('.')[0]);
                cli.verticalSpace();
            }
        })
})
}

// more logs info
cli.responders.moreLogInfo = function(str){
    const arr = str.split('--');
    const logFileName = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(logFileName){
        cli.verticalSpace();
        // Decompress the log
        _logs.decompress(logFileName, function(err, strData){
            if(!err && strData){
                // Split into lines
                const arr = strData.split('\n');
                arr.forEach(function(jsonString){
                    const logObject = helpers.parseJsonToObject(jsonString);
                    if(logObject && JSON.stringify(logObject) != '{}'){
                        console.dir(logObject, {'colors': true});
                        cli.verticalSpace();
                    }
                })
            }
        })
        
    }
    else{
        console.log("Please pass check ID as a flag");
    }
}


// Input processor
cli.processInput = function(str){
    str = typeof(str) == "string" && str.trim().length > 0 && str.trim();
    // Only process the input if the user actually wrote something. Otherwise ignore
    if(str){
        // Codify the unique strings that identify the unique questions allowed to be asked
        const uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ]

        // Go throug the possible inputs, emit an event when a match is found
        let command;
        const matchFound = uniqueInputs.some(function(input){
            command = input;
            return str.toLowerCase().indexOf(input) > -1;
        });

        if(matchFound){
            e.emit(command, str);
        }
        else{
            console.log("Sorry, try again!");
        }

    }
}


// Init script
cli.init = function(){
    // Send the start message to the console, in dark blue
    console.log('\x1b[34m%s\x1b[0m', `The CLI is running now`);

    // Start the interface
    const _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '\x1b[32m-> \x1b[0m'
    })
    // We can either use the readline module to create interface or repl which is much easier

    // Create an initial prompt
    _interface.prompt();

    // Handle each line of input separately
    _interface.on('line', function(str){
        // Send to the input processor
        cli.processInput(str);

        // re-initialize the prompt afterwards
        _interface.prompt();

        // If the user stops the CLI, kill the associated process
        _interface.on('close', function(){
            process.exit(0);
        })
    })
}

// Export the module
module.exports = cli;