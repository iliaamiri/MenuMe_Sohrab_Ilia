/*
    Added by Ilia
* This file is for handling the fetching process of menus using AJAX
* */

$.post( "/menus/getMenusList", function( data ) {
    if(data != null){
        let result = JSON.parse(data);
        if (result.status === 1){
            let i = 1;
            for (let item of result.menu_ids){
                $('#menuList').append(`<a href="/menus?menuid=${item}">
        <div class="menu_box">
          <div class="transition_box" id="box_1">
            <span class="label">Menu${i}</span>
          </div>
          <div class="transition_box" id="box_2"></div>
          <div class="transition_box" id="box_3"></div>
        </div>
      </a>`);
                i++;
            }
        } else {
            $("body").replaceWith(`<p>Please first add a menu!</p>
    <p>Redirecting you in 4 seconds...</p>
    <script>
    setTimeout(function(){
      location.href="http://127.0.0.1:8125/uploadscreen.html"
    }, 4000);
    </script>`);
        }
    } else {
        window.location.href = "./404";
    }
});