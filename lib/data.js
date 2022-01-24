/*
Library for storing and editing data
*/

// 

// Dependencies
const fs = require("fs");
const path = require("path"); // used to normalize the paths to different directories
const { off } = require("process");
const helpers = require("./helpers");


// Container for this module (to be exported)
const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// write data to a file
lib.create = function(dir, file, data, callback){ // we will pass the directory, the file name, the data and a callback
    // Open the file for writing
    fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', function(err, fileDescriptor){ //  "wx" flag means open file for writing but it will fail if the path already exists
        if(!err && fileDescriptor){ // fileDescriptor is the unique identification number for each file through which we can identitfy the file
            // Convert data to a string
            const stringData = JSON.stringify(data);

            // write to a file and close it
            fs.writeFile(fileDescriptor, stringData, function(err){
                if(!err){
                    fs.close(fileDescriptor, function(err){
                        if(!err){
                            callback(false); // our callback has a error parameter and if the error is false then that means we have no error
                        }
                        else{
                            callback('Error closing a new file');
                        }
                    })
                }
                else{
                    callback('Error writing to a new file');
                }
            })
        }
        else{
            callback('Could not create a new file, it may already exist');
        }
    })
}


// read data from a file
lib.read = function(dir, file, callback){
    fs.readFile(`${lib.baseDir}${dir}/${file}.json`, 'utf-8', function(err, data){
        if(!err && data){
            const parsedData = helpers.parseJsonToObject(data);
            callback(false, parsedData);
        }
        else{
            callback(err, data);
        }
    })
}


// update data inside a file

lib.update = function(dir, file, data, callback){
    fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', function(err, fileDescriptor){
        if(!err && fileDescriptor){
            // Stringify the json
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.ftruncate(fileDescriptor, function(err){
                if(!err){
                    fs.writeFile(fileDescriptor, stringData, function(err){
                        if(!err){
                            fs.close(fileDescriptor, function(err){
                                if(!err){
                                    callback(false);
                                }
                                else{
                                    callback('Error closing the file');
                                }
                            })
                        }
                        else{
                            callback('Error writing to the file');
                        }
                    })
                }
                else{
                    callback('Error truncating file');
                }
            })
        }
        else{
            callback('Could not open the file for updating, it may not exist');
        }
    })
}


// delete the file
lib.delete = function(dir, file, callback){
    // Unlink the file
    fs.unlink(`${lib.baseDir}${dir}/${file}.json`, function(err){ // unlink asynchronously removes the file or symbolic link
        if(!err){
            callback(false);
        }
        else{
            callback('Error deleting the file');
        }
    })
}

// List all the items in a directory
lib.list = function(dir, callback){
    // readdir is node's built in function to list everything within a directory
    fs.readdir(`${lib.baseDir}${dir}/`, function(err, data){
        if(!err && data && data.length > 0){
            const trimmedFileNames = [];
            data.forEach(function(fileName){
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callback(false, trimmedFileNames);
        }
        else{
            callback(err, data);
        }
    })
}



// Export the module
module.exports = lib;