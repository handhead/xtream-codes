"use strict";

const fetch = require("isomorphic-fetch");
const Joi = require("@hapi/joi");
const qs = require("qs");

/**
 * Schemas
 */
const NewLineSchema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    password: Joi.string().alphanum(),
    member_id: Joi.number().integer(),
    max_connections: Joi.number().integer(),
    is_restreamer: Joi.boolean(),
    exp_date: Joi.date().timestamp("unix"), // unix timestamp (seconds)
    bouquet: Joi.array().items(Joi.number().integer()),
    // You can call any other element that is in the database like:
    // member_id, admin_enabled, enabled, allowed_ips, allowed_ua, 
    // force_server_id, is_isplock, admin_notes, and so on...
});
const DeleteLineSchema = Joi.object().keys({
    id: Joi.number().integer().required(),
});

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
    let user_data = [];
    Object.keys(params).forEach(key => {
        switch (key) {
            case "is_restreamer":
                user_data[key] = params[key] + 0;
                break;
            case "bouquet":
                user_data[key] = JSON.stringify(params[key].map(v => v.toString()));
                break;
            default:
                user_data[key] = params[key];
                break;
        }
    });
    let queryString = qs.stringify({ action: resource, sub: action, user_data });
    let body = qs.stringify({ "api_pass": this.key || "" });
    return fetch(`${this.url}/api.php?${queryString}`, {
        credentials: "include", //pass cookies, for authentication
        method: "post",
        headers: {
            "Accept": "application/json, application/xml, text/plain, text/html, *.*",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        }, body,
    })
        .then(response => response.json())
        .then(result => result)
        .catch(error => {
            console.error("Error:", error);
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
* @param {integer}  [line.member_id] integer with a id of owner
* @param {integer}  [line.max_connections] integer with a maximum number of concurrent connections
* @param {boolean}  [line.is_restreamer] boolean it"s a restreamer
* @param {date}     [line.exp_date] date unix timestamp (in seconds)
* @param {array}    [line.bouquet] array of a ids numbers
* 
* @return {Line} object created
*/
Panel.prototype.newLine = function (line) {
    try {
        const { error } = Joi.validate(line, NewLineSchema);
        if (error) throw new Error(error);
        return Promise.resolve(this.execute("user", "create", line));
    } catch (error) {
        return error;
    }
};

/**
* Create a new Line.
* Return an Line object.
*
* @author Vinícius Rodrigues
*
* @param {integer}  [line.id] integer identifier
* 
* @return {Line} object created
*/
// Panel.prototype.deleteLine = function (line) {
//     try {
//         const line_dto = { id: line.id };
//         const { error } = Joi.validate(line_dto, DeleteLineSchema);
//         if (error) throw new Error(error);
//         // users.php?action=user_delete&user_id=54
//         return Promise.resolve(this.execute("user", "delete", line_dto));
//     } catch (error) {
//         console.error(error);
//         return error;
//     }
// };

exports.Panel = Panel;
