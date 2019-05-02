"use strict";

/**
* Say something.
* Return a string in the console.
*
* @author Vinícius Rodrigues
*
* @param {string}   [string_to_say] string to return
* 
* @return {(string|undefined)} string returned
*/
var say = function (string_to_say) {
    return string_to_say;
};

// Allows us to call this function from outside of the library file.
// Without this, the function would be private to this file.
exports.say = say;