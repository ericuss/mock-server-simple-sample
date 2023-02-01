var mockServerClient = require('mockserver-client').mockServerClient;
const { setTimeout } = require('timers/promises');

// use env variables
var iso_server_host = 'host.docker.internal';
var iso_server_port = 1080;


var sampleEndpoint = () => {
  var expectationBuilder = {
    "httpRequest": {
      "method": "GET",
      "path": '/api/sample'
    },
    "httpResponse": {
      "body": { name: "User001" }
    }
  };


  mockServerClient(iso_server_host, iso_server_port)
    .mockAnyResponse(expectationBuilder)
    .then(
      () => {
        console.log("requested endpoint");
      },
      (error) => console.log(error)
    );
}

var sampleEndpoint2 = () => {
  mockServerClient(iso_server_host, iso_server_port)
    .mockAnyResponse({
      "httpRequest": {
        "method": "GET",
        "path": "/view/cart",
      },
      "httpResponse": {
        "body": "some_response_body"
      }
    })
    .then(
      function () {
        console.log("expectation created");
      },
      function (error) {
        console.log(error);
      }
    );
}


var main = () => {
  console.log("seeding endpoints")
  sampleEndpoint();
  sampleEndpoint2();
  setTimeout(() => console.log("bye"), 5000);
}

var bootstrapper = () => {
  mockServerClient(iso_server_host, iso_server_port).reset().then(
    () => main(),
    () => setTimeout(bootstrapper, 10000)
  )
}

bootstrapper();
