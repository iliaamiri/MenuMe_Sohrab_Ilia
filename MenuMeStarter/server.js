const http = require("http");
const { uploadData } = require("./uploadLogic");
const { showMenuDashboard } = require("./showMenuDashboard");
const { fileProcessor } = require("./processors");

const server = http.createServer((request, response) => {
  switch (request.url) {
    case "/upload":
      uploadData(request, response)
        .then((csvName) => console.log(csvName))
        .then(() => {
          response.writeHead(301, { Location: "/" });
          response.end();
        })
        .catch((err) => console.log(err));
      break;
    case "/menuDashboard.html":
      showMenuDashboard(request, response);
    default:
      fileProcessor(request, response);
      break;
  }
});

server.listen(8125, () => console.log("Visit http://127.0.0.1:8125/"));
