const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Pick your fav color below!";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.

function form() {
  return `
  <html>
  <head><title>Color Picker</title></head>
  <body>
  <h1>${item}</h1>
  <form method="POST">
    <label for="color"> Choose your favorite color:</label>
    <select name="color" id="color">
      <option value="pink">Pink</option>
      <option value="red">Red</option>
      <option value="lavender">Lavender</option>
      <option value="teal">Teal</option>
    </select>
    <input type="submit" value="Submit"/>
    </form>
    </body>
    </html>
    `;
}




const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    getBody(req, (body) => {
      if (body["color"]) {
        item = `Your favorite color is ${body["color"]}!`;
      } else {
        item = "No color was selected.";
      }
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form());
  }
});
server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
});
server.listen(3000);
console.log("The server is listening on port 3000.");
