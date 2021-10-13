/*
    Added by Ilia
* This file is for handling AJAX request and response for presenting menus. For the sake of the server's security,
* I found it to be necessary to have an extra node.js module that could handle this process.
* */

if (!window.location.hash){
    window.location.href = "./404"
}