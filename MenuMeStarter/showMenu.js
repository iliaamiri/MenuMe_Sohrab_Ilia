const fs = require("fs").promises;
const path = require("path");
const { static } = require("./constants");

const showMenu = (_, response) => {
    fs.readFile(path.join(static, "menu.html")).then((content) => {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(content);
    });
}


module.exports = { showMenu };