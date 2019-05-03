"use strict";

const Joi = require('@hapi/joi');

/**
 * Schemas
 */
const LineSchema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    password: Joi.string().alphanum(),
    max_connections: Joi.number().integer(),
    is_restreamer: Joi.boolean(),
    exp_date: Joi.date().timestamp('unix'), // unix timestamp (seconds)
    bouquet: Joi.array().items(Joi.number().integer()),

    // You can call any other element that is in the database like:
    // member_id, admin_enabled, enabled, allowed_ips, allowed_ua, 
    // force_server_id, is_isplock, admin_notes, and so on...
}).with('username', 'birthyear').without('password', 'access_token');

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
* @param {string}   url string to return
* @param {string}   [key] string to return
* 
* @return {Panel} instance returned
*/
var Panel = function (url, key) {
    this.url = url;
    this.key = key;
};

Panel.prototype.execute = function (resource, action, params) {
    let body = {
        api_pass: this.key || '',
        ...params
    };
    fetch(`${this.url}/api.php?action=${resource}&sub=${action}`, {
        method: 'POST', body,
    }).then(response => response.json())
        .then(result => console.log('success:', result))
        .catch(error => console.log('error:', error));
};

Panel.prototype.newLine = function () { };

// http://179.124.136.19:8000/api.php?action=user&sub=create

// username
// password
// max_connections
// is_restreamer
// exp_date
// bouquet

exports.Panel = Panel;
