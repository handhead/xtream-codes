"use strict";

// /**
// * Say something.
// * Return a string in the console.
// *
// * @author Vinícius Rodrigues
// *
// * @param {string}   [string_to_say] string to return
// * 
// * @return {(string|undefined)} string returned
// */
// var say = function (string_to_say) {
//     return string_to_say;
// };

// // Allows us to call this function from outside of the library file.
// // Without this, the function would be private to this file.
// exports.say = say;


/**
* Panel.
* Return a instance of a Xtream Codes Panel.
*
* @author Vinícius Rodrigues
*
* @param {string}   [url] string to return
* @param {string}   [key] string to return
* 
* @return {Panel} instance returned
*/
var Panel = function (url, key) {
    this.url = url;
    this.key = key;
};

Panel.prototype.execute = function (method, resource, action) {
    fetch(`${this.url}/api.php?action=${resource}&sub=${action}`, {
        method,
        // body: {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        // }
    }).then(response => response.json())
        .then(result => console.log('success:', result))
        .catch(error => console.log('error:', error));
}

exports.Panel = Panel;
