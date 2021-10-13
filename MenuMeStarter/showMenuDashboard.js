const fs = require("fs").promises;
const { existsSync } = require("fs");
const path = require("path");
const { static } = require("./constants");

/* 
If the menus folder does NOT exist, it means the user has not
uploaded a menu yet. Don't display the Menu Dashboard. Redirect
the user to the upload page. 
*/
const showMenuDashboard = (_, response) => {
  if (!existsSync(path.join(__dirname, "menus"))) {
    response.end(`
    <p>Please first add a menu!</p>
    <p>Redirecting you in 4 seconds...</p>
    <script>
    setTimeout(function(){
      location.href="http://127.0.0.1:8125/uploadscreen.html"
    }, 4000);
    </script>
    `);
  } else {
    fs.readFile(path.join(static, "menuDashboard.html")).then((content) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(content);
    });
  }
};

module.exports = { showMenuDashboard };
