const menuHandler = require("./csvMenuHandler");

let a = menuHandler.convertToTxt("test.csv","text.txt")


a.then(res => console.log(res));