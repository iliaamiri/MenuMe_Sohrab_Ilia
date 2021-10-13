/*
    Added by Ilia
* This file is for handling AJAX request and response for presenting menus. For the sake of the server's security,
* I found it to be necessary to have an extra node.js module that could handle this process.
* */
const urlParams = new URLSearchParams(window.location.search);
const menuParam = urlParams.get('menuId');
console.log(isNaN(Number(menuParam)))
// if (menuParam === null || isNaN(Number(menuParam))){
//     window.location.href = "./404"
// }

