/*
* Added by Ilia.
* This module handles the process of resolving the menus dynamically, getting menuId as a parameter in the url.
*
* */
const qs = require('querystring');
const fs = require("fs");
const path = require("path");
const {static} = require("./constants");
const menuHandler = require("./csvMenuHandler");

const getMenu = (_, response) => {
    return new Promise((resolve, reject) => {
        _.on('data', chunk => {
            let postData = qs.parse(chunk.toString());

            let menuId = postData.menuId;

            let menuPath = "menus/menu_" + menuId + ".csv";

            if ((menuId === undefined) ||
                (menuId.toString().match(/^[a-zA-Z0-9_.-]*$/) == null) ||
                (!fs.existsSync(path.join(__dirname, menuPath)))) {
                reject("Invalid Parameter.");
            } else {
                menuHandler.convertToHtml(menuPath).then(content => {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.end(content);
                    resolve(content);
                })
            }
        });
    });
}

module.exports = {getMenu};