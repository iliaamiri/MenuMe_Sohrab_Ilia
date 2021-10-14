/*
* Added by Ilia.
* This module handles the process of resolving the the list of menus
*
* */
const fs = require("fs");
const path = require("path");

const getMenusList = (_, response) => {
    return new Promise((resolve, reject) => {
        let result = {
            status: 0,
            msg: "",
            menu_ids: []
        };

        let listOfMenus = fs.readdirSync(path.join(__dirname, "menus"));

        if (listOfMenus.length === 0) {
            result.msg = "No Menus";
            reject(result);
        } else {
            listOfMenus.forEach((item) => {
                let menu_id = getMenuIdFromFileName(item);
                result.menu_ids.push(menu_id);
            });

            result.status = 1;
            result.msg = "Successful";
            resolve(result);
        }
    });
}

const getMenuIdFromFileName = (menuFileName) => {
    return menuFileName.split("_")[1].split(".")[0];
}

module.exports = {getMenusList};