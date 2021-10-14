/*
    Added by Ilia
* This file is for handling AJAX request and response for presenting menus. For the sake of the server's security,
* I found it to be necessary to have an extra node.js module that could handle this process.
* */
const urlParams = new URLSearchParams(window.location.search);
const menuParam = urlParams.get('menuid');

if (menuParam === null){
    window.location.href = "./404";
}

$.post( "menus/getMenu", {menuId: menuParam},function( data ) {
    if(data != null){
        if (data === "invalid"){
            window.location.href = "./404";
        }
        document.getElementById("#menu").innerHTML = data;
    } else {
        window.location.href = "./404";
    }
});

