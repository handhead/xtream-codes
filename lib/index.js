"use strict";

require('isomorphic-fetch');
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
});

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
    let body = { api_pass: this.key || '', ...params };
    return fetch(`${this.url}/api.php?action=${resource}&sub=${action}`, {
        method: 'POST', body,
    })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            return result;
        })
        .catch(error => {
            console.error('Error:', error);
            throw new Error(error);
        });
};

/**
* Create a new Line.
* Return an Line object.
*
* @author Vinícius Rodrigues
*
* @param {string}   line.username string identifier
* @param {string}   [line.password] string password
* @param {integer}  [line.max_connections] integer with a maximum number of concurrent connections
* @param {boolean}  [line.is_restreamer] boolean it's a restreamer
* @param {date}     [line.exp_date] date unix timestamp (in seconds)
* @param {array}    [line.bouquet] array of a ids numbers
* 
* @return {Line} object created
*/
Panel.prototype.newLine = function (line) {
    try {
        const { error, value } = Joi.validate(line, LineSchema);
        if (error) throw new Error(error);
        return this.execute('user', 'create', line);
    } catch (error) {
        return error
    }
};

exports.Panel = Panel;
