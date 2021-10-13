const http = require("http");
const {uploadData} = require("./uploadLogic");
const {showMenuDashboard} = require("./showMenuDashboard");
const {showMenu} = require("./showMenu");
const {fileProcessor} = require("./processors");

const server = http.createServer((request, response) => {
    switch (request.url) {
        case "/upload":
            uploadData(request, response)
                .then((csvName) => console.log(csvName))
                .then(() => {
                    response.writeHead(301, {Location: "/"});
                    response.end();
                })
                .catch((err) => console.log(err));
            break;
        case "/menuDashboard.html":
            showMenuDashboard(request, response);
            break;
        /*
        * Added by Ilia.
        * Description: Making the menu presentation more dynamic using a specific route called /menus
        * */
        case "/menus":
            showMenu(request, response)
            break;
        /*
        * Added by Ilia.
        * Description: Allowing a route for handling AJAX requests
        * */
        case "/menus/getMenu":
            getMenu(request, response) // TODO
            break;
        default:
            fileProcessor(request, response);
            break;

    }
});

server.listen(8125, () => console.log("Visit http://127.0.0.1:8125/"));
